/**
 * Append optional query parameters to a path (no leading `?` duplication).
 */
export function withQuery(
  path: string,
  query?: Readonly<Record<string, number | string | undefined>>,
): string {
  if (query === undefined) {
    return path;
  }
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return qs.length > 0 ? `${path}?${qs}` : path;
}
