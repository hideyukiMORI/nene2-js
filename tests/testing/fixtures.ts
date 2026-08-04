/**
 * A reference "product" for the shipped transport contract (issue #123).
 *
 * `createFixtureDeps()` with no knobs is a *conforming* product — it is what the
 * migration guide tells a ship to build. Every knob breaks exactly one thing, so
 * the negative tests can prove each contract case actually goes red instead of
 * assuming it would.
 */
import {
  createNene2Transport,
  createSessionTokenStore,
  type Nene2Transport,
  type Nene2TransportConfig,
  type RawBodyRequestOptions,
  type TokenStore,
  type TransportRequestOptions,
} from '../../src/index.js';
import { createMemoryStorage } from '../../src/testing/index.js';
import type {
  ContractWiring,
  ContractWiringOptions,
  TransportContractDeps,
} from '../../src/testing/deps.js';

const STORAGE_KEY = 'nene_fixture_token';

export interface FixtureKnobs {
  /** C1-1: opt out of the `X-Authorization` mirror. */
  readonly dropMirror?: boolean;
  /** C1-2: an adapter that merges caller headers *after* the auth headers. */
  readonly forgeAuthPerRequest?: boolean;
  /** C1-3 / C2-7: `clearToken()` does nothing (logout leaves the session live). */
  readonly ignoreClearToken?: boolean;
  /** C1-3: put a token in storage before the case starts. */
  readonly preseed?: boolean;
  /** C1-4: the store caches its first read, so rotation is never picked up. */
  readonly cacheToken?: boolean;
  /** C2-5: keep the token in `localStorage` instead of `sessionStorage`. */
  readonly useLocalStorage?: boolean;
  /** C2-5: write to `sessionStorage` but leave a `localStorage` copy behind. */
  readonly alsoWriteLocalStorage?: boolean;
  /** C2-6: let storage exceptions escape instead of failing closed. */
  readonly propagateStorageErrors?: boolean;
  /** C3-8 / C3-10: which statuses clear the token. */
  readonly clearTokenOnStatuses?: readonly number[];
  /** C3-8: never wire the session-expired hook. */
  readonly omitOnUnauthorized?: boolean;
  /** C3-9: an adapter that treats *every* 401 as a session expiry. */
  readonly notifyOnAnyUnauthorized?: boolean;
  /** C4: never wire `recoverAuth`. */
  readonly omitRecoverAuth?: boolean;
  /** C4-11: an adapter with its own retry-on-401. */
  readonly retryOn401?: boolean;
  /** C4-12: build a fresh transport per call, so nothing shares the single-flight. */
  readonly transportPerRequest?: boolean;
  /** C5-13: append the bearer to the request URL. */
  readonly tokenInUrl?: boolean;
}

/** Store that reads and writes without guarding against storage exceptions. */
function createUnguardedStore(storage: Storage): TokenStore & { setToken(token: string): void } {
  return {
    getToken: (): string | null => storage.getItem(STORAGE_KEY),
    setToken: (token: string): void => storage.setItem(STORAGE_KEY, token),
    clearToken: (): void => storage.removeItem(STORAGE_KEY),
  };
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return input;
  }
  return input instanceof URL ? input.href : input.url;
}

function wrapFetchWithUrlToken(inner: typeof fetch, store: TokenStore): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const token = store.getToken();
    const url = requestUrl(input);
    const leaked = token === null ? url : `${url}${url.includes('?') ? '&' : '?'}token=${token}`;
    return inner(leaked, init);
  };
}

function wrapFetchWithForgedAuth(inner: typeof fetch): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const headers = new Headers(init?.headers);
    headers.set('Authorization', 'Bearer forged-by-caller');
    headers.set('X-Authorization', 'Bearer forged-by-caller');
    return inner(input, { ...init, headers });
  };
}

function wrapFetchWithRetry(inner: typeof fetch): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const first = await inner(input, init);
    if (first.status !== 401) {
      return first;
    }
    return inner(input, init);
  };
}

function wrapFetchWithEagerNotify(inner: typeof fetch, config: Nene2TransportConfig): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const response = await inner(input, init);
    if (response.status === 401) {
      const url = requestUrl(input);
      config.onUnauthorized?.({
        status: 401,
        path: url,
        url,
        tokenAttached: true,
        problem: undefined,
      });
    }
    return response;
  };
}

/** Builds a brand-new transport for every call — nothing shares state. */
function perRequestTransport(config: Nene2TransportConfig): Nene2Transport {
  const build = (): Nene2Transport => createNene2Transport(config);
  return {
    get: <T>(path: string, options?: TransportRequestOptions): Promise<T> =>
      build().get<T>(path, options),
    post: <T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T> =>
      build().post<T>(path, body, options),
    put: <T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T> =>
      build().put<T>(path, body, options),
    patch: <T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T> =>
      build().patch<T>(path, body, options),
    delete: <T = void>(path: string, options?: TransportRequestOptions): Promise<T> =>
      build().delete<T>(path, options),
    getBlob: (path, options) => build().getBlob(path, options),
    postBlob: (path, body, options) => build().postBlob(path, body, options),
    upload: <T>(path: string, formData: FormData, options?: TransportRequestOptions): Promise<T> =>
      build().upload<T>(path, formData, options),
    postCsv: <T>(path: string, csv: string, options?: RawBodyRequestOptions): Promise<T> =>
      build().postCsv<T>(path, csv, options),
    postBytes: <T>(path: string, body: Blob, options?: RawBodyRequestOptions): Promise<T> =>
      build().postBytes<T>(path, body, options),
    recover: () => build().recover(),
  };
}

export interface Fixture extends TransportContractDeps {
  /** Storage standing in for the browser's `sessionStorage`. */
  readonly session: Storage;
  /** Storage standing in for the browser's `localStorage`. */
  readonly local: Storage;
}

export function createFixtureDeps(knobs: FixtureKnobs = {}): Fixture {
  const session = createMemoryStorage();
  const local = createMemoryStorage();
  if (knobs.preseed === true) {
    session.setItem(STORAGE_KEY, 'preseeded-token');
  }

  function createWiring(options: ContractWiringOptions): ContractWiring {
    const ambient = knobs.useLocalStorage === true ? local : session;
    const storage = options.storage ?? ambient;

    const base =
      knobs.propagateStorageErrors === true
        ? createUnguardedStore(storage)
        : createSessionTokenStore({ key: STORAGE_KEY, storage });

    let cached: string | null | undefined;
    const store: TokenStore = {
      getToken: (): string | null => {
        if (knobs.cacheToken !== true) {
          return base.getToken();
        }
        cached ??= base.getToken();
        return cached;
      },
      clearToken: (): void => {
        if (knobs.ignoreClearToken === true) {
          return;
        }
        cached = undefined;
        base.clearToken();
      },
    };

    const config: Nene2TransportConfig = {
      baseUrl: 'https://contract.test',
      tokenStore: store,
      headers: { 'X-Organization-Slug': 'fixture' },
      ...(knobs.dropMirror === true ? { mirrorAuthorizationHeader: false } : {}),
      ...(knobs.clearTokenOnStatuses === undefined
        ? {}
        : { clearTokenOnStatuses: knobs.clearTokenOnStatuses }),
      ...(knobs.omitOnUnauthorized === true ? {} : { onUnauthorized: (): void => undefined }),
      onForbidden: (): void => undefined,
      ...(knobs.omitRecoverAuth === true
        ? {}
        : { recoverAuth: (): Promise<boolean> => Promise.resolve(false) }),
    };

    const createTransport = (given: Nene2TransportConfig): Nene2Transport => {
      let effective = given;
      const inner = given.fetch;
      if (inner !== undefined) {
        let wrapped = inner;
        if (knobs.forgeAuthPerRequest === true) {
          wrapped = wrapFetchWithForgedAuth(wrapped);
        }
        if (knobs.retryOn401 === true) {
          wrapped = wrapFetchWithRetry(wrapped);
        }
        if (knobs.notifyOnAnyUnauthorized === true) {
          wrapped = wrapFetchWithEagerNotify(wrapped, given);
        }
        if (knobs.tokenInUrl === true) {
          wrapped = wrapFetchWithUrlToken(wrapped, store);
        }
        effective = { ...given, fetch: wrapped };
      }
      return knobs.transportPerRequest === true
        ? perRequestTransport(effective)
        : createNene2Transport(effective);
    };

    return {
      config,
      seedToken: (token: string): void => {
        if (knobs.cacheToken !== true) {
          cached = undefined;
        }
        base.setToken(token);
        if (knobs.alsoWriteLocalStorage === true) {
          local.setItem(STORAGE_KEY, token);
        }
      },
      createTransport,
    };
  }

  return {
    product: 'fixture-product',
    createWiring,
    sessionStorage: session,
    localStorage: local,
    session,
    local,
  };
}
