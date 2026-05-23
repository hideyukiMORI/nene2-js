#!/usr/bin/env node
/**
 * Print the CHANGELOG body for a semver (Keep a Changelog section).
 * Usage: node scripts/extract-changelog-release.mjs 1.0.0
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const version = process.argv[2];
if (!version) {
  console.error('Usage: node scripts/extract-changelog-release.mjs <version>');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const md = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const escaped = version.replace(/\./g, '\\.');
const header = new RegExp(`^## \\[${escaped}\\][^\\n]*\\n`, 'm');
const match = md.match(header);
if (!match) {
  console.error(`CHANGELOG: no section for ${version}`);
  process.exit(1);
}

const start = match.index + match[0].length;
const tail = md.slice(start);
const next = tail.search(/^## \[/m);
const section = (next === -1 ? tail : tail.slice(0, next)).trim();
process.stdout.write(`${section}\n`);
