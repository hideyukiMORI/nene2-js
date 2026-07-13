/**
 * Single choke point for auth headers (issue #102; the nene-deal #83 pattern).
 *
 * Every transport path — JSON verbs, blob downloads, multipart uploads, raw
 * CSV/bytes POSTs — builds its headers here. The bearer token rides on both
 * `Authorization` and the `X-Authorization` mirror: some shared-hosting front
 * proxies (Tier A; observed on HETEML) strip the standard `Authorization`
 * header before it reaches PHP, so the backend falls back to the mirror when
 * the standard header is missing (nene-deal #67/#68, nene-clear #265,
 * nene-vault #118).
 *
 * Auth headers are applied **after** static and per-request headers, so no
 * caller can drop or overwrite the mirror.
 */

/** @internal */
export interface TransportHeaderInput {
  /** Static headers from the transport config (e.g. `X-Organization-Slug`). */
  readonly staticHeaders: Readonly<Record<string, string>>;
  /** Per-request extra headers (cannot override auth headers). */
  readonly requestHeaders: Readonly<Record<string, string>> | undefined;
  /** Machine client API key (`X-NENE2-API-Key`). */
  readonly apiKey: string | undefined;
  /** Bearer token from the token store, or `null` when signed out. */
  readonly token: string | null;
}

/** @internal */
export function buildTransportHeaders(input: TransportHeaderInput): Headers {
  const headers = new Headers(input.staticHeaders);
  if (input.requestHeaders !== undefined) {
    for (const [name, value] of Object.entries(input.requestHeaders)) {
      headers.set(name, value);
    }
  }
  // Auth last: static / per-request headers can never drop the mirror.
  if (input.apiKey !== undefined) {
    headers.set('X-NENE2-API-Key', input.apiKey);
  }
  if (input.token !== null) {
    headers.set('Authorization', `Bearer ${input.token}`);
    headers.set('X-Authorization', `Bearer ${input.token}`);
  }
  return headers;
}
