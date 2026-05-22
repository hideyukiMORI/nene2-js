/** Rate-limit metadata from HTTP response headers (OpenAPI TooManyRequests). */
export type RateLimitInfo = {
  readonly retryAfterSeconds?: number;
  readonly limit?: number;
  readonly remaining?: number;
  readonly reset?: number;
};

function parseHeaderInt(value: string | null): number | undefined {
  if (value === null || value.trim() === '') {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** Parse Retry-After and X-RateLimit-* from a response. Returns undefined when absent. */
export function parseRateLimitHeaders(headers: Headers): RateLimitInfo | undefined {
  const retryAfterSeconds = parseHeaderInt(headers.get('Retry-After'));
  const limit = parseHeaderInt(headers.get('X-RateLimit-Limit'));
  const remaining = parseHeaderInt(headers.get('X-RateLimit-Remaining'));
  const reset = parseHeaderInt(headers.get('X-RateLimit-Reset'));

  if (
    retryAfterSeconds === undefined &&
    limit === undefined &&
    remaining === undefined &&
    reset === undefined
  ) {
    return undefined;
  }

  return {
    ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}),
    ...(limit !== undefined ? { limit } : {}),
    ...(remaining !== undefined ? { remaining } : {}),
    ...(reset !== undefined ? { reset } : {}),
  };
}
