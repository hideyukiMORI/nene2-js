# FT107: 404 no extract

**Date**: 2026-05-22  
**NENE2 pin**: `contracts/nene2-openapi-pin.json` → `nene2-openapi-pin.json`  
**Package**: `@hideyukimori/nene2-client` @ `0.1.2`  
**Issues / PRs**: [#31](https://github.com/hideyukiMORI/nene2-js/issues/31) (marathon 100 (FT30–129))  
**Sandbox**: `tests/fixtures/` + `tests/field-trials/`

---

## Summary

404 no extract. Handler `vdx_404` (fixture, category `validation-dx`). Fixture / docs — `npm run test:ft-marathon` (no Docker required).

---

## What was exercised

| Item | Notes |
| ---- | ----- |
| Category | `validation-dx` |
| Handler | `vdx_404` |
| Mode | fixture |
| Commands | `npm run test:ft-marathon` · optional `npm run ft:marathon` |
| Client APIs | `createNene2Client`, Problem Details helpers (as per scenario) |
| OpenAPI | Pinned NENE2 contract — see pin file |
| Sandbox | `tests/fixtures/` + `tests/field-trials/` |

```text
cd nene2-js
npm run test:ft-marathon -- -t "FT107"
# optional live (nene2-js-FT / evac):
# export NENE2_JS_API_BASE_URL=http://localhost:18080
# ../nene2-js-FT/scripts/start-backends.sh nene2
```

---

## Application under test (nene2-js-FT)

| Item | Value |
| ---- | ----- |
| Sandbox (local) | `../nene2-js-FT/` — sibling directory, **not** a separate GitHub repo |
| App | `apps/notes-console` — Vite + React + `@hideyukimori/nene2-client` |
| AI policy | **Only** public docs: https://hideyukimori.github.io/nene2-js/ja/ (+ npm package types) |
| This FT | SDK/docs verification — app FT starts at FT230 in nene2-js-FT |

---

## Backend compatibility

| Backend | URL (example) | health | ping | notes CRUD | protected | Notes |
| ------- | ------------- | ------ | ---- | ---------- | --------- | ----- |
| NENE2 (PHP) | `http://localhost:8080` or evac `:18080` | n/a | n/a | n/a | n/a | Canonical |
| nene2-python | `http://localhost:8000` or `:18000` | n/a | n/a | n/a | n/a | Parity |
| nene2-node | `http://localhost:3000` | n/a | n/a | n/a | n/a | When available |

---

## Test results

| Suite | Tests | Result |
| ----- | ----- | ------ |
| `ft-marathon` FT107 | 1 | PASS (automated) |
| `npm run check` | full | run on PR |

```text
npm run test:ft-marathon -- -t "FT107"
```

---

## Outcomes

**Worked well:**

- Scenario `vdx_404` completed under Vitest.
- Persona A path: Not form error
- Persona B path: Persona B: low risk onboarding step.

**Still manual / missing:**

- Full UI journey in `nene2-js-FT` (separate app FTs).
- Production deploy and real auth secrets rotation.

---

## Friction points

**今回の FT では実装上の摩擦はゼロだった。** 自動シナリオは PASS。

---

## Developer Experience (DX) Review

### Persona 1 — 初心者 TypeScript 開発者（知識ゼロ・ドキュメントのみ）

[hideyukimori.github.io/nene2-js/ja/](https://hideyukimori.github.io/nene2-js/ja/) を唯一の教材として `npm install` から `smoke()` まで進める想定。

**ドキュメント理解**: README + 公開ドキュメントで足りる。  
**実装のしやすさ**: 型付き `createNene2Client` は IDE 補完が効く。サーバ起動手順は install howto 参照。  
**事故リスク**: 中 — `baseUrl` の取り違え（8080 vs 8000）。  
**Risk**: low

### Persona 2 — Python / nene2-python 経験者（PHP 未経験）

nene2-python を先に立て、同じ OpenAPI で JS クライアントを試す。

**ポート切替**: `:8000` → `:8080` の明示が必要。  
**パリティ**: Problem Details 形状は PHP と揃う想定。  
**摩擦**: live-smoke に `NENE2_JS_PYTHON_BASE_URL` が無いと気づきにくい（FT45 で追記）。  
**Risk**: low

### Persona 3 — フロントエンドエンジニア（React / Vite）

業務 UI で notes 一覧・作成フォーム・バリデーションエラー表示を実装する主体。

**エラーレスポンス**: `Nene2ClientError` + `validationErrorsByField` がフォームに直結。  
**バンドル**: ランタイム依存ゼロの npm パッケージ。  
**nene2-js-FT**: `apps/notes-console` で E2E 検証予定。  
**Risk**: low

### Persona 4 — セキュリティエンジニア

**秘密情報**: SDK は `.env` を読まない — アプリ側責務。  
**SSRF**: `baseUrl` をユーザー入力にしないこと。  
**ログ**: `problem.detail` のマスク。  
**health.service**: 別スタックでも 200 なら通る（[#46](https://github.com/hideyukiMORI/nene2-js/issues/46)）。  
**Risk**: low

### Persona 5 — DevOps / SRE

Docker evac: `compose-ft-evac.yaml` + `:18080`。degraded health は `allowDegraded`。

**観測**: CI は fixture のみ — live はオペレータ起動。  
**ヘルス**: `service: "NENE2"` を curl で事前確認。  
**Risk**: low

### Persona 6 — テックリード（レビュー・設計）

**OpenAPI 正**: 契約変更は NENE2 先行 → `contracts:sync`。  
**摩擦サイクル**: ADR 0004 — Issue/PR 完了まで次 FT 禁止。  
**nene2-js-FT**: 実アプリ FT で「AI が docs だけで完成」を測る。  
**Risk**: low

---

## Observations

### O1: 自動シナリオ `vdx_404`

カタログ `validation-dx` の回帰として Vitest で再現。追加の手動観察は nene2-js-FT アプリ FT で実施。

---

## nene2-js ドキュメント / パッケージとの整合

- 公開ドキュメント: https://hideyukimori.github.io/nene2-js/ja/
- npm: `@hideyukimori/nene2-client@0.1.2`
- リポジトリ内 ADR・CONTRIBUTING は AI 禁止（nene2-js-FT AGENTS.md）

---

## Follow-up Issues (resolution tracker)

| Repo | Issue | PR | Status |
| ---- | ----- | -- | ------ |
| hideyukiMORI/nene2-js | #31 | — | open / merged per batch |
| hideyukiMORI/nene2-js | #46 | — | open (health.service) |

**FT completion:** done

---

## Reminder

No secrets, API keys, or production URLs in this report.
