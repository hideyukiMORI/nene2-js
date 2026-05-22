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
  /** Custom fetch implementation (tests, Node 18 polyfill). */
  readonly fetch?: typeof fetch | undefined;
}

/** @internal */
export interface ResolvedNene2ClientConfig {
  readonly baseUrl: string;
  readonly apiKey: string | undefined;
  readonly bearer: string | undefined;
  readonly fetch: typeof fetch;
}

/** @internal */
export function resolveConfig(config: Nene2ClientConfig): ResolvedNene2ClientConfig {
  const baseUrl = config.baseUrl.replace(/\/+$/, '');
  if (baseUrl.length === 0) {
    throw new Error('Nene2ClientConfig.baseUrl must not be empty');
  }
  const fetchFn = config.fetch ?? globalThis.fetch;
  if (typeof fetchFn !== 'function') {
    throw new Error('fetch is not available; pass config.fetch');
  }
  return {
    baseUrl,
    apiKey: config.apiKey,
    bearer: config.bearer,
    fetch: fetchFn,
  };
}
