/**
 * Test doubles the contract drives the product's wiring with (issue #123).
 *
 * Nothing here is product-specific: the contract supplies the `fetch` (the only
 * config value it overrides) so it can read what actually went on the wire, and
 * supplies `Storage` doubles so the token-store cases can force the failure
 * modes a real browser only produces in privacy mode.
 */
import type { AuthFailureContext, Nene2TransportConfig } from '../transport/transport.js';

/** One observed `fetch` call. */
export interface RecordedCall {
  readonly url: string;
  readonly method: string;
  readonly headers: Headers;
  readonly init: RequestInit;
}

/** Decides the response for each observed call. */
export type ContractResponder = (call: RecordedCall, index: number) => Response | Promise<Response>;

export interface ContractFetchRecorder {
  readonly fetch: typeof fetch;
  readonly calls: readonly RecordedCall[];
}

/** JSON response helper (the contract never asserts on bodies, only on the wire). */
export function contractJsonResponse(status = 200, body: unknown = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** RFC 9457 Problem Details response — what NENE2 returns for 401/403. */
export function contractProblemResponse(status: number): Response {
  return new Response(JSON.stringify({ type: 'about:blank', title: 'Contract probe', status }), {
    status,
    headers: { 'Content-Type': 'application/problem+json' },
  });
}

/**
 * Recording `fetch` double. Every transport path is funnelled through it, so the
 * recorded headers are the ground truth for the C1 mirror cases.
 */
export function createRecordingFetch(responder: ContractResponder): ContractFetchRecorder {
  const calls: RecordedCall[] = [];
  const fetchDouble = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const requestInit = init ?? {};
    const call: RecordedCall = {
      url,
      method: requestInit.method ?? 'GET',
      headers: new Headers(requestInit.headers),
      init: requestInit,
    };
    calls.push(call);
    return responder(call, calls.length - 1);
  };
  return { fetch: fetchDouble, calls };
}

/** In-memory `Storage`, used as a stand-in when a product injects its own. */
export function createMemoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length(): number {
      return data.size;
    },
    clear: (): void => {
      data.clear();
    },
    getItem: (key: string): string | null => data.get(key) ?? null,
    key: (index: number): string | null => [...data.keys()][index] ?? null,
    removeItem: (key: string): void => {
      data.delete(key);
    },
    setItem: (key: string, value: string): void => {
      data.set(key, value);
    },
  };
}

/**
 * `Storage` whose every access throws — privacy mode, blocked cookies, or a
 * quota-exhausted origin. A store that lets this escape signs the user out with
 * an exception instead of failing closed (case C2-6).
 */
export function createHostileStorage(): Storage {
  const boom = (): never => {
    throw new Error('contract: storage access denied');
  };
  return { length: 0, clear: boom, getItem: boom, key: boom, removeItem: boom, setItem: boom };
}

/** Every value the contract records while driving one product config. */
export interface InstrumentedConfig {
  readonly config: Nene2TransportConfig;
  readonly unauthorized: readonly AuthFailureContext[];
  readonly forbidden: readonly AuthFailureContext[];
  /** How many times the (possibly overridden) `recoverAuth` was entered. */
  recoverCalls(): number;
}

export interface InstrumentOptions {
  /**
   * Replaces the product's `recoverAuth` so a case can drive a specific recovery
   * outcome. The C3 cases use this to neutralise recovery and isolate the
   * fail-closed 401 path; the C4 cases use it to force fail / loop scenarios.
   */
  readonly recoverAuth?: (() => Promise<boolean>) | undefined;
}

/**
 * Wrap a product's config so the contract can observe its hooks without
 * replacing them — the product's own `onUnauthorized` / `onForbidden` still run,
 * which is the point: the case asserts that the product wired them at all.
 */
export function instrumentConfig(
  config: Nene2TransportConfig,
  fetchDouble: typeof fetch,
  options: InstrumentOptions = {},
): InstrumentedConfig {
  const unauthorized: AuthFailureContext[] = [];
  const forbidden: AuthFailureContext[] = [];
  let recoverCalls = 0;

  const productUnauthorized = config.onUnauthorized;
  const productForbidden = config.onForbidden;
  const recoverAuth = options.recoverAuth ?? config.recoverAuth;

  const instrumented: Nene2TransportConfig = {
    ...config,
    fetch: fetchDouble,
    onUnauthorized: (context: AuthFailureContext): void => {
      unauthorized.push(context);
      productUnauthorized?.(context);
    },
    onForbidden: (context: AuthFailureContext): void => {
      forbidden.push(context);
      productForbidden?.(context);
    },
    ...(recoverAuth === undefined
      ? {}
      : {
          recoverAuth: async (): Promise<boolean> => {
            recoverCalls += 1;
            return recoverAuth();
          },
        }),
  };

  return {
    config: instrumented,
    unauthorized,
    forbidden,
    recoverCalls: () => recoverCalls,
  };
}

/** @internal Scan a `Storage` for a value, returning the key that holds it. */
export function findStoredValue(storage: Storage, value: string): string | null {
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key !== null && storage.getItem(key) === value) {
      return key;
    }
  }
  return null;
}
