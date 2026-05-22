#!/usr/bin/env node
/**
 * Generate src/generated/guards.ts from contracts/openapi.yaml (ADR 0007).
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGuardModuleSource } from './codegen-guards-lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const openapiPath = resolve(root, 'contracts/openapi.yaml');
const outputPath = resolve(root, 'src/generated/guards.ts');

const { moduleSource, schemaNames } = await generateGuardModuleSource(openapiPath);
writeFileSync(outputPath, moduleSource, 'utf8');
console.log(`codegen:guards ok (${schemaNames.length} validators → ${outputPath})`);
