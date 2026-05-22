#!/usr/bin/env node
/**
 * Fail if src/generated/openapi.ts drifts from contracts/openapi.yaml.
 */
import { execSync } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const committed = resolve(root, 'src/generated/openapi.ts');
const staging = mkdtempSync(join(tmpdir(), 'nene2-codegen-'));
const fresh = join(staging, 'openapi.ts');

try {
  execSync(`npx openapi-typescript "${resolve(root, 'contracts/openapi.yaml')}" -o "${fresh}"`, {
    cwd: root,
    stdio: 'pipe',
  });
  const expected = readFileSync(fresh, 'utf8');
  const actual = readFileSync(committed, 'utf8');
  if (expected !== actual) {
    console.error('codegen:check failed — src/generated/openapi.ts is out of date.');
    console.error('Run: npm run codegen');
    process.exit(1);
  }
  console.log('codegen:check ok');
} finally {
  rmSync(staging, { recursive: true, force: true });
}
