/**
 * Fleet-standard frontend transport for NENE2-based products (issue #102).
 *
 * One correct implementation of the request plumbing every nene-* product used
 * to hand-write: the `X-Authorization` mirror on every path, the sessionStorage
 * token store, Problem Details (RFC 9457) error mapping, and 401/403 hooks.
 * Products keep their own `apiClient` surface as a thin adapter over this
 * transport (see the migration guide `howto/migrate-product-client`).
 */
import { Nene2ClientError } from '../client/errors.js';
import { parseRateLimitHeaders } from '../client/rate-limit.js';
import { wrapFetchError } from '../client/request.js';
import { mergeRequestSignal } from '../client/signal.js';
import { parseProblemDetailsResponse } from '../problem/guards.js';
import type { ProblemDetailsDocument } from '../problem/types.js';
import { buildTransportHeaders } from './headers.js';
import type { TokenStore } from './token-store.js';

/**
 * Context passed to the 401/403 hooks. The package only clears the token and
 * notifies; side effects (redirects, toasts, login-in-place) stay in the app.
 */
export interface AuthFailureContext {
  /** HTTP status of the failed response (401 or 403). */
  readonly status: number;
  /** Request path as passed to the transport (no token is ever carried in it). */
  readonly path: string;
  /** Fully resolved request URL. */
  readonly url: string;
  /**
   * True when the request carried a bearer token — i.e. an authenticated
   * session failed. A 401 without a token (e.g. wrong credentials on a login
   * endpoint) does not clear the store and does not fire `onUnauthorized`.
   */
  readonly tokenAttached: boolean;
  /** Parsed Problem Details body, when the server sent one. */
  readonly problem: ProblemDetailsDocument | undefined;
}

/**
 * Configuration for {@link createNene2Transport}.
 */
export interface Nene2TransportConfig {
  /**
   * API origin or prefix without trailing slash (e.g. `https://api.example.com`
   * or an install base path). Default `''` — same-origin relative paths.
   */
  readonly baseUrl?: string | undefined;
  /**
   * Token store consulted on every request. Use {@link createSessionTokenStore}
   * (fleet default: sessionStorage) or adapt a product-specific store to the
   * {@link TokenStore} interface. Omit for unauthenticated transports.
   */
  readonly tokenStore?: TokenStore | undefined;
  /** Machine client API key (`X-NENE2-API-Key`). */
  readonly apiKey?: string | undefined;
  /** Static headers sent on every request (e.g. `X-Organization-Slug`). */
  readonly headers?: Readonly<Record<string, string>> | undefined;
  /**
   * Mirror the bearer token onto a non-standard `X-Authorization` header in
   * addition to the standard `Authorization`. Default `true` (fleet posture):
   * some shared-hosting / reverse proxies strip `Authorization` before it
   * reaches the backend, and NENE2 falls back to the mirror. Set `false` when
   * you control the edge and know `Authorization` survives — the transport then
   * sends `Authorization` only. Construction-time only; there is no per-request
   * override. See the README **Transport headers** section (#119).
   */
  readonly mirrorAuthorizationHeader?: boolean | undefined;
  /** Forwarded to `fetch` (e.g. `'include'` for cookie-based CSRF pairing). */
  readonly credentials?: RequestCredentials | undefined;
  /** Custom fetch implementation (tests, SSR). */
  readonly fetch?: typeof fetch | undefined;
  /** Per-request timeout in milliseconds (`AbortSignal.timeout`). */
  readonly timeoutMs?: number | undefined;
  /**
   * Called after a 401 on an authenticated request (the token store has already
   * been cleared when `clearTokenOnStatuses` includes 401 — the default).
   */
  readonly onUnauthorized?: ((context: AuthFailureContext) => void) | undefined;
  /** Called after any 403. The token is not cleared by default (still authenticated). */
  readonly onForbidden?: ((context: AuthFailureContext) => void) | undefined;
  /**
   * Statuses that clear the token store when the failed request carried a
   * token. Default `[401]` (session expired). Add 403 to also sign out on
   * forbidden responses.
   */
  readonly clearTokenOnStatuses?: readonly number[] | undefined;
  /**
   * Opt-in silent re-authentication (ADR 0008). On a 401 for an authenticated
   * request — **before** the token is cleared — the transport calls this hook;
   * return `true` once a fresh token has been seated in the token store and the
   * transport replays the original request **exactly once**, or `false` to fail
   * closed (clear token + {@link onUnauthorized}, the default behavior).
   *
   * Own only the refresh *mechanics* here (call your refresh endpoint, echo the
   * CSRF cookie, parse the body, `tokenStore.setToken(...)`). The transport owns
   * the *orchestration*: concurrent 401s (and {@link Nene2Transport.recover})
   * share one in-flight call, and the replay never re-enters recovery.
   *
   * The recovery request itself MUST bypass this transport instance's recovery
   * path — issue it with a bare `fetch` or a transport configured without
   * `recoverAuth` — otherwise it would await itself.
   *
   * Omit (default `undefined`) to keep the fail-closed 401 policy unchanged.
   *
   * @remarks Under refresh-token rotation, two concurrent refreshes trip
   * server-side reuse detection (family revocation). The transport's shared
   * single-flight is what makes this safe — see {@link Nene2Transport.recover}.
   */
  readonly recoverAuth?: (() => Promise<boolean>) | undefined;
}

/** Per-request options shared by all transport methods. */
export interface TransportRequestOptions {
  readonly signal?: AbortSignal | undefined;
  /**
   * Extra statuses to treat as success and hand the parsed body to the caller
   * (e.g. `[422]` for CSV import endpoints whose rejection report is the body).
   */
  readonly alsoOkStatuses?: readonly number[] | undefined;
  /** Per-request extra headers. Cannot override the auth headers or the mirror. */
  readonly headers?: Readonly<Record<string, string>> | undefined;
}

/** Options for raw-body POSTs ({@link Nene2Transport.postCsv} / {@link Nene2Transport.postBytes}). */
export interface RawBodyRequestOptions extends TransportRequestOptions {
  /** Request `Content-Type`. Default `text/csv` (the fleet CSV-import shape). */
  readonly contentType?: string | undefined;
}

/** A downloaded binary plus the server-suggested filename, when present. */
export interface BlobDownload {
  readonly blob: Blob;
  /** From `Content-Disposition`, or `null` when the server did not suggest one. */
  readonly filename: string | null;
}

/**
 * Generic authenticated transport. Every method routes through one internal
 * `send()` whose headers come from the single auth-header choke point, so no
 * per-request path can drop the `X-Authorization` mirror when it is enabled
 * (see {@link Nene2TransportConfig.mirrorAuthorizationHeader}).
 */
export interface Nene2Transport {
  /** `GET` JSON. */
  get<T>(path: string, options?: TransportRequestOptions): Promise<T>;
  /** `POST` JSON (body optional). */
  post<T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T>;
  /** `PUT` JSON (body optional). */
  put<T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T>;
  /** `PATCH` JSON (body optional). */
  patch<T>(path: string, body?: unknown, options?: TransportRequestOptions): Promise<T>;
  /** `DELETE`; resolves `undefined` for 204/empty bodies. */
  delete<T = void>(path: string, options?: TransportRequestOptions): Promise<T>;
  /** Authenticated binary download (`GET`). */
  getBlob(path: string, options?: TransportRequestOptions): Promise<BlobDownload>;
  /** Authenticated binary download with a JSON `POST` body (e.g. export filters). */
  postBlob(path: string, body?: unknown, options?: TransportRequestOptions): Promise<BlobDownload>;
  /**
   * Multipart upload (`POST`). `Content-Type` is intentionally left unset so
   * the browser adds the multipart boundary.
   */
  upload<T>(path: string, formData: FormData, options?: TransportRequestOptions): Promise<T>;
  /** `POST` a decoded CSV string (`Content-Type: text/csv` by default). */
  postCsv<T>(path: string, csv: string, options?: RawBodyRequestOptions): Promise<T>;
  /**
   * `POST` raw file bytes unchanged (never re-decoded — required for
   * Shift_JIS bank CSVs that `File.text()` would corrupt as UTF-8).
   * `Content-Type: text/csv` by default.
   */
  postBytes<T>(path: string, body: Blob, options?: RawBodyRequestOptions): Promise<T>;
  /**
   * Run the configured {@link Nene2TransportConfig.recoverAuth} through the
   * transport's shared single-flight and report whether a token was seated.
   * Resolves `false` when no `recoverAuth` is configured.
   *
   * Call this — not `recoverAuth` directly — for an app-start session probe
   * (after a reload the in-memory access token is gone but the refresh cookie
   * may still be valid). Because it shares the **same** in-flight recovery as
   * any concurrent 401-retry, the probe and an early retry collapse into one
   * refresh call. That sharing is a correctness requirement, not an
   * optimization: under refresh-token rotation two concurrent `/auth/refresh`
   * calls present the same rotated token and trip server-side reuse defense
   * (family revocation → hard logout).
   */
  recover(): Promise<boolean>;
}

interface ResolvedTransportConfig {
  readonly baseUrl: string;
  readonly tokenStore: TokenStore | undefined;
  readonly apiKey: string | undefined;
  readonly headers: Readonly<Record<string, string>>;
  readonly mirrorAuthorizationHeader: boolean;
  readonly credentials: RequestCredentials | undefined;
  readonly fetch: typeof fetch;
  readonly timeoutMs: number | undefined;
  readonly onUnauthorized: ((context: AuthFailureContext) => void) | undefined;
  readonly onForbidden: ((context: AuthFailureContext) => void) | undefined;
  readonly clearTokenOnStatuses: readonly number[];
  readonly recoverAuth: (() => Promise<boolean>) | undefined;
}

function resolveTransportConfig(config: Nene2TransportConfig): ResolvedTransportConfig {
  const fetchFn = config.fetch ?? (globalThis as { fetch?: typeof fetch }).fetch;
  if (typeof fetchFn !== 'function') {
    throw new Error('fetch is not available; pass Nene2TransportConfig.fetch');
  }
  return {
    baseUrl: (config.baseUrl ?? '').replace(/\/+$/, ''),
    tokenStore: config.tokenStore,
    apiKey: config.apiKey,
    headers: config.headers ?? {},
    mirrorAuthorizationHeader: config.mirrorAuthorizationHeader ?? true,
    credentials: config.credentials,
    // Bind so an extracted browser `window.fetch` keeps its required receiver.
    fetch: fetchFn.bind(globalThis),
    timeoutMs: config.timeoutMs,
    onUnauthorized: config.onUnauthorized,
    onForbidden: config.onForbidden,
    clearTokenOnStatuses: config.clearTokenOnStatuses ?? [401],
    recoverAuth: config.recoverAuth,
  };
}

/**
 * Shared single-flight around {@link Nene2TransportConfig.recoverAuth}. One
 * instance per transport so every caller — the internal 401-retry and
 * {@link Nene2Transport.recover} — awaits the *same* in-flight recovery
 * (rotation reuse-defense; see the `recoverAuth` docs). A rejected `recoverAuth`
 * is treated as a failed recovery (`false`), never a thrown request.
 */
interface RecoveryController {
  recover(): Promise<boolean>;
}

function createRecoveryController(
  recoverAuth: (() => Promise<boolean>) | undefined,
): RecoveryController {
  if (recoverAuth === undefined) {
    return { recover: () => Promise.resolve(false) };
  }
  let inFlight: Promise<boolean> | null = null;
  return {
    recover(): Promise<boolean> {
      if (inFlight !== null) {
        return inFlight;
      }
      inFlight = (async (): Promise<boolean> => {
        try {
          return await recoverAuth();
        } catch {
          return false;
        } finally {
          inFlight = null;
        }
      })();
      return inFlight;
    },
  };
}

interface SendInit {
  readonly method: string;
  readonly path: string;
  readonly body?: BodyInit | undefined;
  /** `undefined` = do not set (multipart boundary, bodyless requests). */
  readonly contentType?: string | undefined;
  /** `undefined` = do not set (binary downloads). */
  readonly accept?: string | undefined;
  readonly options?: TransportRequestOptions | undefined;
}

/**
 * The only `fetch` call site in the transport. Auth headers always come from
 * {@link buildTransportHeaders}; error statuses are mapped to
 * {@link Nene2ClientError} with Problem Details (never raw HTML), 401/403 run
 * the token-clearing policy and hooks.
 *
 * When `recoverAuth` is configured, a 401 on an authenticated request first
 * attempts one shared recovery (ADR 0008); on success the request is replayed
 * once with `isReplay = true`, which disables further recovery so a replay that
 * 401s again falls through to the fail-closed path.
 */
async function send(
  config: ResolvedTransportConfig,
  recovery: RecoveryController,
  init: SendInit,
  isReplay = false,
): Promise<Response> {
  const url = `${config.baseUrl}${init.path}`;
  const token = config.tokenStore?.getToken() ?? null;
  const headers = buildTransportHeaders({
    staticHeaders: config.headers,
    requestHeaders: init.options?.headers,
    apiKey: config.apiKey,
    token,
    mirrorAuthorization: config.mirrorAuthorizationHeader,
  });
  if (init.accept !== undefined && !headers.has('Accept')) {
    headers.set('Accept', init.accept);
  }
  if (init.contentType !== undefined) {
    headers.set('Content-Type', init.contentType);
  }

  const requestInit: RequestInit = { method: init.method, headers };
  if (init.body !== undefined) {
    requestInit.body = init.body;
  }
  if (config.credentials !== undefined) {
    requestInit.credentials = config.credentials;
  }
  const signal = mergeRequestSignal(init.options?.signal, config.timeoutMs);
  if (signal !== undefined) {
    requestInit.signal = signal;
  }

  let response: Response;
  try {
    response = await config.fetch(url, requestInit);
  } catch (error) {
    throw wrapFetchError(error, url);
  }

  if (response.ok || (init.options?.alsoOkStatuses?.includes(response.status) ?? false)) {
    return response;
  }

  const status = response.status;
  const tokenAttached = token !== null;

  // Silent re-authentication (ADR 0008): on a 401 for an authenticated request,
  // try one shared recovery before clearing the token, then replay once. The
  // replay re-reads the token store (top of send), so it carries the fresh
  // token seated by `recoverAuth`.
  if (status === 401 && tokenAttached && !isReplay && config.recoverAuth !== undefined) {
    const recovered = await recovery.recover();
    if (recovered) {
      return send(config, recovery, init, true);
    }
  }

  const problem = await parseProblemDetailsResponse(response);

  if (tokenAttached && config.clearTokenOnStatuses.includes(status)) {
    config.tokenStore?.clearToken();
  }
  const context: AuthFailureContext = { status, path: init.path, url, tokenAttached, problem };
  if (status === 401 && tokenAttached) {
    config.onUnauthorized?.(context);
  }
  if (status === 403) {
    config.onForbidden?.(context);
  }

  const detail = problem?.detail ?? problem?.title ?? response.statusText;
  throw new Nene2ClientError(`NENE2 request failed: ${detail}`, {
    status,
    url,
    problem,
    rateLimit: parseRateLimitHeaders(response.headers),
  });
}

async function parseJsonBody<T>(response: Response, url: string): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  if (text === '') {
    return undefined as T;
  }
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    const contentType = response.headers.get('content-type') ?? '';
    const hint =
      contentType.includes('text/html') || contentType.includes('text/plain')
        ? ' — response looks like HTML/text; check baseUrl points at the JSON API'
        : '';
    throw new Nene2ClientError(`NENE2 response is not valid JSON${hint}`, {
      status: response.status,
      url,
    });
  }
  return body as T;
}

function parseContentDispositionFilename(header: string | null): string | null {
  if (header === null) {
    return null;
  }
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(header);
  if (match?.[1] === undefined) {
    return null;
  }
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

async function toBlobDownload(response: Response): Promise<BlobDownload> {
  const blob = await response.blob();
  const filename = parseContentDispositionFilename(response.headers.get('Content-Disposition'));
  return { blob, filename };
}

function jsonBody(body: unknown): Pick<SendInit, 'body' | 'contentType'> {
  if (body === undefined) {
    return { body: undefined, contentType: undefined };
  }
  return { body: JSON.stringify(body), contentType: 'application/json' };
}

/**
 * Create the fleet-standard transport.
 *
 * @example
 * ```ts
 * const tokenStore = createSessionTokenStore({ key: 'nene_myproduct_token' });
 * const transport = createNene2Transport({
 *   baseUrl: '',
 *   tokenStore,
 *   onUnauthorized: () => authGate.showLoginInPlace(),
 * });
 * const items = await transport.get<ItemList>('/items');
 * ```
 */
export function createNene2Transport(config: Nene2TransportConfig = {}): Nene2Transport {
  const resolved = resolveTransportConfig(config);
  const recovery = createRecoveryController(resolved.recoverAuth);

  async function requestJson<T>(
    method: string,
    path: string,
    body: unknown,
    options: TransportRequestOptions | undefined,
  ): Promise<T> {
    const response = await send(resolved, recovery, {
      method,
      path,
      ...jsonBody(body),
      accept: 'application/json',
      options,
    });
    return parseJsonBody<T>(response, `${resolved.baseUrl}${path}`);
  }

  async function requestRaw<T>(
    path: string,
    body: BodyInit,
    options: RawBodyRequestOptions | undefined,
  ): Promise<T> {
    const response = await send(resolved, recovery, {
      method: 'POST',
      path,
      body,
      contentType: options?.contentType ?? 'text/csv',
      accept: 'application/json',
      options,
    });
    return parseJsonBody<T>(response, `${resolved.baseUrl}${path}`);
  }

  return {
    get: <T>(path: string, options?: TransportRequestOptions) =>
      requestJson<T>('GET', path, undefined, options),
    post: <T>(path: string, body?: unknown, options?: TransportRequestOptions) =>
      requestJson<T>('POST', path, body, options),
    put: <T>(path: string, body?: unknown, options?: TransportRequestOptions) =>
      requestJson<T>('PUT', path, body, options),
    patch: <T>(path: string, body?: unknown, options?: TransportRequestOptions) =>
      requestJson<T>('PATCH', path, body, options),
    delete: <T = void>(path: string, options?: TransportRequestOptions) =>
      requestJson<T>('DELETE', path, undefined, options),
    getBlob: async (path, options) => {
      const response = await send(resolved, recovery, { method: 'GET', path, options });
      return toBlobDownload(response);
    },
    postBlob: async (path, body, options) => {
      const response = await send(resolved, recovery, {
        method: 'POST',
        path,
        ...jsonBody(body),
        options,
      });
      return toBlobDownload(response);
    },
    upload: async <T>(path: string, formData: FormData, options?: TransportRequestOptions) => {
      // No Content-Type: the browser must add the multipart boundary.
      const response = await send(resolved, recovery, {
        method: 'POST',
        path,
        body: formData,
        accept: 'application/json',
        options,
      });
      return parseJsonBody<T>(response, `${resolved.baseUrl}${path}`);
    },
    postCsv: <T>(path: string, csv: string, options?: RawBodyRequestOptions) =>
      requestRaw<T>(path, csv, options),
    postBytes: <T>(path: string, body: Blob, options?: RawBodyRequestOptions) =>
      requestRaw<T>(path, body, options),
    recover: () => recovery.recover(),
  };
}
