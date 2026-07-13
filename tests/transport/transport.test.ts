/**
 * Invariants 3/4/6 (#102): route coverage (JSON / blob / multipart / CSV /
 * bytes), Problem Details mapping (API errors are never surfaced as HTML),
 * and the token never appearing in any request URL.
 */
import { describe, expect, it } from 'vitest';
import {
  createNene2Transport,
  createSessionTokenStore,
  isNene2ClientError,
} from '../../src/index.js';
import { createFakeStorage, jsonResponse, problemResponse, recordingFetch } from './helpers.js';

const TOKEN = 'super-secret-token';

function authedTransport(fetchImpl: typeof fetch, baseUrl = '') {
  const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
  store.setToken(TOKEN);
  return createNene2Transport({ baseUrl, tokenStore: store, fetch: fetchImpl });
}

describe('JSON verbs', () => {
  it('parses JSON bodies and resolves undefined for 204 / empty responses', async () => {
    const recorder = recordingFetch(
      jsonResponse({ id: 1 }),
      new Response(null, { status: 204 }),
      new Response('', { status: 200 }),
    );
    const transport = authedTransport(recorder.fetch);

    await expect(transport.get<{ id: number }>('/items/1')).resolves.toEqual({ id: 1 });
    await expect(transport.delete('/items/1')).resolves.toBeUndefined();
    await expect(transport.post('/items/1/touch')).resolves.toBeUndefined();
  });

  it('serializes JSON bodies with Content-Type application/json', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = authedTransport(recorder.fetch);
    await transport.post('/items', { name: 'x' });

    const call = recorder.calls[0];
    expect(call?.init.body).toBe('{"name":"x"}');
    expect(new Headers(call?.init.headers).get('Content-Type')).toBe('application/json');
  });

  it('omits body and Content-Type for bodyless requests', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = authedTransport(recorder.fetch);
    await transport.get('/items');

    const call = recorder.calls[0];
    expect(call?.init.body).toBeUndefined();
    expect(new Headers(call?.init.headers).get('Content-Type')).toBeNull();
  });

  it('strips trailing slashes from baseUrl and defaults to same-origin relative paths', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    await authedTransport(recorder.fetch, 'http://api.test///').get('/items');
    await authedTransport(recorder.fetch).get('/items');

    expect(recorder.calls[0]?.url).toBe('http://api.test/items');
    expect(recorder.calls[1]?.url).toBe('/items');
  });
});

describe('token never rides in the URL', () => {
  it('no transport method has a token parameter, and request URLs never contain the token', async () => {
    const recorder = recordingFetch(
      jsonResponse({ ok: true }),
      jsonResponse({ ok: true }),
      new Response('bin', { status: 200 }),
      jsonResponse({ ok: true }),
      jsonResponse({ ok: true }),
    );
    const transport = authedTransport(recorder.fetch, 'http://api.test');

    await transport.get('/a');
    await transport.post('/b', { x: 1 });
    await transport.getBlob('/c');
    await transport.upload('/d', new FormData());
    await transport.postCsv('/e', 'a\n');
    expect(recorder.calls).toHaveLength(5);

    for (const call of recorder.calls) {
      expect(call.url).not.toContain(TOKEN);
    }
  });
});

describe('Problem Details → Nene2ClientError (never HTML)', () => {
  it('attaches the parsed problem document on API errors', async () => {
    const recorder = recordingFetch(
      problemResponse(422, {
        type: 'https://nene2.dev/problems/validation-failed',
        title: 'Validation failed',
        status: 422,
        detail: 'name is required',
      }),
    );
    const transport = authedTransport(recorder.fetch);

    const error = await transport.post('/items', {}).catch((e: unknown) => e);
    if (!isNene2ClientError(error)) {
      throw new Error('expected Nene2ClientError');
    }
    expect(error.status).toBe(422);
    expect(error.problem?.type).toBe('https://nene2.dev/problems/validation-failed');
    expect(error.message).toContain('name is required');
  });

  it('does not leak an HTML error page into the error (problem undefined, body not in message)', async () => {
    const html = '<html><body><h1>502 Bad Gateway</h1></body></html>';
    const recorder = recordingFetch(
      new Response(html, { status: 502, headers: { 'Content-Type': 'text/html' } }),
    );
    const transport = authedTransport(recorder.fetch);

    const error = await transport.get('/items').catch((e: unknown) => e);
    if (!isNene2ClientError(error)) {
      throw new Error('expected Nene2ClientError');
    }
    expect(error.status).toBe(502);
    expect(error.problem).toBeUndefined();
    expect(error.message).not.toContain('<html>');
  });

  it('flags an HTML body on a 200 as not-JSON with a baseUrl hint', async () => {
    const recorder = recordingFetch(
      new Response('<html></html>', { status: 200, headers: { 'Content-Type': 'text/html' } }),
    );
    const transport = authedTransport(recorder.fetch);

    await expect(transport.get('/items')).rejects.toMatchObject({
      name: 'Nene2ClientError',
      message: expect.stringContaining('not valid JSON') as string,
    });
  });
});

describe('blob downloads', () => {
  it('getBlob returns the blob and the Content-Disposition filename', async () => {
    const recorder = recordingFetch(
      new Response('col1,col2\n', {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="export-2026.csv"',
        },
      }),
    );
    const transport = authedTransport(recorder.fetch);

    const { blob, filename } = await transport.getBlob('/export');
    expect(await blob.text()).toBe('col1,col2\n');
    expect(filename).toBe('export-2026.csv');
  });

  it('postBlob sends the JSON body and resolves filename null without Content-Disposition', async () => {
    const recorder = recordingFetch(new Response('bin', { status: 200 }));
    const transport = authedTransport(recorder.fetch);

    const { filename } = await transport.postBlob('/export', { format: 'csv' });
    expect(recorder.calls[0]?.init.body).toBe('{"format":"csv"}');
    expect(recorder.calls[0]?.init.method).toBe('POST');
    expect(filename).toBeNull();
  });
});

describe('multipart upload', () => {
  it('passes FormData through without a manual Content-Type (browser sets the boundary)', async () => {
    const recorder = recordingFetch(jsonResponse({ stored: true }));
    const transport = authedTransport(recorder.fetch);
    const form = new FormData();
    form.set('file', new Blob(['data']), 'doc.pdf');

    await expect(transport.upload('/documents', form)).resolves.toEqual({ stored: true });

    const call = recorder.calls[0];
    expect(call?.init.body).toBeInstanceOf(FormData);
    expect(new Headers(call?.init.headers).get('Content-Type')).toBeNull();
  });
});

describe('CSV / raw bytes POST', () => {
  it('postCsv sends text/csv and resolves the 422 rejection report via alsoOkStatuses', async () => {
    const report = { accepted: 0, errors: [{ row: 1, message: 'bad date' }] };
    const recorder = recordingFetch(jsonResponse(report, 422));
    const transport = authedTransport(recorder.fetch);

    const result = await transport.postCsv('/import', 'a,b\n1,2\n', { alsoOkStatuses: [422] });

    expect(result).toEqual(report);
    const call = recorder.calls[0];
    expect(call?.init.body).toBe('a,b\n1,2\n');
    expect(new Headers(call?.init.headers).get('Content-Type')).toBe('text/csv');
  });

  it('postBytes sends the Blob unchanged (no re-decode) with an overridable Content-Type', async () => {
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = authedTransport(recorder.fetch);
    const sjisBytes = new Blob([new Uint8Array([0x93, 0xfa, 0x96, 0x7b])]);

    await transport.postBytes('/import', sjisBytes, { contentType: 'text/csv; charset=Shift_JIS' });

    const call = recorder.calls[0];
    expect(call?.init.body).toBe(sjisBytes);
    expect(new Headers(call?.init.headers).get('Content-Type')).toBe('text/csv; charset=Shift_JIS');
  });

  it('postCsv still throws on a non-allowed error status', async () => {
    const recorder = recordingFetch(
      problemResponse(500, { type: 'about:blank', title: 'Server error', status: 500 }),
    );
    const transport = authedTransport(recorder.fetch);

    await expect(
      transport.postCsv('/import', 'a\n', { alsoOkStatuses: [422] }),
    ).rejects.toMatchObject({ status: 500 });
  });
});

describe('config forwarding', () => {
  it('forwards credentials to every request when configured', async () => {
    const store = createSessionTokenStore({ key: 'k', storage: createFakeStorage() });
    const recorder = recordingFetch(jsonResponse({ ok: true }));
    const transport = createNene2Transport({
      tokenStore: store,
      credentials: 'include',
      fetch: recorder.fetch,
    });
    await transport.get('/items');

    expect(recorder.calls[0]?.init.credentials).toBe('include');
  });

  it('wraps network failures in Nene2ClientError with status 0', async () => {
    const failingFetch: typeof fetch = () => Promise.reject(new TypeError('ECONNREFUSED'));
    const transport = createNene2Transport({ fetch: failingFetch });

    await expect(transport.get('/items')).rejects.toMatchObject({
      name: 'Nene2ClientError',
      status: 0,
    });
  });
});
