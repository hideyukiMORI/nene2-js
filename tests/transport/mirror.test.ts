/**
 * Invariant 1 (#102): every verb and every path — JSON, blob, multipart,
 * CSV/bytes — carries the bearer on BOTH `Authorization` and the
 * `X-Authorization` mirror (HETEML-class proxies strip the standard header;
 * nene-deal #83 / nene-clear #265 / nene-vault #118 regression class).
 */
import { describe, expect, it } from 'vitest';
import { createNene2Transport, createSessionTokenStore } from '../../src/index.js';
import type { Nene2Transport } from '../../src/index.js';
import { createFakeStorage, jsonResponse, recordingFetch } from './helpers.js';

const TOKEN = 'test-jwt-token';

function makeTransport(fetchImpl: typeof fetch): Nene2Transport {
  const store = createSessionTokenStore({ key: 'nene_test_token', storage: createFakeStorage() });
  store.setToken(TOKEN);
  return createNene2Transport({
    baseUrl: 'http://api.example.test',
    tokenStore: store,
    fetch: fetchImpl,
  });
}

type PathCase = {
  readonly name: string;
  readonly run: (transport: Nene2Transport) => Promise<unknown>;
  readonly response: () => Response;
};

const cases: readonly PathCase[] = [
  { name: 'get', run: (t) => t.get('/items'), response: () => jsonResponse({ ok: true }) },
  {
    name: 'post',
    run: (t) => t.post('/items', { a: 1 }),
    response: () => jsonResponse({ ok: true }),
  },
  { name: 'put', run: (t) => t.put('/items/1', { a: 1 }), response: () => jsonResponse({}) },
  { name: 'patch', run: (t) => t.patch('/items/1', { a: 1 }), response: () => jsonResponse({}) },
  {
    name: 'delete',
    run: (t) => t.delete('/items/1'),
    response: () => new Response(null, { status: 204 }),
  },
  {
    name: 'getBlob',
    run: (t) => t.getBlob('/items/export'),
    response: () => new Response('col1,col2\n', { status: 200 }),
  },
  {
    name: 'postBlob',
    run: (t) => t.postBlob('/items/export', { format: 'csv' }),
    response: () => new Response('col1,col2\n', { status: 200 }),
  },
  {
    name: 'upload',
    run: (t) => {
      const form = new FormData();
      form.set('file', new Blob(['x']), 'x.txt');
      return t.upload('/items/upload', form);
    },
    response: () => jsonResponse({ ok: true }),
  },
  {
    name: 'postCsv',
    run: (t) => t.postCsv('/items/import', 'a,b\n1,2\n'),
    response: () => jsonResponse({ ok: true }),
  },
  {
    name: 'postBytes',
    run: (t) => t.postBytes('/items/import-bytes', new Blob(['a,b\n'])),
    response: () => jsonResponse({ ok: true }),
  },
];

describe('X-Authorization mirror on every transport path', () => {
  for (const pathCase of cases) {
    it(`${pathCase.name}() sends Authorization AND X-Authorization`, async () => {
      const recorder = recordingFetch(pathCase.response());
      await pathCase.run(makeTransport(recorder.fetch));

      expect(recorder.calls).toHaveLength(1);
      const headers = new Headers(recorder.calls[0]?.init.headers);
      expect(headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
      expect(headers.get('X-Authorization')).toBe(`Bearer ${TOKEN}`);
    });
  }

  it('per-request headers cannot drop or overwrite the mirror', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = makeTransport(recorder.fetch);
    await transport.get('/items', {
      headers: { 'X-Authorization': 'spoofed', Authorization: 'spoofed' },
    });

    const headers = new Headers(recorder.calls[0]?.init.headers);
    expect(headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(headers.get('X-Authorization')).toBe(`Bearer ${TOKEN}`);
  });

  it('static config headers ride along without touching the mirror', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken(TOKEN);
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({
      tokenStore: store,
      apiKey: 'machine-key',
      headers: { 'X-Organization-Slug': 'acme' },
      fetch: recorder.fetch,
    });
    await transport.get('/items');

    const headers = new Headers(recorder.calls[0]?.init.headers);
    expect(headers.get('X-Organization-Slug')).toBe('acme');
    expect(headers.get('X-NENE2-API-Key')).toBe('machine-key');
    expect(headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(headers.get('X-Authorization')).toBe(`Bearer ${TOKEN}`);
  });

  it('sends no auth headers when signed out', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({ tokenStore: store, fetch: recorder.fetch });
    await transport.get('/items');

    const headers = new Headers(recorder.calls[0]?.init.headers);
    expect(headers.get('Authorization')).toBeNull();
    expect(headers.get('X-Authorization')).toBeNull();
  });

  it('reads the token store on every request (rotation picked up)', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    store.setToken('first');
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({ tokenStore: store, fetch: recorder.fetch });

    await transport.get('/a');
    store.setToken('second');
    await transport.get('/b');

    expect(new Headers(recorder.calls[0]?.init.headers).get('X-Authorization')).toBe(
      'Bearer first',
    );
    expect(new Headers(recorder.calls[1]?.init.headers).get('X-Authorization')).toBe(
      'Bearer second',
    );
  });
});

describe('X-Authorization mirror on the typed createNene2Client', () => {
  it('bearer requests carry the mirror too', async () => {
    const recorder = recordingFetch(jsonResponse({ user: { sub: 'u1' }, claims: {} }, 200));
    const { createNene2Client } = await import('../../src/index.js');
    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      bearer: 'test-jwt',
      fetch: recorder.fetch,
    });
    await client.getProtected().catch(() => undefined);

    const headers = new Headers(recorder.calls[0]?.init.headers);
    expect(headers.get('Authorization')).toBe('Bearer test-jwt');
    expect(headers.get('X-Authorization')).toBe('Bearer test-jwt');
  });
});
