#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGuardModuleSource } from './codegen-guards-spike.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const openapiPath = resolve(root, 'contracts/openapi.yaml');
const staging = mkdtempSync(resolve(tmpdir(), 'nene2-guards-spike-'));

try {
  const { moduleSource, schemaNames } = await generateGuardModuleSource(openapiPath);
  const outPath = resolve(staging, 'guards.generated.mjs');
  writeFileSync(outPath, moduleSource, 'utf8');
  console.log(`guards spike: ok (${schemaNames.length} schemas) → ${outPath}`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
