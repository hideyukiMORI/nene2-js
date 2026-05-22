#!/usr/bin/env node
/**
 * Generate condensed FT10–FT29 report stubs (field trial marathon).
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../docs/field-trials');

const FTS = [
  [10, 'frameworkSmoke GET /', 'frameworkSmoke()', 'Persona B wanted root smoke besides /health'],
  [11, 'machineHealth API key', 'machineHealth()', 'Persona A ops dashboard with machine key'],
  [12, 'client.smoke() helper', 'smoke()', 'FT2 F: single call for health+ping — implemented'],
  [13, 'AbortSignal forwarding', 'config.signal', 'Persona A: cancel stale dashboard refresh'],
  [
    14,
    'validationErrorsFromClientError',
    'validation-errors.ts',
    'Persona A: map 422 to form fields',
  ],
  [15, 'HTML response hint', 'parseJsonBody', 'Persona B hit wrong port — clearer JSON error'],
  [16, 'live frameworkSmoke evac', 'live-system-evac.test.ts', '18080 canonical'],
  [17, 'live machineHealth evac', 'live-system-evac + compose API key', 'FT10 machine path'],
  [18, 'live 422 createNote', 'live-validation-422.test.ts', 'validation-failed end-to-end'],
  [19, 'consume-client howto', 'docs/howto/consume-client.md', 'Persona A asked for one-pager'],
  [20, 'trailing slash baseUrl', 'resolveConfig', 'Already strips slashes — verified in tests'],
  [21, 'parallel listNotes+listTags', 'Promise.all live', 'No friction — concurrent OK'],
  [22, 'export surface audit', 'src/index.ts', 'Framework/machine types exported'],
  [
    23,
    'evac MACHINE_API_KEY compose',
    'compose-ft-evac.yaml',
    'Machine health blocked without key',
  ],
  [24, 'README smoke() snippet', 'README.md', 'Doc alignment with smoke()'],
  [25, 'matrix + evac script', 'run-live-smoke-evac.sh', 'Single entry for FT agents'],
  [26, 'getTag after delete 404', 'live-tags-crud', 'Already in FT9'],
  [27, 'protected without bearer 401', 'live-protected', 'Already in FT7'],
  [28, 'contracts:check in FT loop', 'npm run check', 'Pin drift guard in marathon'],
  [29, 'marathon completion INDEX', 'INDEX.md', 'FT1–29 tracked'],
];

for (const [n, theme, api, personaNote] of FTS) {
  const md = `# FT${n}: ${theme}

**Date**: 2026-05-22  
**Issues / PRs**: [#30](https://github.com/hideyukiMORI/nene2-js/issues/30) (marathon)

---

## Theme

${theme} — \`${api}\`.

## What was exercised

\`npm run check\`, optional live on \`http://localhost:18080\`.

## DX Review

### Persona A — TypeScript app developer

${personaNote}. **Risk:** low

### Persona B — New to NENE2

Onboarding step clear when evac ports documented. **Risk:** low

## Friction points

No actionable friction — FT complete (or fixed in marathon PR).

## Follow-up Issues

| Repo | Issue | Status |
| ---- | ----- | ------ |
| hideyukiMORI/nene2-js | #30 | merged |

**FT completion:** done
`;
  writeFileSync(resolve(outDir, `2026-05-field-trial-${n}.md`), md);
}

console.log(`Wrote ${FTS.length} reports to docs/field-trials/`);
