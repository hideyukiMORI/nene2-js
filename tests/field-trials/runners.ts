import { expect, vi } from 'vitest';
import {
  createNene2Client,
  isNene2ValidationFailedProblem,
  isProblemDetails,
  isValidationError,
  isValidationProblemDetails,
  Nene2ClientError,
  parseProblemDetails,
  parseProblemDetailsResponse,
  parseValidationProblemDetails,
  problemDetailsExtensions,
  validationErrorsByField,
  validationErrorsFromClientError,
  isNene2ValidationFailedType,
} from '../../src/index.js';
import { issueDevJwt } from '../helpers/issue-dev-jwt.js';
import {
  jsonResponse,
  loadFixture,
  problemResponse,
  sequentialFetch,
} from './helpers/mock-fetch.js';

const BASE = 'http://localhost:18080';
const API_KEY = 'ft-evac-local-machine-api-key-32ch!!';
const JWT_SECRET = 'ft-evac-local-jwt-secret-min-32-chars!!';

function client(
  fetch?: typeof fetch,
  extra?: { apiKey?: string; bearer?: string; signal?: AbortSignal },
) {
  return createNene2Client({
    baseUrl: BASE,
    fetch,
    apiKey: extra?.apiKey,
    bearer: extra?.bearer,
    signal: extra?.signal,
  });
}

function liveClient() {
  const baseUrl = process.env.NENE2_JS_API_BASE_URL ?? BASE;
  const apiKey = process.env.NENE2_MACHINE_API_KEY ?? API_KEY;
  const secret = process.env.NENE2_LOCAL_JWT_SECRET ?? JWT_SECRET;
  const bearer =
    process.env.NENE2_JS_BEARER_TOKEN ??
    issueDevJwt(secret, {
      sub: 'user-42',
      scope: 'read:system',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
  return createNene2Client({ baseUrl, apiKey, bearer });
}

const HANDLERS: Record<string, () => void | Promise<void>> = {
  health_ok: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/health-ok.json'))));
    const h = await c.health();
    expect(h.status).toBe('ok');
  },
  health_503_throw: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse(loadFixture('system/health-degraded.json'), 503)),
    );
    await expect(c.health()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  health_503_allow: async () => {
    const fetchMock = sequentialFetch([
      jsonResponse(loadFixture('system/health-degraded.json'), 503),
    ]);
    const c = client(fetchMock);
    const h = await c.health({ allowDegraded: true });
    expect(h.status).toBe('degraded');
  },
  health_checks_ok: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse({ status: 'ok', service: 'NENE2', checks: { database: 'ok' } })),
    );
    expect((await c.health()).checks?.database).toBe('ok');
  },
  health_service_nene2: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/health-ok.json'))));
    expect((await c.health()).service).toBe('NENE2');
  },
  health_invalid_shape: async () => {
    const c = client(() => Promise.resolve(jsonResponse({ status: 'ok' })));
    await expect(c.health()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  health_html: async () => {
    const c = client(() =>
      Promise.resolve(new Response('<html/>', { headers: { 'content-type': 'text/html' } })),
    );
    await expect(c.health()).rejects.toSatisfy(
      (e: unknown) => e instanceof Nene2ClientError && e.message.includes('HTML'),
    );
  },
  health_500: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/internal', title: 'Error', status: 500 },
          500,
        ),
      ),
    );
    await expect(c.health()).rejects.toMatchObject({ status: 500 });
  },
  framework_ok: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse(loadFixture('system/framework-smoke-ok.json'))),
    );
    expect((await c.frameworkSmoke()).name).toBe('NENE2');
  },
  ping_ok: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/ping-ok.json'))));
    expect((await c.ping()).message).toBe('pong');
  },
  smoke_ok: async () => {
    const fetchMock = sequentialFetch([
      jsonResponse(loadFixture('system/health-ok.json')),
      jsonResponse(loadFixture('system/ping-ok.json')),
    ]);
    const r = await client(fetchMock).smoke();
    expect(r.ping.message).toBe('pong');
  },
  machine_ok: async () => {
    const c = client(
      () => Promise.resolve(jsonResponse(loadFixture('system/machine-health-ok.json'))),
      { apiKey: 'k' },
    );
    expect((await c.machineHealth()).credential_type).toBe('api_key');
  },
  machine_401: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/unauthorized', title: 'Unauthorized', status: 401 },
          401,
        ),
      ),
    );
    await expect(c.machineHealth()).rejects.toMatchObject({ status: 401 });
  },
  framework_bad: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse({ name: 'NENE2', description: 'x', status: 'bad' })),
    );
    await expect(c.frameworkSmoke()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  ping_bad: async () => {
    const c = client(() => Promise.resolve(jsonResponse({ message: 'no', status: 'ok' })));
    await expect(c.ping()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  notes_list: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json'))),
    );
    expect((await c.listNotes()).items.length).toBeGreaterThan(0);
  },
  notes_list_query: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/notes-list-ok.json'));
    });
    await c.listNotes({ limit: 5, offset: 10 });
    expect(url).toContain('limit=5');
    expect(url).toContain('offset=10');
  },
  notes_get: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json'))));
    expect((await c.getNote(1)).id).toBe(1);
  },
  notes_create: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json'), 201)),
    );
    expect((await c.createNote({ title: 't', body: 'b' })).id).toBe(1);
  },
  notes_update: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json'))));
    expect((await c.updateNote(1, { title: 't', body: 'b' })).id).toBe(1);
  },
  notes_delete: async () => {
    const c = client(() => Promise.resolve(new Response(null, { status: 204 })));
    await c.deleteNote(1);
  },
  notes_get_404: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/not-found', title: 'Not Found', status: 404 },
          404,
        ),
      ),
    );
    await expect(c.getNote(99)).rejects.toMatchObject({ status: 404 });
  },
  notes_create_422: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/validation-failed',
            title: 'Validation Failed',
            status: 422,
            errors: [{ field: 'title', message: 'Required', code: 'required' }],
          },
          422,
        ),
      ),
    );
    try {
      await c.createNote({ title: '', body: 'b' });
    } catch (e) {
      expect(validationErrorsFromClientError(e)?.[0]?.field).toBe('title');
    }
  },
  notes_list_empty: async () => {
    const c = client(() => Promise.resolve(jsonResponse({ items: [], limit: 20, offset: 0 })));
    expect((await c.listNotes()).items).toEqual([]);
  },
  notes_create_body: async () => {
    let body = '';
    const c = client(async (_u, init) => {
      body = String((init as RequestInit).body);
      return jsonResponse(loadFixture('examples/note-ok.json'), 201);
    });
    await c.createNote({ title: 'A', body: 'B' });
    expect(body).toContain('"title":"A"');
  },
  notes_update_path: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/note-ok.json'));
    });
    await c.updateNote(42, { title: 't', body: 'b' });
    expect(url).toContain('/examples/notes/42');
  },
  notes_delete_path: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return new Response(null, { status: 204 });
    });
    await c.deleteNote(7);
    expect(url).toContain('/examples/notes/7');
  },
  tags_list: async () => {
    const c = client(() =>
      Promise.resolve(jsonResponse(loadFixture('examples/tags-list-ok.json'))),
    );
    expect((await c.listTags()).items[0]?.name).toBe('php');
  },
  tags_list_query: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/tags-list-ok.json'));
    });
    await c.listTags({ limit: 3 });
    expect(url).toContain('limit=3');
  },
  tags_get: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('examples/tag-ok.json'))));
    expect((await c.getTag(1)).name).toBe('php');
  },
  tags_create: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('examples/tag-ok.json'), 201)));
    expect((await c.createTag({ name: 'x' })).id).toBe(1);
  },
  tags_update: async () => {
    const c = client(() => Promise.resolve(jsonResponse(loadFixture('examples/tag-ok.json'))));
    expect((await c.updateTag(1, { name: 'y' })).name).toBe('php');
  },
  tags_delete: async () => {
    const c = client(() => Promise.resolve(new Response(null, { status: 204 })));
    await c.deleteTag(1);
  },
  tags_get_404: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/not-found', title: 'Not Found', status: 404 },
          404,
        ),
      ),
    );
    await expect(c.getTag(9)).rejects.toMatchObject({ status: 404 });
  },
  tags_create_422: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/validation-failed',
            title: 'Validation Failed',
            status: 422,
            errors: [{ field: 'name', message: 'Required', code: 'required' }],
          },
          422,
        ),
      ),
    );
    await expect(c.createTag({ name: '' })).rejects.toMatchObject({ status: 422 });
  },
  tags_list_empty: async () => {
    const c = client(() => Promise.resolve(jsonResponse({ items: [], limit: 20, offset: 0 })));
    expect((await c.listTags()).items).toEqual([]);
  },
  tags_create_body: async () => {
    let body = '';
    const c = client(async (_u, init) => {
      body = String((init as RequestInit).body);
      return jsonResponse(loadFixture('examples/tag-ok.json'), 201);
    });
    await c.createTag({ name: 'z' });
    expect(body).toContain('"name":"z"');
  },
  tags_update_path: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/tag-ok.json'));
    });
    await c.updateTag(3, { name: 'a' });
    expect(url).toContain('/examples/tags/3');
  },
  tags_delete_path: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return new Response(null, { status: 204 });
    });
    await c.deleteTag(2);
    expect(url).toContain('/examples/tags/2');
  },
  protected_ok: async () => {
    const c = client(
      () => Promise.resolve(jsonResponse(loadFixture('examples/protected-ok.json'))),
      { bearer: 'tok' },
    );
    expect((await c.getProtected()).claims.sub).toBe('user-42');
  },
  protected_401: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/unauthorized', title: 'Unauthorized', status: 401 },
          401,
        ),
      ),
    );
    await expect(c.getProtected()).rejects.toMatchObject({ status: 401 });
  },
  protected_bearer_hdr: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('examples/protected-ok.json')));
    const c = client(fetchMock, { bearer: 'abc' });
    await c.getProtected();
    const h = new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers);
    expect(h.get('Authorization')).toBe('Bearer abc');
  },
  protected_bad_token: async () => {
    const c = client(
      () =>
        Promise.resolve(
          problemResponse(
            { type: 'https://nene2.dev/problems/unauthorized', title: 'Unauthorized', status: 401 },
            401,
          ),
        ),
      { bearer: 'bad' },
    );
    await expect(c.getProtected()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  protected_claims: async () => {
    const c = client(
      () => Promise.resolve(jsonResponse(loadFixture('examples/protected-ok.json'))),
      { bearer: 't' },
    );
    expect((await c.getProtected()).claims.scope).toBe('read:system');
  },
  protected_message: async () => {
    const c = client(
      () => Promise.resolve(jsonResponse(loadFixture('examples/protected-ok.json'))),
      { bearer: 't' },
    );
    expect((await c.getProtected()).message).toContain('Welcome');
  },
  hdr_machine_key: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('system/machine-health-ok.json')));
    const c = client(fetchMock, { apiKey: 'machine-key' });
    await c.machineHealth();
    expect(
      new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers).get('X-NENE2-API-Key'),
    ).toBe('machine-key');
  },
  hdr_bearer: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('examples/protected-ok.json')));
    const c = client(fetchMock, { bearer: 'jwt' });
    await c.getProtected();
    expect(
      new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers).get('Authorization'),
    ).toBe('Bearer jwt');
  },
  hdr_both: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('examples/protected-ok.json')));
    const c = client(fetchMock, { apiKey: 'k', bearer: 'j' });
    await c.getProtected();
    const h = new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers);
    expect(h.get('X-NENE2-API-Key')).toBe('k');
    expect(h.get('Authorization')).toBe('Bearer j');
  },
  hdr_apikey_name: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('system/machine-health-ok.json')));
    await client(fetchMock, { apiKey: 'x' }).machineHealth();
    expect(
      new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers).has('X-NENE2-API-Key'),
    ).toBe(true);
  },
  hdr_bearer_fmt: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('examples/protected-ok.json')));
    await client(fetchMock, { bearer: 'tok' }).getProtected();
    expect(
      new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers).get('Authorization'),
    ).toMatch(/^Bearer /);
  },
  hdr_public_health: async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(loadFixture('system/health-ok.json')));
    await client(fetchMock).health();
    const h = new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers);
    expect(h.get('Authorization')).toBeNull();
    expect(h.get('X-NENE2-API-Key')).toBeNull();
  },
  hdr_no_key_health: async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(loadFixture('system/health-ok.json')));
    await client(fetchMock, { apiKey: 'should-not-need' }).health();
    const h = new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers);
    expect(h.get('X-NENE2-API-Key')).toBe('should-not-need');
  },
  hdr_notes_no_bearer: async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse(loadFixture('examples/notes-list-ok.json')));
    await client(fetchMock, { bearer: 'ignored' }).listNotes();
    expect(
      new Headers((fetchMock.mock.calls[0]?.[1] as RequestInit).headers).get('Authorization'),
    ).toBe('Bearer ignored');
  },
  cfg_trailing_slash: async () => {
    let url = '';
    const c = createNene2Client({
      baseUrl: 'http://localhost:18080///',
      fetch: async (u) => {
        url = u;
        return jsonResponse(loadFixture('system/health-ok.json'));
      },
    });
    await c.health();
    expect(url).toBe('http://localhost:18080/health');
  },
  cfg_empty_url: () => {
    expect(() => createNene2Client({ baseUrl: '' })).toThrow(/baseUrl/);
  },
  cfg_custom_fetch: async () => {
    const custom = vi.fn().mockResolvedValue(jsonResponse(loadFixture('system/ping-ok.json')));
    expect((await createNene2Client({ baseUrl: BASE, fetch: custom }).ping()).message).toBe('pong');
  },
  cfg_signal: async () => {
    const ac = new AbortController();
    const custom = vi.fn().mockImplementation((_u: string, init?: RequestInit) => {
      expect(init?.signal).toBe(ac.signal);
      return Promise.resolve(jsonResponse(loadFixture('system/health-ok.json')));
    });
    await createNene2Client({ baseUrl: BASE, fetch: custom, signal: ac.signal }).health();
  },
  cfg_port_url: async () => {
    const c = createNene2Client({
      baseUrl: 'http://127.0.0.1:18080',
      fetch: async () => jsonResponse(loadFixture('system/health-ok.json')),
    });
    expect((await c.health()).service).toBe('NENE2');
  },
  cfg_no_fetch: () => {
    const prev = globalThis.fetch;
    vi.stubGlobal('fetch', undefined);
    try {
      expect(() => createNene2Client({ baseUrl: BASE })).toThrow(/fetch/);
    } finally {
      vi.stubGlobal('fetch', prev);
    }
  },
  cfg_two_clients: async () => {
    const a = client(() => Promise.resolve(jsonResponse(loadFixture('system/health-ok.json'))));
    const b = client(() => Promise.resolve(jsonResponse(loadFixture('system/ping-ok.json'))));
    expect((await a.health()).status).toBe('ok');
    expect((await b.ping()).message).toBe('pong');
  },
  cfg_strip_trail: async () => {
    const c = createNene2Client({
      baseUrl: 'http://localhost:18080',
      fetch: async (u) => {
        expect(u.startsWith('http://localhost:18080/health')).toBe(true);
        return jsonResponse(loadFixture('system/health-ok.json'));
      },
    });
    await c.health();
  },
  err_404: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/not-found',
            title: 'Not Found',
            status: 404,
            detail: 'x',
          },
          404,
        ),
      ),
    );
    const err = await c.getNote(1).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(Nene2ClientError);
    expect((err as Nene2ClientError).problem?.status).toBe(404);
  },
  err_422: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/validation-failed',
            title: 'Validation Failed',
            status: 422,
            errors: [{ field: 'a', message: 'b', code: 'c' }],
          },
          422,
        ),
      ),
    );
    await expect(c.createNote({ title: 'a', body: 'b' })).rejects.toMatchObject({ status: 422 });
  },
  err_500: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/internal', title: 'Error', status: 500 },
          500,
        ),
      ),
    );
    await expect(c.ping()).rejects.toMatchObject({ status: 500 });
  },
  err_401: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/unauthorized', title: 'Unauthorized', status: 401 },
          401,
        ),
      ),
    );
    await expect(c.getProtected()).rejects.toMatchObject({ status: 401 });
  },
  err_413: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          { type: 'https://nene2.dev/problems/payload-too-large', title: 'Too Large', status: 413 },
          413,
        ),
      ),
    );
    await expect(c.createNote({ title: 'a', body: 'b' })).rejects.toMatchObject({ status: 413 });
  },
  err_invalid_json: async () => {
    const c = client(() => Promise.resolve(new Response('not json', { status: 200 })));
    await expect(c.health()).rejects.toBeInstanceOf(Nene2ClientError);
  },
  err_html: async () => {
    const c = client(() =>
      Promise.resolve(
        new Response('<html/>', { status: 200, headers: { 'content-type': 'text/html' } }),
      ),
    );
    await expect(c.ping()).rejects.toSatisfy(
      (e: unknown) => e instanceof Nene2ClientError && e.message.includes('HTML'),
    );
  },
  err_204: async () => {
    const c = client(() => Promise.resolve(new Response(null, { status: 204 })));
    await expect(c.deleteNote(1)).resolves.toBeUndefined();
  },
  err_detail: async () => {
    const c = client(() =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/not-found',
            title: 'Not Found',
            status: 404,
            detail: 'Custom detail',
          },
          404,
        ),
      ),
    );
    try {
      await c.getNote(1);
    } catch (e) {
      expect((e as Nene2ClientError).message).toContain('Custom detail');
    }
  },
  err_shape: async () => {
    const c = client(() => Promise.resolve(jsonResponse({ foo: 'bar' })));
    await expect(c.listNotes()).rejects.toMatchObject({ message: /does not match/ });
  },
  prob_is_pd: () => {
    expect(isProblemDetails({ type: 't', title: 'T', status: 404 })).toBe(true);
  },
  prob_is_vpd: () => {
    expect(
      isValidationProblemDetails({
        type: 't',
        title: 'T',
        status: 422,
        errors: [{ field: 'f', message: 'm', code: 'c' }],
      }),
    ).toBe(true);
  },
  prob_parse_resp: async () => {
    const res = new Response(JSON.stringify({ type: 't', title: 'T', status: 422 }), {
      headers: { 'content-type': 'application/problem+json' },
    });
    expect((await parseProblemDetailsResponse(res))?.status).toBe(422);
  },
  prob_val_type: () => {
    expect(isNene2ValidationFailedType('https://nene2.dev/problems/validation-failed')).toBe(true);
  },
  prob_extensions: () => {
    const ext = problemDetailsExtensions({
      type: 't',
      title: 'T',
      status: 422,
      trace_id: 'abc',
    });
    expect(ext.trace_id).toBe('abc');
  },
  prob_is_ve: () => {
    expect(isValidationError({ field: 'f', message: 'm', code: 'c' })).toBe(true);
  },
  prob_non: () => {
    expect(parseProblemDetails({ foo: 1 })).toBeUndefined();
  },
  prob_min_errors: () => {
    expect(isValidationProblemDetails({ type: 't', title: 'T', status: 422, errors: [] })).toBe(
      false,
    );
  },
  vdx_from_err: () => {
    const err = new Nene2ClientError('x', {
      status: 422,
      url: BASE,
      problem: {
        type: 'https://nene2.dev/problems/validation-failed',
        title: 'V',
        status: 422,
        errors: [{ field: 'title', message: 'm', code: 'c' }],
      },
    });
    expect(validationErrorsFromClientError(err)?.length).toBe(1);
  },
  vdx_by_field: () => {
    const map = validationErrorsByField([
      { field: 'a', message: 'first', code: 'x' },
      { field: 'a', message: 'second', code: 'y' },
    ]);
    expect(map.a).toBe('first');
  },
  vdx_non_client: () => {
    expect(validationErrorsFromClientError(new Error('x'))).toBeUndefined();
  },
  vdx_404: () => {
    const err = new Nene2ClientError('x', {
      status: 404,
      url: BASE,
      problem: { type: 'https://nene2.dev/problems/not-found', title: 'N', status: 404 },
    });
    expect(validationErrorsFromClientError(err)).toBeUndefined();
  },
  vdx_type_uri: () => {
    const p = {
      type: 'https://nene2.dev/problems/validation-failed',
      title: 'V',
      status: 422,
      errors: [{ field: 'f', message: 'm', code: 'c' }],
    };
    expect(isNene2ValidationFailedProblem(p)).toBe(true);
  },
  vdx_code: () => {
    const errs = validationErrorsFromClientError(
      new Nene2ClientError('x', {
        status: 422,
        url: BASE,
        problem: {
          type: 'https://nene2.dev/problems/validation-failed',
          title: 'V',
          status: 422,
          errors: [{ field: 'f', message: 'm', code: 'required' }],
        },
      }),
    );
    expect(errs?.[0]?.code).toBe('required');
  },
  vdx_not_vdoc: () => {
    expect(parseValidationProblemDetails({ type: 't', title: 'T', status: 422 })).toBeUndefined();
  },
  conc_smoke: async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(jsonResponse(loadFixture('system/health-ok.json')));
    fetchMock.mockResolvedValueOnce(jsonResponse(loadFixture('system/ping-ok.json')));
    await client(fetchMock).smoke();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  },
  conc_lists: async () => {
    const fetchMock = sequentialFetch([
      jsonResponse(loadFixture('examples/notes-list-ok.json')),
      jsonResponse(loadFixture('examples/tags-list-ok.json')),
    ]);
    const c = client(fetchMock);
    const [n, t] = await Promise.all([c.listNotes(), c.listTags()]);
    expect(n.items.length).toBeGreaterThan(0);
    expect(t.items.length).toBeGreaterThan(0);
  },
  conc_seq_health: async () => {
    let calls = 0;
    const fetchMock = async () => {
      calls += 1;
      return jsonResponse(loadFixture('system/health-ok.json'));
    };
    const c = client(fetchMock);
    await c.health();
    await c.health();
    expect(calls).toBe(2);
  },
  conc_create_get: async () => {
    const fetchMock = sequentialFetch([
      jsonResponse(loadFixture('examples/note-ok.json'), 201),
      jsonResponse(loadFixture('examples/note-ok.json')),
    ]);
    const c = client(fetchMock);
    const created = await c.createNote({ title: 't', body: 'b' });
    expect((await c.getNote(created.id)).id).toBe(created.id);
  },
  conc_update_create: async () => {
    const fetchMock = sequentialFetch([
      jsonResponse(loadFixture('examples/note-ok.json'), 201),
      jsonResponse({ ...loadFixture('examples/note-ok.json'), title: 'Updated' }),
    ]);
    const c = client(fetchMock);
    const n = await c.createNote({ title: 't', body: 'b' });
    expect((await c.updateNote(n.id, { title: 'Updated', body: 'b' })).title).toBe('Updated');
  },
  q_notes_limit: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/notes-list-ok.json'));
    });
    await c.listNotes({ limit: 99 });
    expect(url).toContain('limit=99');
  },
  q_notes_offset: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/notes-list-ok.json'));
    });
    await c.listNotes({ offset: 5 });
    expect(url).toContain('offset=5');
  },
  q_notes_both: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/notes-list-ok.json'));
    });
    await c.listNotes({ limit: 2, offset: 4 });
    expect(url).toContain('limit=2');
    expect(url).toContain('offset=4');
  },
  q_tags_limit: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/tags-list-ok.json'));
    });
    await c.listTags({ limit: 11 });
    expect(url).toContain('limit=11');
  },
  q_tags_offset: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/tags-list-ok.json'));
    });
    await c.listTags({ offset: 0 });
    expect(url).toContain('offset=0');
  },
  q_notes_enc: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/notes-list-ok.json'));
    });
    await c.listNotes({ limit: 1, offset: 2 });
    expect(url).toMatch(/\/examples\/notes\?/);
  },
  q_tags_enc: async () => {
    let url = '';
    const c = client(async (u) => {
      url = u;
      return jsonResponse(loadFixture('examples/tags-list-ok.json'));
    });
    await c.listTags({ limit: 1 });
    expect(url).toMatch(/\/examples\/tags\?/);
  },
  live_health: async () => {
    expect((await liveClient().health()).service).toBe('NENE2');
  },
  live_ping: async () => {
    expect((await liveClient().ping()).message).toBe('pong');
  },
  live_smoke: async () => {
    const r = await liveClient().smoke();
    expect(r.health.status).toBe('ok');
  },
  live_framework: async () => {
    expect((await liveClient().frameworkSmoke()).status).toBe('ok');
  },
  live_machine: async () => {
    expect((await liveClient().machineHealth()).credential_type).toBe('api_key');
  },
  live_list_notes: async () => {
    expect(Array.isArray((await liveClient().listNotes({ limit: 1 })).items)).toBe(true);
  },
  live_notes_crud: async () => {
    const c = liveClient();
    const suffix = String(Date.now());
    const created = await c.createNote({ title: `ft ${suffix}`, body: 'b' });
    await c.updateNote(created.id, { title: `ft2 ${suffix}`, body: 'b2' });
    await c.deleteNote(created.id);
  },
  live_tags_crud: async () => {
    const c = liveClient();
    const suffix = String(Date.now());
    const tag = await c.createTag({ name: `ft-tag-${suffix}` });
    await c.updateTag(tag.id, { name: `ft-tag-upd-${suffix}` });
    await c.deleteTag(tag.id);
  },
  live_protected: async () => {
    expect((await liveClient().getProtected()).claims.sub).toBe('user-42');
  },
  live_422: async () => {
    const c = liveClient();
    await expect(c.createNote({ title: '', body: 'x' })).rejects.toMatchObject({ status: 422 });
  },
  live_list_tags: async () => {
    expect(Array.isArray((await liveClient().listTags()).items)).toBe(true);
  },
};

export async function runFtHandler(handler: string): Promise<void> {
  const fn = HANDLERS[handler];
  if (fn === undefined) {
    throw new Error(`Unknown FT handler: ${handler}`);
  }
  await fn();
}
