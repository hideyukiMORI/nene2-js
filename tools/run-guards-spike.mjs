#!/usr/bin/env node
/**
 * @deprecated Use npm run codegen:guards
 */
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const result = spawnSync('node', ['tools/codegen-guards.mjs'], { cwd: root, stdio: 'inherit' });
process.exit(result.status ?? 1);
