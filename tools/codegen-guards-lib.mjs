/**
 * OpenAPI component schema → internal validator export name (ADR 0007).
 * Public `is*` guards live in src/types/* as thin wrappers.
 */
export const GUARD_SCHEMA_MAP = {
  HealthResponse: 'validateHealthResponse',
  ExamplePingResponse: 'validateExamplePingResponse',
  FrameworkSmokeResponse: 'validateFrameworkSmokeResponse',
  MachineHealthResponse: 'validateMachineHealthResponse',
  ExampleNoteResponse: 'validateExampleNoteResponse',
  ExampleNoteListResponse: 'validateExampleNoteListResponse',
  CreateNoteRequest: 'validateCreateNoteRequest',
  ExampleTagResponse: 'validateExampleTagResponse',
  ExampleTagListResponse: 'validateExampleTagListResponse',
  CreateTagRequest: 'validateCreateTagRequest',
  ProtectedResponse: 'validateProtectedResponse',
};

/**
 * @param {string} openapiPath absolute path to contracts/openapi.yaml
 * @returns {Promise<{ moduleSource: string; schemaNames: string[] }>}
 */
export async function generateGuardModuleSource(openapiPath) {
  const SwaggerParser = (await import('@apidevtools/swagger-parser')).default;
  const Ajv = (await import('ajv')).default;
  const standaloneCode = (await import('ajv/dist/standalone/index.js')).default;

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
    const exportName = GUARD_SCHEMA_MAP[schemaName];
    const block = postProcessStandaloneBlock(standaloneCode(ajv, validate), exportName, schemaName);
    validatorBlocks.push(block);
  }

  const moduleSource = `/**
 * @generated from contracts/openapi.yaml — do not edit.
 * Regenerate: npm run codegen:guards
 * @see docs/adr/0007-openapi-guard-codegen-ajv-standalone.md
 */
/* eslint-disable */
// @ts-nocheck

function ucs2length(str: string): number {
  return [...str].length;
}

${validatorBlocks.join('\n\n')}
`;

  return { moduleSource, schemaNames };
}

/** Rename internal validateN, export, ESM-fix minLength runtime. */
function postProcessStandaloneBlock(block, exportName, schemaName) {
  const schemaConst = `schema_${schemaName}`;
  block = block.replace(/\bschema\d+\b/g, schemaConst);
  const match = block.match(/function (validate\d+)/);
  const internal = match?.[1] ?? 'validate';
  let out = block.replace(new RegExp(`\\b${internal}\\b`, 'g'), exportName);
  out = out.replace(/^export default .*;\n?/gm, '');
  out = out.replace(/^export const validate = .*;\n?/gm, '');
  out = out.replace(/^export const validate\w+ = .*;\n?/gm, '');
  out = out.replace(/^"use strict";\n?/gm, '');
  out = out.replace(/const func2 = require\("ajv\/dist\/runtime\/ucs2length"\)\.default;/g, '');
  out = out.replace(/\bfunc2\b/g, 'ucs2length');
  if (!out.startsWith('export ')) {
    out = out.replace(`function ${exportName}`, `export function ${exportName}`);
  }
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
