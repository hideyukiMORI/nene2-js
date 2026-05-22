#!/usr/bin/env node
/**
 * Phase A spike (#86): generate Ajv standalone validators from OpenAPI schemas.
 * Output is for spike/tests only — not committed to src/generated/ until Phase B.
 */
import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone/index.js';

/** Client-used component schemas → public guard names (Phase B/C). */
export const GUARD_SCHEMA_MAP = {
  HealthResponse: 'isHealthResponse',
  ExamplePingResponse: 'isExamplePingResponse',
  FrameworkSmokeResponse: 'isFrameworkSmokeResponse',
  MachineHealthResponse: 'isMachineHealthResponse',
  ExampleNoteResponse: 'isExampleNoteResponse',
  ExampleNoteListResponse: 'isExampleNoteListResponse',
  CreateNoteRequest: 'isCreateNoteRequest',
  ExampleTagResponse: 'isExampleTagResponse',
  ExampleTagListResponse: 'isExampleTagListResponse',
  CreateTagRequest: 'isCreateTagRequest',
  ProtectedResponse: 'isProtectedResponse',
};

/**
 * @param {string} openapiPath absolute path to contracts/openapi.yaml
 * @returns {Promise<{ moduleSource: string; schemaNames: string[] }>}
 */
export async function generateGuardModuleSource(openapiPath) {
  const api = await SwaggerParser.dereference(openapiPath);
  const schemas = api.components?.schemas;
  if (schemas === undefined) {
    throw new Error('No components.schemas in OpenAPI document');
  }

  const schemaNames = Object.keys(GUARD_SCHEMA_MAP);
  const validatorBlocks = [];

  for (const schemaName of schemaNames) {
    const raw = schemas[schemaName];
    if (raw === undefined) {
      throw new Error(`Missing schema: ${schemaName}`);
    }
    const ajv = new Ajv({
      code: { source: true, esm: true, lines: true },
      strict: false,
      allErrors: false,
    });
    const validate = ajv.compile(stripFormats(structuredClone(raw)));
    const block = postProcessStandaloneBlock(standaloneCode(ajv, validate), schemaName);
    validatorBlocks.push(block);
  }

  const sharedRuntime = `function ucs2length(str) {
  return [...str].length;
}
`;

  const wrappers = Object.entries(GUARD_SCHEMA_MAP)
    .map(
      ([schemaName, guardName]) =>
        `export function ${guardName}Generated(value) {
  return validate${schemaName}(value);
}`,
    )
    .join('\n\n');

  const moduleSource = `/** @generated spike — ADR 0007 */
/* eslint-disable */
${sharedRuntime}
${validatorBlocks.join('\n\n')}

${wrappers}
`;

  return { moduleSource, schemaNames };
}

/** Rename internal validateN, drop duplicate default exports, ESM-fix minLength runtime. */
function postProcessStandaloneBlock(block, schemaName) {
  const fnName = `validate${schemaName}`;
  const schemaConst = `schema_${schemaName}`;
  block = block.replace(/\bschema\d+\b/g, schemaConst);
  const match = block.match(/function (validate\d+)/);
  const internal = match?.[1] ?? 'validate';
  let out = block.replace(new RegExp(`\\b${internal}\\b`, 'g'), fnName);
  out = out.replace(/^export default .*;\n?/gm, '');
  out = out.replace(/^export const validate = .*;\n?/gm, '');
  out = out.replace(/^export const validate\w+ = .*;\n?/gm, '');
  out = out.replace(/^"use strict";\n?/gm, '');
  out = out.replace(/const func2 = require\("ajv\/dist\/runtime\/ucs2length"\)\.default;/g, '');
  out = out.replace(/\bfunc2\b/g, 'ucs2length');
  return out.trim();
}

/** OpenAPI format keywords break ESM standalone (require ajv-formats). Hand guards use integer only. */
function stripFormats(schema) {
  if (Array.isArray(schema)) {
    return schema.map(stripFormats);
  }
  if (schema !== null && typeof schema === 'object') {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const [key, value] of Object.entries(schema)) {
      if (key === 'format') {
        continue;
      }
      out[key] = stripFormats(value);
    }
    return out;
  }
  return schema;
}
