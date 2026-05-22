import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, vi } from 'vitest';
import { createNene2Client } from '../../src/index.js';
import { issueDevJwt } from '../helpers/issue-dev-jwt.js';
import {
  jsonResponse,
  loadFixture,
  problemResponse,
  sequentialFetch,
} from './helpers/mock-fetch.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const JA = resolve(repoRoot, 'docs-site/ja');
const JA_SITE = 'https://hideyukimori.github.io/nene2-js/ja';

function jaDoc(...parts: string[]): string {
  const p = resolve(JA, ...parts);
  if (!existsSync(p)) {
    throw new Error(`F-DOC: 日本語ドキュメントがありません: ${p} (${JA_SITE})`);
  }
  return readFileSync(p, 'utf8');
}

function expectJaIncludes(relPath: string, ...needles: string[]): void {
  const body = jaDoc(relPath);
  for (const n of needles) {
    expect(body, `ja:${relPath} に「${n}」が必要`).toContain(n);
  }
}

const BASE = 'http://localhost:8080';

function client(
  baseUrl: string,
  fetch?: typeof fetch,
  extra?: { apiKey?: string; bearer?: string; signal?: AbortSignal },
) {
  return createNene2Client({
    baseUrl,
    fetch,
    apiKey: extra?.apiKey,
    bearer: extra?.bearer,
    signal: extra?.signal,
  });
}

const API_KEY = 'ft-evac-local-machine-api-key-32ch!!';
const JWT_SECRET = 'ft-evac-local-jwt-secret-min-32-chars!!';

function liveOnbClient() {
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

function runDocProbe(docId: string, stackId: string): void {
  switch (docId) {
    case 'getting_started_npm':
      expectJaIncludes('tutorial/getting-started.md', 'npm install @hideyukimori/nene2-client');
      break;
    case 'getting_started_smoke_code':
      expectJaIncludes('tutorial/getting-started.md', 'createNene2Client', 'client.smoke()');
      break;
    case 'getting_started_curl_health':
      expectJaIncludes('tutorial/getting-started.md', '/health', '"service": "NENE2"');
      break;
    case 'getting_started_auth_env':
      expectJaIncludes(
        'tutorial/getting-started.md',
        'NENE2_JS_API_BASE_URL',
        'NENE2_MACHINE_API_KEY',
      );
      break;
    case 'live_smoke_env':
      expectJaIncludes('howto/live-smoke.md', 'NENE2_JS_API_BASE_URL');
      if (stackId === 'python_first' || stackId === 'alt_ports') {
        expectJaIncludes('howto/live-smoke.md', 'NENE2_JS_PYTHON_BASE_URL', '8000');
      }
      break;
    case 'openapi_sync_cmds':
      expectJaIncludes('howto/openapi-codegen.md', 'contracts:sync', 'codegen');
      break;
    case 'scope_not_server':
      expectJaIncludes('explanation/scope.md', '第二のフレームワーク');
      break;
    case 'problem_details_import':
      expectJaIncludes(
        'explanation/problem-details.md',
        'parseProblemDetailsResponse',
        'Nene2ClientError',
      );
      break;
    case 'nene2_boundary_openapi':
      expectJaIncludes('explanation/nene2-boundary.md', 'OpenAPI');
      break;
    case 'ecosystem_nene2_link':
      expectJaIncludes('integrations/ecosystem.md', 'hideyukimori.github.io/NENE2/');
      break;
    case 'ecosystem_python_link':
      expectJaIncludes('integrations/ecosystem.md', 'hideyukimori.github.io/nene2-python/');
      break;
    case 'config_secrets_warning':
      expectJaIncludes('reference/configuration.md', 'コミット', 'SSRF');
      break;
    case 'client_api_methods':
      expectJaIncludes('reference/client-api.md', 'createNene2Client', 'getProtected');
      break;
    case 'errors_validation_helpers':
      expectJaIncludes('reference/errors.md', 'validationErrorsFromClientError');
      break;
    case 'install_nene2_page':
      expectJaIncludes(
        'howto/install-nene2.md',
        '8080',
        'hideyukimori.github.io/NENE2',
        'composer',
      );
      break;
    case 'install_python_page':
      expectJaIncludes(
        'howto/install-nene2-python.md',
        '8000',
        'hideyukimori.github.io/nene2-python',
      );
      break;
    case 'blank_slate_journey':
      expectJaIncludes('tutorial/blank-slate-journey.md', 'nene2-js', 'NENE2');
      if (stackId === 'python_first') {
        expectJaIncludes('tutorial/blank-slate-journey.md', 'nene2-python', '8000');
      }
      if (stackId === 'nene2_first') {
        expectJaIncludes('tutorial/blank-slate-journey.md', '8080');
      }
      break;
    case 'sibling_layout_hint':
      expectJaIncludes('tutorial/blank-slate-journey.md', '../NENE2', '../nene2-js');
      break;
    case 'multi_backend_env':
      expectJaIncludes('howto/live-smoke.md', 'NENE2_JS_PYTHON_BASE_URL');
      break;
    case 'degraded_health_doc':
      expectJaIncludes('tutorial/getting-started.md', 'allowDegraded');
      break;
    default:
      expectJaIncludes('tutorial/getting-started.md', 'nene2');
  }
}

const CLIENT_HANDLERS: Record<string, () => void | Promise<void>> = {
  smoke_fixture: async () => {
    const c = client(
      BASE,
      sequentialFetch([
        jsonResponse(loadFixture('system/health-ok.json')),
        jsonResponse(loadFixture('system/ping-ok.json')),
      ]),
    );
    const r = await c.smoke();
    expect(r.health.service).toBe('NENE2');
  },
  health_wrong_service: async () => {
    const c = client(BASE, () => Promise.resolve(jsonResponse({ status: 'ok', service: 'OTHER' })));
    // Friction F-45-1: client does not reject non-NENE2 service (Issue #46)
    expect((await c.health()).service).toBe('OTHER');
  },
  notes_list_fixture: async () => {
    const c = client(BASE, () =>
      Promise.resolve(jsonResponse(loadFixture('examples/notes-list-ok.json'))),
    );
    expect((await c.listNotes()).items.length).toBeGreaterThan(0);
  },
  protected_401_fixture: async () => {
    const c = client(BASE, () =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/unauthorized',
            title: 'Unauthorized',
            status: 401,
          },
          401,
        ),
      ),
    );
    await expect(c.getProtected()).rejects.toMatchObject({ status: 401 });
  },
  validation_422_fixture: async () => {
    const c = client(BASE, () =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/validation-failed',
            title: 'Validation Failed',
            status: 422,
            errors: [{ field: 'title', message: 'required' }],
          },
          422,
        ),
      ),
    );
    await expect(c.createNote({ title: '', body: 'x' })).rejects.toMatchObject({ status: 422 });
  },
  html_wrong_port_hint: async () => {
    const c = client(BASE, () =>
      Promise.resolve(
        new Response('<html><body>nginx</body></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        }),
      ),
    );
    await expect(c.health()).rejects.toThrow(/HTML|html/i);
  },
  baseurl_trailing_slash: async () => {
    const c = createNene2Client({
      baseUrl: 'http://localhost:8080///',
      fetch: () => Promise.resolve(jsonResponse(loadFixture('system/health-ok.json'))),
    });
    await c.health();
  },
  abort_signal: async () => {
    const ac = new AbortController();
    ac.abort();
    const c = client(BASE, vi.fn(), { signal: ac.signal });
    await expect(c.health()).rejects.toThrow();
  },
  machine_health_401: async () => {
    const c = client(BASE, () =>
      Promise.resolve(
        problemResponse(
          {
            type: 'https://nene2.dev/problems/unauthorized',
            title: 'Unauthorized',
            status: 401,
          },
          401,
        ),
      ),
    );
    await expect(c.machineHealth()).rejects.toMatchObject({ status: 401 });
  },
  create_note_fixture: async () => {
    const c = client(BASE, () =>
      Promise.resolve(jsonResponse(loadFixture('examples/note-ok.json'), 201)),
    );
    const n = await c.createNote({ title: 'FT', body: 'onboarding' });
    expect(n.title).toBeTruthy();
  },
};

const LIVE_HANDLERS: Record<string, () => void | Promise<void>> = {
  live_smoke_after_nene2: async () => {
    const h = await liveOnbClient().health();
    expect(['ok', 'degraded']).toContain(h.status);
  },
  live_smoke_after_python: async () => {
    const pyUrl = process.env.NENE2_JS_PYTHON_BASE_URL;
    if (!pyUrl) return;
    const h = await client(pyUrl).health();
    expect(h.service).toBe('NENE2');
  },
  live_matrix_skip_unset: async () => {
    expect(process.env.NENE2_JS_NODE_BASE_URL ?? '').toBe('');
  },
  live_protected_journey: async () => {
    await expect(liveOnbClient().getProtected()).resolves.toBeDefined();
  },
  live_notes_journey: async () => {
    await expect(liveOnbClient().listNotes({ limit: 1 })).resolves.toBeDefined();
  },
};

export function isDocsOnboardingHandler(handler: string): boolean {
  return handler.startsWith('onb_');
}

const PERSONA_IDS = ['ai_agent', 'php_dev', 'py_dev', 'ts_app', 'devops', 'founder'] as const;
const STACK_IDS = ['nene2_first', 'python_first', 'alt_ports', 'client_only'] as const;

function parsePersonaStackDoc(handler: string): { docId: string; stackId: string } {
  const rest = handler.slice('onb_doc_'.length);
  for (const persona of PERSONA_IDS) {
    if (!rest.startsWith(`${persona}_`)) continue;
    const afterPersona = rest.slice(persona.length + 1);
    for (const stack of STACK_IDS) {
      if (!afterPersona.startsWith(`${stack}_`)) continue;
      return { stackId: stack, docId: afterPersona.slice(stack.length + 1) };
    }
  }
  throw new Error(`Cannot parse onboarding doc handler: ${handler}`);
}

function parsePersonaScenario(handler: string): string {
  const rest = handler.slice('onb_client_'.length);
  for (const persona of PERSONA_IDS) {
    if (!rest.startsWith(`${persona}_`)) continue;
    return rest.slice(persona.length + 1);
  }
  throw new Error(`Cannot parse onboarding client handler: ${handler}`);
}

export async function runDocsOnboardingHandler(handler: string): Promise<void> {
  if (handler.startsWith('onb_doc_')) {
    const { docId, stackId } = parsePersonaStackDoc(handler);
    runDocProbe(docId, stackId);
    return;
  }

  if (handler.startsWith('onb_client_')) {
    const scenario = parsePersonaScenario(handler);
    const fn = CLIENT_HANDLERS[scenario];
    if (!fn) throw new Error(`Unknown onboarding client scenario: ${scenario}`);
    await fn();
    return;
  }

  if (handler.startsWith('onb_live_')) {
    const key = handler.slice('onb_'.length);
    const fn = LIVE_HANDLERS[key];
    if (!fn) throw new Error(`Unknown onboarding live handler: ${key}`);
    await fn();
    return;
  }

  if (handler.startsWith('onb_misc_')) {
    expectJaIncludes('index.md', 'nene2-js');
    return;
  }

  throw new Error(`Unknown docs onboarding handler: ${handler}`);
}
