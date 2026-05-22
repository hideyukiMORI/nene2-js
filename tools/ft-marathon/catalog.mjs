/**
 * FT30–FT129 catalog (100 scenarios).
 */

/** @typedef {{ ft: number, category: string, theme: string, handler: string, mode: 'fixture'|'live', personaA: string, personaB: string }} FtCatalogEntry */

/** @type {FtCatalogEntry[]} */
export const FT_CATALOG = [];

let ft = 30;

/**
 * @param {Omit<FtCatalogEntry, 'ft'>} entry
 */
function add(entry) {
  FT_CATALOG.push({ ft, ...entry });
  ft += 1;
}

const pb = 'Persona B: low risk onboarding step.';

// --- health (8) ---
add({
  category: 'health',
  theme: 'health 200 ok',
  handler: 'health_ok',
  mode: 'fixture',
  personaA: 'Dashboard green path',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health 503 throw default',
  handler: 'health_503_throw',
  mode: 'fixture',
  personaA: 'LB expects throw by default',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health 503 allowDegraded',
  handler: 'health_503_allow',
  mode: 'fixture',
  personaA: 'SRE opt-in degraded',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health checks map ok',
  handler: 'health_checks_ok',
  mode: 'fixture',
  personaA: 'checks.database display',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health service must be NENE2',
  handler: 'health_service_nene2',
  mode: 'fixture',
  personaA: 'Detect wrong backend',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health invalid shape',
  handler: 'health_invalid_shape',
  mode: 'fixture',
  personaA: 'Guard typo responses',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health html wrong port',
  handler: 'health_html',
  mode: 'fixture',
  personaA: 'FT15 html hint',
  personaB: pb,
});
add({
  category: 'health',
  theme: 'health 500 problem',
  handler: 'health_500',
  mode: 'fixture',
  personaA: 'Ops alert path',
  personaB: pb,
});

// --- system (7) ---
add({
  category: 'system',
  theme: 'frameworkSmoke GET /',
  handler: 'framework_ok',
  mode: 'fixture',
  personaA: 'Root metadata',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'ping pong',
  handler: 'ping_ok',
  mode: 'fixture',
  personaA: 'Quick alive check',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'smoke parallel',
  handler: 'smoke_ok',
  mode: 'fixture',
  personaA: 'FT12 single call',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'machineHealth 200',
  handler: 'machine_ok',
  mode: 'fixture',
  personaA: 'Machine monitor',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'machineHealth 401',
  handler: 'machine_401',
  mode: 'fixture',
  personaA: 'Missing api key',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'framework bad status',
  handler: 'framework_bad',
  mode: 'fixture',
  personaA: 'Strict guard',
  personaB: pb,
});
add({
  category: 'system',
  theme: 'ping bad message',
  handler: 'ping_bad',
  mode: 'fixture',
  personaA: 'Strict guard',
  personaB: pb,
});

// --- notes (12) ---
add({
  category: 'notes',
  theme: 'listNotes',
  handler: 'notes_list',
  mode: 'fixture',
  personaA: 'Table data',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'listNotes query',
  handler: 'notes_list_query',
  mode: 'fixture',
  personaA: 'Pagination',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'getNote',
  handler: 'notes_get',
  mode: 'fixture',
  personaA: 'Detail view',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'createNote',
  handler: 'notes_create',
  mode: 'fixture',
  personaA: 'Form submit',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'updateNote',
  handler: 'notes_update',
  mode: 'fixture',
  personaA: 'Edit save',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'deleteNote',
  handler: 'notes_delete',
  mode: 'fixture',
  personaA: 'Remove row',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'getNote 404',
  handler: 'notes_get_404',
  mode: 'fixture',
  personaA: 'Missing id UX',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'createNote 422',
  handler: 'notes_create_422',
  mode: 'fixture',
  personaA: 'Form validation map',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'createNote POST body',
  handler: 'notes_create_body',
  mode: 'fixture',
  personaA: 'Payload inspect',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'update path',
  handler: 'notes_update_path',
  mode: 'fixture',
  personaA: 'URL id',
  personaB: pb,
});
add({
  category: 'notes',
  theme: 'delete path',
  handler: 'notes_delete_path',
  mode: 'fixture',
  personaA: 'URL id',
  personaB: pb,
});

// --- tags (12) ---
add({
  category: 'tags',
  theme: 'listTags',
  handler: 'tags_list',
  mode: 'fixture',
  personaA: 'Tag picker',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'listTags query',
  handler: 'tags_list_query',
  mode: 'fixture',
  personaA: 'Pagination',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'getTag',
  handler: 'tags_get',
  mode: 'fixture',
  personaA: 'Detail',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'createTag',
  handler: 'tags_create',
  mode: 'fixture',
  personaA: 'Add tag',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'updateTag',
  handler: 'tags_update',
  mode: 'fixture',
  personaA: 'Rename',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'deleteTag',
  handler: 'tags_delete',
  mode: 'fixture',
  personaA: 'Remove',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'getTag 404',
  handler: 'tags_get_404',
  mode: 'fixture',
  personaA: 'Missing',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'createTag body',
  handler: 'tags_create_body',
  mode: 'fixture',
  personaA: 'POST JSON',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'update path',
  handler: 'tags_update_path',
  mode: 'fixture',
  personaA: 'PUT path',
  personaB: pb,
});
add({
  category: 'tags',
  theme: 'delete path',
  handler: 'tags_delete_path',
  mode: 'fixture',
  personaA: 'DELETE path',
  personaB: pb,
});

// --- protected (6) ---
add({
  category: 'protected',
  theme: 'getProtected ok',
  handler: 'protected_ok',
  mode: 'fixture',
  personaA: 'JWT claims UI',
  personaB: pb,
});
add({
  category: 'protected',
  theme: 'getProtected 401',
  handler: 'protected_401',
  mode: 'fixture',
  personaA: 'Login redirect',
  personaB: pb,
});
add({
  category: 'protected',
  theme: 'bearer header',
  handler: 'protected_bearer_hdr',
  mode: 'fixture',
  personaA: 'Header inspect',
  personaB: pb,
});
add({
  category: 'protected',
  theme: 'invalid jwt',
  handler: 'protected_bad_token',
  mode: 'fixture',
  personaA: 'Expired token',
  personaB: pb,
});
add({
  category: 'protected',
  theme: 'claims sub',
  handler: 'protected_claims',
  mode: 'fixture',
  personaA: 'User id',
  personaB: pb,
});
add({
  category: 'protected',
  theme: 'welcome message',
  handler: 'protected_message',
  mode: 'fixture',
  personaA: 'Copy display',
  personaB: pb,
});

// --- auth-headers (8) ---
add({
  category: 'auth-headers',
  theme: 'apiKey machine',
  handler: 'hdr_machine_key',
  mode: 'fixture',
  personaA: 'Ops key',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'bearer protected',
  handler: 'hdr_bearer',
  mode: 'fixture',
  personaA: 'JWT',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'both headers',
  handler: 'hdr_both',
  mode: 'fixture',
  personaA: 'Mixed clients',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'X-NENE2-API-Key name',
  handler: 'hdr_apikey_name',
  mode: 'fixture',
  personaA: 'Spec header',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'Authorization Bearer',
  handler: 'hdr_bearer_fmt',
  mode: 'fixture',
  personaA: 'RFC format',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'public no auth',
  handler: 'hdr_public_health',
  mode: 'fixture',
  personaA: 'Anonymous health',
  personaB: pb,
});
add({
  category: 'auth-headers',
  theme: 'no apiKey on health',
  handler: 'hdr_no_key_health',
  mode: 'fixture',
  personaA: 'Public path',
  personaB: pb,
});

// --- config-dx (8) ---
add({
  category: 'config-dx',
  theme: 'trailing slash',
  handler: 'cfg_trailing_slash',
  mode: 'fixture',
  personaA: 'Copy-paste URL',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'empty baseUrl',
  handler: 'cfg_empty_url',
  mode: 'fixture',
  personaA: 'Fail fast',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'custom fetch',
  handler: 'cfg_custom_fetch',
  mode: 'fixture',
  personaA: 'Test double',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'AbortSignal',
  handler: 'cfg_signal',
  mode: 'fixture',
  personaA: 'Cancel refresh',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'port in baseUrl',
  handler: 'cfg_port_url',
  mode: 'fixture',
  personaA: 'Evac 18080',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'fetch required',
  handler: 'cfg_no_fetch',
  mode: 'fixture',
  personaA: 'Node 22',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'two clients',
  handler: 'cfg_two_clients',
  mode: 'fixture',
  personaA: 'Multi-tenant',
  personaB: pb,
});
add({
  category: 'config-dx',
  theme: 'strip only trailing',
  handler: 'cfg_strip_trail',
  mode: 'fixture',
  personaA: 'Path preserve',
  personaB: pb,
});

// --- errors (10) ---
add({
  category: 'errors',
  theme: '404 not-found',
  handler: 'err_404',
  mode: 'fixture',
  personaA: 'Missing resource',
  personaB: pb,
});
add({
  category: 'errors',
  theme: '422 validation',
  handler: 'err_422',
  mode: 'fixture',
  personaA: 'Form errors',
  personaB: pb,
});
add({
  category: 'errors',
  theme: '500 internal',
  handler: 'err_500',
  mode: 'fixture',
  personaA: 'Retry UX',
  personaB: pb,
});
add({
  category: 'errors',
  theme: '401 unauthorized',
  handler: 'err_401',
  mode: 'fixture',
  personaA: 'Auth gate',
  personaB: pb,
});
add({
  category: 'errors',
  theme: '413 too large',
  handler: 'err_413',
  mode: 'fixture',
  personaA: 'Upload limit',
  personaB: pb,
});
add({
  category: 'errors',
  theme: 'invalid json',
  handler: 'err_invalid_json',
  mode: 'fixture',
  personaA: 'Broken proxy',
  personaB: pb,
});
add({
  category: 'errors',
  theme: 'html 200',
  handler: 'err_html',
  mode: 'fixture',
  personaA: 'Wrong port',
  personaB: pb,
});
add({
  category: 'errors',
  theme: '204 delete',
  handler: 'err_204',
  mode: 'fixture',
  personaA: 'No body',
  personaB: pb,
});
add({
  category: 'errors',
  theme: 'problem detail text',
  handler: 'err_detail',
  mode: 'fixture',
  personaA: 'Toast message',
  personaB: pb,
});
add({
  category: 'errors',
  theme: 'shape mismatch',
  handler: 'err_shape',
  mode: 'fixture',
  personaA: 'Contract drift',
  personaB: pb,
});

// --- problem (8) ---
add({
  category: 'problem',
  theme: 'isProblemDetails',
  handler: 'prob_is_pd',
  mode: 'fixture',
  personaA: 'Type narrow',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'isValidationPD',
  handler: 'prob_is_vpd',
  mode: 'fixture',
  personaA: 'Form map',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'parseResponse',
  handler: 'prob_parse_resp',
  mode: 'fixture',
  personaA: 'Raw fetch',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'validation type URI',
  handler: 'prob_val_type',
  mode: 'fixture',
  personaA: 'Branch UI',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'extensions',
  handler: 'prob_extensions',
  mode: 'fixture',
  personaA: 'Extra fields',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'isValidationError',
  handler: 'prob_is_ve',
  mode: 'fixture',
  personaA: 'Field row',
  personaB: pb,
});
add({
  category: 'problem',
  theme: 'non-problem undefined',
  handler: 'prob_non',
  mode: 'fixture',
  personaA: 'Fallback',
  personaB: pb,
});

// --- validation-dx (7) ---
add({
  category: 'validation-dx',
  theme: 'fromClientError',
  handler: 'vdx_from_err',
  mode: 'fixture',
  personaA: 'Catch UX',
  personaB: pb,
});
add({
  category: 'validation-dx',
  theme: 'byField',
  handler: 'vdx_by_field',
  mode: 'fixture',
  personaA: 'Input highlight',
  personaB: pb,
});
add({
  category: 'validation-dx',
  theme: 'non-client undefined',
  handler: 'vdx_non_client',
  mode: 'fixture',
  personaA: 'Unknown throw',
  personaB: pb,
});
add({
  category: 'validation-dx',
  theme: '404 no extract',
  handler: 'vdx_404',
  mode: 'fixture',
  personaA: 'Not form error',
  personaB: pb,
});
add({
  category: 'validation-dx',
  theme: 'type URI match',
  handler: 'vdx_type_uri',
  mode: 'fixture',
  personaA: 'NENE2 type',
  personaB: pb,
});
add({
  category: 'validation-dx',
  theme: 'error code field',
  handler: 'vdx_code',
  mode: 'fixture',
  personaA: 'i18n key',
  personaB: pb,
});

// --- concurrency (5) ---
add({
  category: 'concurrency',
  theme: 'smoke parallel',
  handler: 'conc_smoke',
  mode: 'fixture',
  personaA: 'Latency',
  personaB: pb,
});
add({
  category: 'concurrency',
  theme: 'parallel lists',
  handler: 'conc_lists',
  mode: 'fixture',
  personaA: 'Dashboard',
  personaB: pb,
});
add({
  category: 'concurrency',
  theme: 'seq health',
  handler: 'conc_seq_health',
  mode: 'fixture',
  personaA: 'Polling',
  personaB: pb,
});
add({
  category: 'concurrency',
  theme: 'create then get',
  handler: 'conc_create_get',
  mode: 'fixture',
  personaA: 'Optimistic UI',
  personaB: pb,
});

// --- query (7) ---
add({
  category: 'query',
  theme: 'notes limit',
  handler: 'q_notes_limit',
  mode: 'fixture',
  personaA: 'Page size',
  personaB: pb,
});
add({
  category: 'query',
  theme: 'notes offset',
  handler: 'q_notes_offset',
  mode: 'fixture',
  personaA: 'Page 2',
  personaB: pb,
});
add({
  category: 'query',
  theme: 'notes both',
  handler: 'q_notes_both',
  mode: 'fixture',
  personaA: 'Pager',
  personaB: pb,
});
add({
  category: 'query',
  theme: 'tags limit',
  handler: 'q_tags_limit',
  mode: 'fixture',
  personaA: 'Page size',
  personaB: pb,
});
add({
  category: 'query',
  theme: 'tags offset zero',
  handler: 'q_tags_offset',
  mode: 'fixture',
  personaA: 'First page',
  personaB: pb,
});

// --- live-evac (12) ---
const pl = 'Persona A: live evac 18080.';
add({
  category: 'live-evac',
  theme: 'live health',
  handler: 'live_health',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live ping',
  handler: 'live_ping',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live smoke',
  handler: 'live_smoke',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live framework',
  handler: 'live_framework',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live machine',
  handler: 'live_machine',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live listNotes',
  handler: 'live_list_notes',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live notes CRUD',
  handler: 'live_notes_crud',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live tags CRUD',
  handler: 'live_tags_crud',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live protected',
  handler: 'live_protected',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live 422',
  handler: 'live_422',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});
add({
  category: 'live-evac',
  theme: 'live listTags',
  handler: 'live_list_tags',
  mode: 'live',
  personaA: pl,
  personaB: pb,
});

import { buildBulkTemplates } from './generate-bulk-catalog.mjs';
import { buildDocsOnboardingTemplates } from './generate-docs-onboarding-catalog.mjs';

let onbFt = 130;
for (const tmpl of buildDocsOnboardingTemplates()) {
  FT_CATALOG.push({ ft: onbFt, ...tmpl });
  onbFt += 1;
}

const BULK_COUNT = 300;
const bulkTemplates = buildBulkTemplates();
if (bulkTemplates.length < BULK_COUNT) {
  throw new Error(`bulk catalog needs ${BULK_COUNT} templates, got ${bulkTemplates.length}`);
}
let bulkFt = 230;
for (let i = 0; i < BULK_COUNT; i++) {
  FT_CATALOG.push({ ft: bulkFt, ...bulkTemplates[i] });
  bulkFt += 1;
}

export const MARATHON_SIZE = 500;

if (FT_CATALOG.length !== MARATHON_SIZE) {
  throw new Error(`FT catalog must have ${MARATHON_SIZE} entries, got ${FT_CATALOG.length}`);
}

export const FT_RANGE = { start: 30, end: 529, issue: 42 };
export const FT_ONBOARDING_RANGE = { start: 130, end: 229, issue: 45 };
export const FT_BULK_RANGE = { start: 230, end: 529, issue: 42 };
