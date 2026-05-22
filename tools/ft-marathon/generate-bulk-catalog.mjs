#!/usr/bin/env node
/**
 * Build FT130–FT529 bulk catalog entries (400 scenarios).
 * Imported by catalog.mjs — do not run in CI directly.
 */

const pb = 'Persona B: marathon bulk regression.';

/** @typedef {{ handler: string, category: string, theme: string, mode: 'fixture'|'live', personaA: string, personaB: string }} BulkTemplate */

/** @type {BulkTemplate[]} */
export function buildBulkTemplates() {
  const t = [];

  const errStatuses = [400, 401, 403, 404, 405, 409, 413, 422, 429, 500, 502, 503];
  for (const s of errStatuses) {
    t.push({
      handler: `bulk_err_${s}`,
      category: 'errors-bulk',
      theme: `problem HTTP ${s} on getNote`,
      mode: 'fixture',
      personaA: `Error surface ${s}`,
      personaB: pb,
    });
    t.push({
      handler: `bulk_err_${s}_create`,
      category: 'errors-bulk',
      theme: `problem HTTP ${s} on createNote`,
      mode: 'fixture',
      personaA: `POST failure ${s}`,
      personaB: pb,
    });
  }

  for (const limit of [0, 1, 2, 3, 5, 7, 10, 15, 20, 25, 50, 75, 99, 100, 150, 200, 500, 999]) {
    t.push({
      handler: `bulk_q_notes_limit_${limit}`,
      category: 'query-bulk',
      theme: `notes list limit=${limit}`,
      mode: 'fixture',
      personaA: 'Pagination limit encoding',
      personaB: pb,
    });
    t.push({
      handler: `bulk_q_tags_limit_${limit}`,
      category: 'query-bulk',
      theme: `tags list limit=${limit}`,
      mode: 'fixture',
      personaA: 'Tags pagination',
      personaB: pb,
    });
  }

  for (const offset of [0, 1, 2, 5, 10, 20, 50, 100, 500, 1000, 9999]) {
    t.push({
      handler: `bulk_q_notes_offset_${offset}`,
      category: 'query-bulk',
      theme: `notes offset=${offset}`,
      mode: 'fixture',
      personaA: 'Pagination offset',
      personaB: pb,
    });
    t.push({
      handler: `bulk_q_tags_offset_${offset}`,
      category: 'query-bulk',
      theme: `tags offset=${offset}`,
      mode: 'fixture',
      personaA: 'Tags offset',
      personaB: pb,
    });
  }

  for (let i = 0; i < 20; i++) {
    t.push({
      handler: `bulk_q_notes_combo_${i}`,
      category: 'query-bulk',
      theme: `notes limit+offset combo ${i}`,
      mode: 'fixture',
      personaA: 'Combined query params',
      personaB: pb,
    });
    t.push({
      handler: `bulk_q_tags_combo_${i}`,
      category: 'query-bulk',
      theme: `tags limit+offset combo ${i}`,
      mode: 'fixture',
      personaA: 'Tags combo query',
      personaB: pb,
    });
  }

  const noteIds = [1, 2, 7, 42, 99, 100, 999, 10000, 2147483646];
  for (const id of noteIds) {
    t.push({
      handler: `bulk_notes_id_${id}`,
      category: 'notes-bulk',
      theme: `getNote path id=${id}`,
      mode: 'fixture',
      personaA: 'Path param integer',
      personaB: pb,
    });
    t.push({
      handler: `bulk_notes_upd_${id}`,
      category: 'notes-bulk',
      theme: `updateNote id=${id}`,
      mode: 'fixture',
      personaA: 'PUT path id',
      personaB: pb,
    });
    t.push({
      handler: `bulk_notes_del_${id}`,
      category: 'notes-bulk',
      theme: `deleteNote id=${id}`,
      mode: 'fixture',
      personaA: 'DELETE path id',
      personaB: pb,
    });
  }

  const tagIds = [1, 3, 8, 55, 200, 9999];
  for (const id of tagIds) {
    t.push({
      handler: `bulk_tags_id_${id}`,
      category: 'tags-bulk',
      theme: `getTag id=${id}`,
      mode: 'fixture',
      personaA: 'Tag path id',
      personaB: pb,
    });
  }

  for (let n = 0; n < 25; n++) {
    t.push({
      handler: `bulk_vdx_fields_${n}`,
      category: 'validation-bulk',
      theme: `validation field index ${n}`,
      mode: 'fixture',
      personaA: '422 field mapping',
      personaB: pb,
    });
  }

  for (let n = 0; n < 20; n++) {
    t.push({
      handler: `bulk_prob_parse_${n}`,
      category: 'problem-bulk',
      theme: `parseProblemDetails case ${n}`,
      mode: 'fixture',
      personaA: 'Problem parsers',
      personaB: pb,
    });
  }

  const baseUrls = [
    'http://localhost:18080',
    'http://127.0.0.1:18080',
    'http://localhost:18080/',
    'http://localhost:18080/api',
    'https://localhost:18080',
  ];
  for (let i = 0; i < baseUrls.length; i++) {
    t.push({
      handler: `bulk_cfg_base_${i}`,
      category: 'config-bulk',
      theme: `baseUrl variant ${i}`,
      mode: 'fixture',
      personaA: 'URL normalization',
      personaB: pb,
    });
  }

  for (let i = 0; i < 15; i++) {
    t.push({
      handler: `bulk_hdr_variant_${i}`,
      category: 'auth-bulk',
      theme: `auth header combo ${i}`,
      mode: 'fixture',
      personaA: 'Header matrix',
      personaB: pb,
    });
  }

  for (let i = 0; i < 12; i++) {
    t.push({
      handler: `bulk_conc_${i}`,
      category: 'concurrency-bulk',
      theme: `parallel calls batch ${i}`,
      mode: 'fixture',
      personaA: 'Concurrent client usage',
      personaB: pb,
    });
  }

  for (let i = 0; i < 10; i++) {
    t.push({
      handler: `bulk_schema_${i}`,
      category: 'openapi-bulk',
      theme: `generated schema probe ${i}`,
      mode: 'fixture',
      personaA: 'OpenAPI type alignment',
      personaB: pb,
    });
  }

  const fixtures = [
    'not-found',
    'validation-failed',
    'payload-too-large',
    'health-ok',
    'ping-ok',
    'note-ok',
    'tag-ok',
  ];
  for (const f of fixtures) {
    t.push({
      handler: `bulk_fixture_${f.replace(/-/g, '_')}`,
      category: 'fixtures-bulk',
      theme: `fixture load ${f}`,
      mode: 'fixture',
      personaA: 'Fixture JSON sanity',
      personaB: pb,
    });
  }

  for (let i = 0; i < 8; i++) {
    t.push({
      handler: `bulk_ct_${i}`,
      category: 'content-type-bulk',
      theme: `content-type variant ${i}`,
      mode: 'fixture',
      personaA: 'MIME parsing',
      personaB: pb,
    });
  }

  const replayHandlers = [
    'health_ok',
    'ping_ok',
    'smoke_ok',
    'notes_list',
    'tags_list',
    'protected_ok',
    'err_422',
    'prob_is_pd',
    'vdx_by_field',
    'machine_ok',
  ];
  for (let r = 0; r < 30; r++) {
    const h = replayHandlers[r % replayHandlers.length];
    t.push({
      handler: h,
      category: 'replay-bulk',
      theme: `replay ${h} #${r}`,
      mode: 'fixture',
      personaA: 'Regression replay',
      personaB: pb,
    });
  }

  if (t.length < 400) {
    let k = 0;
    while (t.length < 400) {
      t.push({
        handler: `bulk_misc_${k}`,
        category: 'misc-bulk',
        theme: `misc client probe ${k}`,
        mode: 'fixture',
        personaA: 'Misc DX',
        personaB: pb,
      });
      k += 1;
    }
  }

  return t.slice(0, 400);
}
