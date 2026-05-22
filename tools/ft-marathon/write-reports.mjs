#!/usr/bin/env node
/**
 * Generate FT reports (NENE2 / nene2-python granularity) + INDEX.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FT_CATALOG, FT_RANGE } from './catalog.mjs';
import { buildReportMarkdown, frictionBlockFor } from './build-report-markdown.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsDir = resolve(__dirname, '../../docs/field-trials');
const pin = JSON.parse(
  readFileSync(resolve(__dirname, '../../contracts/nene2-openapi-pin.json'), 'utf8'),
);
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf8'));

function issueForFt(ft) {
  if (ft >= 130) return 45;
  if (ft >= 30) return 31;
  return 30;
}

function batchForFt(ft) {
  if (ft >= 130) return 'docs onboarding 100 (FT130–229)';
  if (ft >= 30) return 'marathon 100 (FT30–129)';
  return 'legacy FT1–29';
}

for (const e of FT_CATALOG) {
  const issue = issueForFt(e.ft);
  const md = buildReportMarkdown(e, {
    issue,
    batch: batchForFt(e.ft),
    pinRef: 'contracts/nene2-openapi-pin.json',
    packageVer: pkg.version,
    frictionBlock: frictionBlockFor(e, issue),
    completion: 'done',
  });
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

const newRows = FT_CATALOG.map((e) => {
  const issue = issueForFt(e.ft);
  const friction = e.handler.includes('health_wrong_service') ? 'resolved #46' : `#${issue}`;
  return `| ${e.ft}  | [2026-05-field-trial-${e.ft}.md](2026-05-field-trial-${e.ft}.md) | ${e.theme.slice(0, 40)} | done | ${friction} |`;
});

writeFileSync(
  resolve(reportsDir, 'INDEX.md'),
  `${prefix}| FT  | Report | Theme | Status | Friction |
| --- | ------ | ----- | ------ | -------- |
${rows1to29.join('\n')}
${newRows.join('\n')}

${footer.replace(
  /Marathon:.*/,
  `Marathon: FT30–129 [#31](https://github.com/hideyukiMORI/nene2-js/issues/31), FT130–229 [#45](https://github.com/hideyukiMORI/nene2-js/issues/45). Reports follow [field-trial-report.md](../templates/field-trial-report.md) (NENE2 / nene2-python granularity). Run \`npm run test:ft-marathon\`.`,
)}`,
);

console.log(`Wrote ${FT_CATALOG.length} reports (FT${FT_RANGE.start}–${FT_RANGE.end}) and INDEX.`);
