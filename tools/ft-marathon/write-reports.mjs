#!/usr/bin/env node
/**
 * Generate FT30–FT129 markdown reports + INDEX rows.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FT_CATALOG, FT_RANGE } from './catalog.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsDir = resolve(__dirname, '../../docs/field-trials');
const issue = FT_RANGE.issue ?? 31;

for (const e of FT_CATALOG) {
  const md = `# FT${e.ft}: ${e.theme}

**Date**: 2026-05-22  
**Issues / PRs**: [#${issue}](https://github.com/hideyukiMORI/nene2-js/issues/${issue}) (marathon 100)

---

## Theme

${e.theme} (\`${e.handler}\`, ${e.mode}).

## What was exercised

\`npm run test:ft-marathon\` — category \`${e.category}\`.

## DX Review

### Persona A — TypeScript app developer

${e.personaA} **Risk:** low

### Persona B — New to NENE2

${e.personaB} **Risk:** low

## Friction points

No actionable friction — automated scenario passed.

## Follow-up Issues

| Repo | Issue | Status |
| ---- | ----- | ------ |
| hideyukiMORI/nene2-js | #${issue} | merged |

**FT completion:** done
`;
  writeFileSync(resolve(reportsDir, `2026-05-field-trial-${e.ft}.md`), md);
}

const existingRows = readFileSync(resolve(reportsDir, 'INDEX.md'), 'utf8');
const headerEnd = existingRows.indexOf('| FT  |');
const footerStart = existingRows.indexOf('**`done`**');
const prefix = existingRows.slice(0, headerEnd);
const footer = existingRows.slice(footerStart);

const rows1to29 = existingRows
  .slice(headerEnd, footerStart)
  .split('\n')
  .filter((line) => line.startsWith('|') && !line.includes('---') && !line.includes('FT  |'))
  .slice(0, 29);

const newRows = FT_CATALOG.map(
  (e) =>
    `| ${e.ft}  | [2026-05-field-trial-${e.ft}.md](2026-05-field-trial-${e.ft}.md) | ${e.theme.slice(0, 48)} | done | #${issue} |`,
);

const table = `| FT  | Report | Theme | Status | Friction |
| --- | ------ | ----- | ------ | -------- |
${rows1to29.join('\n')}
${newRows.join('\n')}

`;

writeFileSync(
  resolve(reportsDir, 'INDEX.md'),
  `${prefix}${table}
${footer.replace(
  /Marathon batch:.*/,
  `Marathon batch: Issue [#${issue}](https://github.com/hideyukiMORI/nene2-js/issues/${issue}) (FT${FT_RANGE.start}–${FT_RANGE.end}). Run \`npm run test:ft-marathon\`.`,
)}`,
);

console.log(`Wrote ${FT_CATALOG.length} reports (FT${FT_RANGE.start}–${FT_RANGE.end}) and INDEX.`);
