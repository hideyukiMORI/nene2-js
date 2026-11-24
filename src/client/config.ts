/**
 * Configuration for {@link createNene2Client}.
 */
export interface Nene2ClientConfig {
  /** API origin without trailing slash (e.g. `http://localhost:8080`). */
  readonly baseUrl: string;
  /** Machine client API key (`X-NENE2-API-Key`). */
  readonly apiKey?: string | undefined;
  /** Bearer JWT for protected routes. */
  readonly bearer?: string | undefined;
  /**
   * Mirror the bearer onto a non-standard `X-Authorization` header alongside the
   * standard `Authorization`. Default `true` (fleet posture): some shared-hosting
   * / reverse proxies strip `Authorization` before it reaches the backend, and
   * NENE2 falls back to the mirror. Set `false` when you control the edge and
   * know `Authorization` survives. See the README **Transport headers** section.
   */
  readonly mirrorAuthorizationHeader?: boolean | undefined;
  /**
   * Custom fetch implementation (tests, Node 18 polyfill). Always used as-is
   * when present. When omitted, `globalThis.fetch` is read **at every
   * request** (never bound at construction), so a harness that replaces it
   * later (msw, a test runner) is still picked up (#105).
   */
  readonly fetch?: typeof fetch | undefined;
  /** Optional abort signal forwarded to every request (Persona A: cancel in-flight calls). */
  readonly signal?: AbortSignal | undefined;
  /**
   * Per-request timeout in milliseconds (`AbortSignal.timeout`).
   * Composes with `signal` when both are set.
   */
  readonly timeoutMs?: number | undefined;
}

/** @internal */
export interface ResolvedNene2ClientConfig {
  readonly baseUrl: string;
  readonly apiKey: string | undefined;
  readonly bearer: string | undefined;
  readonly mirrorAuthorizationHeader: boolean;
  readonly fetch: typeof fetch;
  readonly signal: AbortSignal | undefined;
  readonly timeoutMs: number | undefined;
}

/** @internal */
export function resolveConfig(config: Nene2ClientConfig): ResolvedNene2ClientConfig {
  const baseUrl = config.baseUrl.replace(/\/+$/, '');
  if (baseUrl.length === 0) {
    throw new Error('Nene2ClientConfig.baseUrl must not be empty');
  }
  const providedFetch = config.fetch;
  // Keep the fail-fast check for the no-fetch environment (same message), then
  // resolve the global lazily so a harness (msw, a test runner) that installs
  // a `globalThis.fetch` stub *after* the client was created is picked up
  // (#105). A caller-provided `fetch` is always used as-is.
  if (providedFetch === undefined && typeof globalThis.fetch !== 'function') {
    throw new Error('fetch is not available; pass config.fetch');
  }
  const fetchFn: typeof fetch = (input, init) => {
    if (providedFetch !== undefined) {
      return providedFetch(input, init);
    }
    const globalFetch = globalThis.fetch;
    if (typeof globalFetch !== 'function') {
      throw new Error('fetch is not available; pass config.fetch');
    }
    // Call via `globalThis` so a browser global keeps its required receiver.
    return globalThis.fetch(input, init);
  };
  return {
    baseUrl,
    apiKey: config.apiKey,
    bearer: config.bearer,
    mirrorAuthorizationHeader: config.mirrorAuthorizationHeader ?? true,
    fetch: fetchFn,
    signal: config.signal,
    timeoutMs: config.timeoutMs,
  };
}
