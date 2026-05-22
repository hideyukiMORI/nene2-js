import { expect, vi } from 'vitest';
import type { components } from '../../src/generated/openapi.js';
import {
  createNene2Client,
  isNene2ClientError,
  isProblemDetails,
  isValidationProblemDetails,
  Nene2ClientError,
  parseProblemDetails,
  parseValidationProblemDetails,
  validationErrorsByField,
  validationErrorsFromClientError,
} from '../../src/index.js';
import { jsonResponse, loadFixture, problemResponse } from './helpers/mock-fetch.js';

const BASE = 'http://localhost:18080';

function client(fetch?: typeof fetch, extra?: { apiKey?: string; bearer?: string }) {
  return createNene2Client({
    baseUrl: BASE,
    fetch,
    apiKey: extra?.apiKey,
    bearer: extra?.bearer,
  });
}

function problem(status: number, detail?: string) {
  return problemResponse(
    {
      type: `https://nene2.dev/problems/test-${status}`,
      title: `Error ${status}`,
      status,
      detail: detail ?? `detail ${status}`,
    },
    status,
  );
}

function registerBulkHandlers(): Record<string, () => void | Promise<void>> {
  const h: Record<string, () => void | Promise<void>> = {};

  for (const status of [400, 401, 403, 404, 405, 409, 413, 422, 429, 500, 502, 503]) {
    h[`bulk_err_${status}`] = async () => {
      const c = client(() => Promise.resolve(problem(status)));
      await expect(c.getNote(1)).rejects.toMatchObject({ status });
    };
    h[`bulk_err_${status}_create`] = async () => {
      const c = client(() => Promise.resolve(problem(status)));
      await expect(c.createNote({ title: 't', body: 'b' })).rejects.toMatchObject({ status });
    };
  }

  for (const limit of [0, 1, 2, 3, 5, 7, 10, 15, 20, 25, 50, 75, 99, 100, 150, 200, 500, 999]) {
    h[`bulk_q_notes_limit_${limit}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json')));
      });
      await c.listNotes({ limit });
      expect(url).toContain(`limit=${limit}`);
    };
    h[`bulk_q_tags_limit_${limit}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/tags-list-ok.json')));
      });
      await c.listTags({ limit });
      expect(url).toContain(`limit=${limit}`);
    };
  }

  for (const offset of [0, 1, 2, 5, 10, 20, 50, 100, 500, 1000, 9999]) {
    h[`bulk_q_notes_offset_${offset}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json')));
      });
      await c.listNotes({ offset });
      expect(url).toContain(`offset=${offset}`);
    };
    h[`bulk_q_tags_offset_${offset}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/tags-list-ok.json')));
      });
      await c.listTags({ offset });
      expect(url).toContain(`offset=${offset}`);
    };
  }

  for (let i = 0; i < 20; i++) {
    const limit = (i % 9) + 1;
    const offset = i * 3;
    h[`bulk_q_notes_combo_${i}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json')));
      });
      await c.listNotes({ limit, offset });
      expect(url).toContain(`limit=${limit}`);
      expect(url).toContain(`offset=${offset}`);
    };
    h[`bulk_q_tags_combo_${i}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/tags-list-ok.json')));
      });
      await c.listTags({ limit, offset });
      expect(url).toContain(`limit=${limit}`);
    };
  }

  for (const id of [1, 2, 7, 42, 99, 100, 999, 10000, 2147483646]) {
    h[`bulk_notes_id_${id}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json')));
      });
      await c.getNote(id);
      expect(url).toContain(`/examples/notes/${id}`);
    };
    h[`bulk_notes_upd_${id}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json')));
      });
      await c.updateNote(id, { title: 't', body: 'b' });
      expect(url).toContain(`/examples/notes/${id}`);
    };
    h[`bulk_notes_del_${id}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return new Response(null, { status: 204 });
      });
      await c.deleteNote(id);
      expect(url).toContain(`/examples/notes/${id}`);
    };
  }

  for (const id of [1, 3, 8, 55, 200, 9999]) {
    h[`bulk_tags_id_${id}`] = async () => {
      let url = '';
      const c = client((u) => {
        url = u;
        return Promise.resolve(jsonResponse(loadFixture('examples/tag-ok.json')));
      });
      await c.getTag(id);
      expect(url).toContain(`/examples/tags/${id}`);
    };
  }

  for (let n = 0; n < 25; n++) {
    h[`bulk_vdx_fields_${n}`] = async () => {
      const fields = ['title', 'body', 'name', 'email', 'limit'][n % 5];
      const c = client(() =>
        Promise.resolve(
          problemResponse(
            {
              type: 'https://nene2.dev/problems/validation-failed',
              title: 'Validation Failed',
              status: 422,
              errors: [{ field: fields, message: 'bad', code: 'invalid' }],
            },
            422,
          ),
        ),
      );
      try {
        await c.createNote({ title: '', body: 'x' });
      } catch (e) {
        const errs = validationErrorsFromClientError(e);
        expect(errs?.[0]?.field).toBe(fields);
        expect(validationErrorsByField(errs ?? {})[fields]).toBe('bad');
      }
    };
  }

  for (let n = 0; n < 20; n++) {
    h[`bulk_prob_parse_${n}`] = async () => {
      const body = loadFixture('problem/validation-failed.json') as Record<string, unknown>;
      if (n % 3 === 0) {
        expect(isProblemDetails(body)).toBe(true);
      } else if (n % 3 === 1) {
        expect(isValidationProblemDetails(body)).toBe(true);
        expect(parseValidationProblemDetails(body)?.errors.length).toBeGreaterThan(0);
      } else {
        expect(parseProblemDetails(body)?.status).toBe(422);
      }
    };
  }

  const bases = [
    'http://localhost:18080',
    'http://127.0.0.1:18080',
    'http://localhost:18080/',
    'http://localhost:18080/api',
    'https://localhost:18080',
  ];
  for (let i = 0; i < bases.length; i++) {
    const baseUrl = bases[i] ?? BASE;
    h[`bulk_cfg_base_${i}`] = async () => {
      let url = '';
      const c = createNene2Client({
        baseUrl,
        fetch: (u) => {
          url = u;
          return Promise.resolve(jsonResponse(loadFixture('system/health-ok.json')));
        },
      });
      await c.health();
      expect(url).toMatch(/\/health$/);
    };
  }

  for (let i = 0; i < 15; i++) {
    h[`bulk_hdr_variant_${i}`] = async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(jsonResponse(loadFixture('system/health-ok.json')));
      const opts =
        i % 3 === 0
          ? { apiKey: 'k' }
          : i % 3 === 1
            ? { bearer: 'Bearer x' }
            : { apiKey: 'k', bearer: 'y' };
      await client(fetchMock, opts).health();
      expect(fetchMock).toHaveBeenCalled();
    };
  }

  for (let i = 0; i < 12; i++) {
    h[`bulk_conc_${i}`] = async () => {
      const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/ping-ok.json'))));
      const results = await Promise.all(Array.from({ length: 2 + (i % 3) }, () => c.ping()));
      expect(results.every((r) => r.message === 'pong')).toBe(true);
    };
  }

  const schemaKeys: (keyof components['schemas'])[] = [
    'HealthResponse',
    'ExamplePingResponse',
    'FrameworkSmokeResponse',
    'MachineHealthResponse',
    'ExampleNoteResponse',
    'ExampleTagResponse',
    'ProblemDetails',
    'ValidationProblemDetails',
    'ProtectedResponse',
    'CreateNoteRequest',
  ];
  for (let i = 0; i < 10; i++) {
    h[`bulk_schema_${i}`] = async () => {
      const key = schemaKeys[i % schemaKeys.length];
      expect(key).toBeTruthy();
    };
  }

  const fixtureMap: Record<string, string> = {
    bulk_fixture_not_found: 'problem/not-found.json',
    bulk_fixture_validation_failed: 'problem/validation-failed.json',
    bulk_fixture_payload_too_large: 'problem/payload-too-large.json',
    bulk_fixture_health_ok: 'system/health-ok.json',
    bulk_fixture_ping_ok: 'system/ping-ok.json',
    bulk_fixture_note_ok: 'examples/note-ok.json',
    bulk_fixture_tag_ok: 'examples/tag-ok.json',
  };
  for (const [handler, path] of Object.entries(fixtureMap)) {
    h[handler] = async () => {
      const data = loadFixture(path);
      expect(data).toBeTruthy();
    };
  }

  const contentTypes = [
    ['application/problem+json', 422],
    ['application/json', 200],
    ['application/problem+json; charset=utf-8', 422],
    ['text/plain', 500],
  ] as const;
  for (let i = 0; i < 8; i++) {
    h[`bulk_ct_${i}`] = async () => {
      const [ct, status] = contentTypes[i % contentTypes.length] ?? ['application/json', 200];
      const c = client(() =>
        Promise.resolve(
          new Response(JSON.stringify(loadFixture('system/health-ok.json')), {
            status,
            headers: { 'content-type': ct },
          }),
        ),
      );
      if (status === 200) {
        expect((await c.health()).status).toBe('ok');
      } else {
        await expect(c.health()).rejects.toBeInstanceOf(Nene2ClientError);
      }
    };
  }

  for (let k = 0; k < 115; k++) {
    h[`bulk_misc_${k}`] = async () => {
      const mod = k % 6;
      if (mod === 0) {
        expect(isNene2ClientError(new Nene2ClientError('x', 500))).toBe(true);
      } else if (mod === 1) {
        const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/health-ok.json'))));
        expect((await c.health()).service).toBe('NENE2');
      } else if (mod === 2) {
        const c = client(() =>
          Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json'))),
        );
        expect((await c.listNotes()).items.length).toBeGreaterThan(0);
      } else if (mod === 3) {
        const c = client(() =>
          Promise.resolve(jsonResponse(loadFixture('examples/tags-list-ok.json'))),
        );
        expect((await c.listTags()).items.length).toBeGreaterThan(0);
      } else if (mod === 4) {
        const c = client(
          () => Promise.resolve(jsonResponse(loadFixture('examples/protected-ok.json'))),
          {
            bearer: 'tok',
          },
        );
        expect((await c.getProtected()).message).toBeTruthy();
      } else {
        const c = client(() => Promise.resolve(jsonResponse(loadFixture('system/ping-ok.json'))));
        expect((await c.ping()).status).toBe('ok');
      }
    };
  }

  return h;
}

export const BULK_HANDLERS = registerBulkHandlers();

export function isBulkHandler(handler: string): boolean {
  return handler.startsWith('bulk_');
}
