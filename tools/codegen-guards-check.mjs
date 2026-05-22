#!/usr/bin/env node
/**
 * Fail if src/generated/guards.ts drifts from contracts/openapi.yaml.
 */
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGuardModuleSource } from './codegen-guards-lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const committed = resolve(root, 'src/generated/guards.ts');
const openapiPath = resolve(root, 'contracts/openapi.yaml');
const staging = mkdtempSync(join(tmpdir(), 'nene2-guards-codegen-'));

try {
  const { moduleSource } = await generateGuardModuleSource(openapiPath);
  const fresh = join(staging, 'guards.ts');
  writeFileSync(fresh, moduleSource, 'utf8');
  const expected = readFileSync(fresh, 'utf8');
  const actual = readFileSync(committed, 'utf8');
  if (expected !== actual) {
    console.error('codegen:guards:check failed — src/generated/guards.ts is out of date.');
    console.error('Run: npm run codegen:guards');
    process.exit(1);
  }
  console.log('codegen:guards:check ok');
} finally {
  rmSync(staging, { recursive: true, force: true });
}
