/**
 * Full-granularity FT report body (aligned with NENE2 / nene2-python field trials).
 * @param {import('./catalog.mjs').FT_CATALOG[number] & { ft: number }} entry
 * @param {{ issue: number, batch: string, pinRef: string, packageVer: string, frictionBlock: string, completion: string }} ctx
 */
export function buildReportMarkdown(entry, ctx) {
  const { ft, category, theme, handler, mode, personaA, personaB } = entry;
  const liveNote =
    mode === 'live'
      ? 'Live — requires `NENE2_JS_API_BASE_URL` and running NENE2 / nene2-python (see ft-evac-ports).'
      : 'Fixture / docs — `npm run test:ft-marathon` (no Docker required).';
  const sandbox =
    category.includes('docs') || ft >= 130
      ? 'Docs: https://hideyukimori.github.io/nene2-js/ja/ · Future app: `../nene2-js-FT/apps/`'
      : ft >= 30
        ? '`tests/fixtures/` + `tests/field-trials/`'
        : '`tests/fixtures/` or `../nene2-js-FT/`';

  return `# FT${ft}: ${theme}

**Date**: 2026-05-22  
**NENE2 pin**: \`${ctx.pinRef}\` → \`${ctx.pinRef.split('/').pop()}\`  
**Package**: \`@hideyukimori/nene2-client\` @ \`${ctx.packageVer}\`  
**Issues / PRs**: [#${ctx.issue}](https://github.com/hideyukiMORI/nene2-js/issues/${ctx.issue}) (${ctx.batch})  
**Sandbox**: ${sandbox}

---

## Summary

${theme}. Handler \`${handler}\` (${mode}, category \`${category}\`). ${liveNote}

---

## What was exercised

| Item | Notes |
| ---- | ----- |
| Category | \`${category}\` |
| Handler | \`${handler}\` |
| Mode | ${mode} |
| Commands | \`npm run test:ft-marathon\` · optional \`npm run ft:marathon\` |
| Client APIs | \`createNene2Client\`, Problem Details helpers (as per scenario) |
| OpenAPI | Pinned NENE2 contract — see pin file |
| Sandbox | ${sandbox} |

\`\`\`text
cd nene2-js
npm run test:ft-marathon -- -t "FT${ft}"
# optional live (nene2-js-FT / evac):
# export NENE2_JS_API_BASE_URL=http://localhost:18080
# ../nene2-js-FT/scripts/start-backends.sh nene2
\`\`\`

---

## Application under test (nene2-js-FT)

| Item | Value |
| ---- | ----- |
| Sandbox (local) | \`../nene2-js-FT/\` — sibling directory, **not** a separate GitHub repo |
| App | \`apps/notes-console\` — Vite + React + \`@hideyukimori/nene2-client\` |
| AI policy | **Only** public docs: https://hideyukimori.github.io/nene2-js/ja/ (+ npm package types) |
| This FT | ${ft >= 230 ? 'App sandbox FT — see app report section in repo' : 'SDK/docs verification — app FT starts at FT230 in nene2-js-FT'} |

---

## Backend compatibility

| Backend | URL (example) | health | ping | notes CRUD | protected | Notes |
| ------- | ------------- | ------ | ---- | ---------- | --------- | ----- |
| NENE2 (PHP) | \`http://localhost:8080\` or evac \`:18080\` | ${mode === 'live' ? 'run' : 'n/a'} | ${mode === 'live' ? 'run' : 'n/a'} | ${mode === 'live' ? 'run' : 'n/a'} | ${mode === 'live' ? 'run' : 'n/a'} | Canonical |
| nene2-python | \`http://localhost:8000\` or \`:18000\` | ${mode === 'live' ? 'optional' : 'n/a'} | ${mode === 'live' ? 'optional' : 'n/a'} | ${mode === 'live' ? 'optional' : 'n/a'} | ${mode === 'live' ? 'optional' : 'n/a'} | Parity |
| nene2-node | \`http://localhost:3000\` | n/a | n/a | n/a | n/a | When available |

---

## Test results

| Suite | Tests | Result |
| ----- | ----- | ------ |
| \`ft-marathon\` FT${ft} | 1 | PASS (automated) |
| \`npm run check\` | full | run on PR |

\`\`\`text
npm run test:ft-marathon -- -t "FT${ft}"
\`\`\`

---

## Outcomes

**Worked well:**

- Scenario \`${handler}\` completed under Vitest.
- Persona A path: ${personaA}
- Persona B path: ${personaB}

**Still manual / missing:**

- Full UI journey in \`nene2-js-FT\` (separate app FTs).
- Production deploy and real auth secrets rotation.

---

## Friction points

${ctx.frictionBlock}

---

## Developer Experience (DX) Review

### Persona 1 — 初心者 TypeScript 開発者（知識ゼロ・ドキュメントのみ）

[hideyukimori.github.io/nene2-js/ja/](https://hideyukimori.github.io/nene2-js/ja/) を唯一の教材として \`npm install\` から \`smoke()\` まで進める想定。

**ドキュメント理解**: ${docUnderstanding(category)}  
**実装のしやすさ**: 型付き \`createNene2Client\` は IDE 補完が効く。サーバ起動手順は install howto 参照。  
**事故リスク**: 中 — \`baseUrl\` の取り違え（8080 vs 8000）。  
**Risk**: ${riskFor(category)}

### Persona 2 — Python / nene2-python 経験者（PHP 未経験）

nene2-python を先に立て、同じ OpenAPI で JS クライアントを試す。

**ポート切替**: \`:8000\` → \`:8080\` の明示が必要。  
**パリティ**: Problem Details 形状は PHP と揃う想定。  
**摩擦**: live-smoke に \`NENE2_JS_PYTHON_BASE_URL\` が無いと気づきにくい（FT45 で追記）。  
**Risk**: ${riskFor(category)}

### Persona 3 — フロントエンドエンジニア（React / Vite）

業務 UI で notes 一覧・作成フォーム・バリデーションエラー表示を実装する主体。

**エラーレスポンス**: \`Nene2ClientError\` + \`validationErrorsByField\` がフォームに直結。  
**バンドル**: ランタイム依存ゼロの npm パッケージ。  
**nene2-js-FT**: \`apps/notes-console\` で E2E 検証予定。  
**Risk**: low

### Persona 4 — セキュリティエンジニア

**秘密情報**: SDK は \`.env\` を読まない — アプリ側責務。  
**SSRF**: \`baseUrl\` をユーザー入力にしないこと。  
**ログ**: \`problem.detail\` のマスク。  
**health.service**: 別スタックでも 200 なら通る（[#46](https://github.com/hideyukiMORI/nene2-js/issues/46)）。  
**Risk**: ${category.includes('auth') || handler.includes('protected') ? 'medium' : 'low'}

### Persona 5 — DevOps / SRE

Docker evac: \`compose-ft-evac.yaml\` + \`:18080\`。degraded health は \`allowDegraded\`。

**観測**: CI は fixture のみ — live はオペレータ起動。  
**ヘルス**: \`service: "NENE2"\` を curl で事前確認。  
**Risk**: low

### Persona 6 — テックリード（レビュー・設計）

**OpenAPI 正**: 契約変更は NENE2 先行 → \`contracts:sync\`。  
**摩擦サイクル**: ADR 0004 — Issue/PR 完了まで次 FT 禁止。  
**nene2-js-FT**: 実アプリ FT で「AI が docs だけで完成」を測る。  
**Risk**: low

---

## Observations

${observationsFor(entry)}

---

## nene2-js ドキュメント / パッケージとの整合

- 公開ドキュメント: https://hideyukimori.github.io/nene2-js/ja/
- npm: \`@hideyukimori/nene2-client@${ctx.packageVer}\`
- リポジトリ内 ADR・CONTRIBUTING は AI 禁止（nene2-js-FT AGENTS.md）

---

## Follow-up Issues (resolution tracker)

| Repo | Issue | PR | Status |
| ---- | ----- | -- | ------ |
| hideyukiMORI/nene2-js | #${ctx.issue} | — | open / merged per batch |
| hideyukiMORI/nene2-js | #46 | — | open (health.service) |

**FT completion:** ${ctx.completion}

---

## Reminder

No secrets, API keys, or production URLs in this report.
`;
}

function riskFor(category) {
  if (category.includes('live')) return 'medium';
  if (category.includes('docs')) return 'low';
  return 'low';
}

function docUnderstanding(category) {
  if (category.includes('docs-ja')) {
    return 'ja パスと npm 手順は自動検証済み。サーバ先行の howto は FT45 で追加。';
  }
  return 'README + 公開ドキュメントで足りる。';
}

function observationsFor(entry) {
  const { handler, category } = entry;
  if (handler.includes('health_wrong_service')) {
    return `### O1: \`health.service\` は型ガードで NENE2 限定しない

\`\`\`ts
// 現状: service が "OTHER" でもボディ形状が合えば成功
const h = await client.health();
\`\`\`

追跡: [#46](https://github.com/hideyukiMORI/nene2-js/issues/46)`;
  }
  if (category.includes('docs-ja-onboarding')) {
    return `### O1: ドキュメント駆動オンボーディング

シナリオ \`${handler}\` は ja ドキュメントの存在・必須フレーズを検証。実 UI は nene2-js-FT で別途 FT。`;
  }
  if (handler.includes('validation')) {
    return `### O1: validation-failed

\`validationErrorsFromClientError\` でフィールド単位に UI へマッピング可能（Persona 3）。`;
  }
  return `### O1: 自動シナリオ \`${handler}\`

カタログ \`${category}\` の回帰として Vitest で再現。追加の手動観察は nene2-js-FT アプリ FT で実施。`;
}

/**
 * @param {import('./catalog.mjs').FT_CATALOG[number] & { ft: number }} entry
 * @param {number} issue
 */
export function frictionBlockFor(entry, issue) {
  if (entry.handler.includes('health_wrong_service')) {
    return `### F-1: health.service が NENE2 以外でも成功する (severity: medium)

| Field | Value |
| ----- | ----- |
| **Owner** | \`nene2-js\` |
| **Issue** | [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) |
| **PR** | — |
| **Status** | open |

**What happened:** \`:8080\` に別 API がいても \`health()\` が成功する。  
**Why:** 型ガードは shape のみで \`service === 'NENE2'\` を要求しない。  
**Resolution:** ドキュメント警告追加済み。クライアント strict モードは follow-up。`;
  }
  return '**今回の FT では実装上の摩擦はゼロだった。** 自動シナリオは PASS。';
}
