#!/usr/bin/env node
/**
 * Generate TypeScript types from contracts/openapi.yaml (ADR 0006).
 */
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = resolve(root, 'contracts/openapi.yaml');
const output = resolve(root, 'src/generated/openapi.ts');

execSync(`npx openapi-typescript "${input}" -o "${output}"`, {
  cwd: root,
  stdio: 'inherit',
});
