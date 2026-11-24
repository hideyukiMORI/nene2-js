/**
 * #106: a relative `baseUrl` (e.g. `/api/v1`) is resolved against
 * `location.origin` at each request, so browsers and jsdom no longer fail to
 * parse the URL. Plain Node, which has no origin, passes the URL as given.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createNene2Transport } from '../../src/index.js';
import { jsonResponse, recordingFetch } from './helpers.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('relative baseUrl (#106)', () => {
  it('resolves a relative baseUrl against location.origin', async () => {
    vi.stubGlobal('location', { origin: 'http://localhost:3000' });
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({ baseUrl: '/api/v1', fetch: recorder.fetch });

    await transport.get('/items');

    expect(recorder.calls[0]?.url).toBe('http://localhost:3000/api/v1/items');
  });

  it('reads the origin at call time, not at transport creation', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({ baseUrl: '/api/v1', fetch: recorder.fetch });

    vi.stubGlobal('location', { origin: 'http://localhost:3000' });
    await transport.get('/items');

    expect(recorder.calls[0]?.url).toBe('http://localhost:3000/api/v1/items');
  });

  it('uses an absolute baseUrl unchanged even when location is stubbed', async () => {
    vi.stubGlobal('location', { origin: 'http://localhost:3000' });
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({
      baseUrl: 'http://api.example.test/v1',
      fetch: recorder.fetch,
    });

    await transport.get('/items');

    expect(recorder.calls[0]?.url).toBe('http://api.example.test/v1/items');
  });

  it('passes the URL unchanged when there is no location global', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({ baseUrl: '/api/v1', fetch: recorder.fetch });

    await transport.get('/items');

    expect(recorder.calls[0]?.url).toBe('/api/v1/items');
  });
});
