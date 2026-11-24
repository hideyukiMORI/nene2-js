/**
 * resolveRequestUrl (#106): a relative `baseUrl` such as `/api/v1` must resolve
 * against the page origin in browsers and jsdom; plain Node has no origin, so
 * the URL is left as given. Absolute URLs are never rewritten.
 */
import { describe, expect, it } from 'vitest';
import { resolveRequestUrl } from '../../src/transport/url.js';

describe('resolveRequestUrl', () => {
  it('returns an absolute baseUrl unchanged (even when an origin is available)', () => {
    expect(resolveRequestUrl('https://api.example.com/v1', '/items', 'http://localhost:3000')).toBe(
      'https://api.example.com/v1/items',
    );
    // Any scheme counts, not just http(s).
    expect(resolveRequestUrl('ws://socket.example', '/path', 'http://localhost:3000')).toBe(
      'ws://socket.example/path',
    );
  });

  it('resolves a relative baseUrl against the page origin', () => {
    expect(resolveRequestUrl('/api/v1', '/items', 'http://localhost:3000')).toBe(
      'http://localhost:3000/api/v1/items',
    );
  });

  it('resolves the path when baseUrl is empty and an origin is available', () => {
    expect(resolveRequestUrl('', '/items', 'http://localhost:3000')).toBe(
      'http://localhost:3000/items',
    );
  });

  it('leaves a relative URL unchanged when no (non-empty) origin is available', () => {
    expect(resolveRequestUrl('/api/v1', '/items', undefined)).toBe('/api/v1/items');
    // An empty-string origin is "no origin" too.
    expect(resolveRequestUrl('/api/v1', '/items', '')).toBe('/api/v1/items');
  });

  it('preserves the query string', () => {
    expect(resolveRequestUrl('/api/v1', '/items?x=1', 'http://localhost:3000')).toBe(
      'http://localhost:3000/api/v1/items?x=1',
    );
  });

  it('resolves an absolute-path URL against an origin that carries its own path or trailing slash', () => {
    expect(resolveRequestUrl('/api/v1', '/items', 'http://localhost:3000/some/path')).toBe(
      'http://localhost:3000/api/v1/items',
    );
    expect(resolveRequestUrl('/api/v1', '/items', 'http://localhost:3000/')).toBe(
      'http://localhost:3000/api/v1/items',
    );
  });
});
