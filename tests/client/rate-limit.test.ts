import { describe, expect, it } from 'vitest';
import { parseRateLimitHeaders } from '../../src/client/rate-limit.js';

describe('parseRateLimitHeaders', () => {
  it('returns undefined when no rate-limit headers', () => {
    expect(parseRateLimitHeaders(new Headers())).toBeUndefined();
  });

  it('parses Retry-After and X-RateLimit-* headers', () => {
    const headers = new Headers({
      'Retry-After': '60',
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': '1716048060',
    });
    expect(parseRateLimitHeaders(headers)).toEqual({
      retryAfterSeconds: 60,
      limit: 100,
      remaining: 0,
      reset: 1716048060,
    });
  });

  it('returns partial object when only some headers are present', () => {
    expect(parseRateLimitHeaders(new Headers({ 'Retry-After': '30' }))).toEqual({
      retryAfterSeconds: 30,
    });
  });

  it('ignores non-numeric header values', () => {
    expect(parseRateLimitHeaders(new Headers({ 'Retry-After': 'not-a-number' }))).toBeUndefined();
  });
});
