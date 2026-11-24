/**
 * Resolve a transport request URL against the page origin (issue #106).
 *
 * A relative `baseUrl` such as `/api/v1` must resolve against the page origin in
 * browsers and jsdom; plain Node has no origin, so the URL is left as given.
 */
export function resolveRequestUrl(
  baseUrl: string,
  path: string,
  origin: string | undefined,
): string {
  const raw = baseUrl + path;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) {
    return raw;
  }
  if (typeof origin === 'string' && origin.length > 0) {
    return new URL(raw, origin).href;
  }
  return raw;
}
