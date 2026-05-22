# FT[番号]: [テーマ]

**Date**: YYYY-MM-DD  
**NENE2 pin**: `contracts/nene2-openapi-pin.json` → `nene2GitRef`  
**Package**: `@hideyukimori/nene2-client` @ `0.x.x`  
**Issues / PRs**: #NNN  
**Sandbox**: `../nene2-js-FT/apps/…` または `tests/fixtures/`

---

## Summary

[1–2 段落: 何を検証したか。知識ゼロ AI / 人間ペルソナ / どのバックエンドか。]

---

## What was exercised

| Item               | Notes                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| Commands           | `npm run check`, `npm run test:ft-marathon`, live smoke, nene2-js-FT app |
| Client APIs        | `createNene2Client`, Problem Details helpers                             |
| OpenAPI operations | 例: `getHealth`, `listExampleNotes`                                      |
| Sandbox            | `../nene2-js-FT/` / Docker evac / fixtures                               |

```text
(paste exact commands; no secrets)
```

---

## Application under test (nene2-js-FT)

| Item                | Value                                            |
| ------------------- | ------------------------------------------------ |
| App path            | `../nene2-js-FT/apps/<app-name>/`                |
| Stack               | Vite + React + TypeScript (typical)              |
| Allowed docs for AI | https://hideyukimori.github.io/nene2-js/ja/ only |
| Backends            | NENE2 Docker and/or nene2-python per scenario    |

### 実装した機能（アプリ FT の場合）

| 画面 / API | 概要 |
| ---------- | ---- |
|            |      |

---

## Backend compatibility

| Backend      | URL | health  | ping    | notes   | protected | Notes     |
| ------------ | --- | ------- | ------- | ------- | --------- | --------- |
| NENE2 (PHP)  |     | ok/fail | ok/fail | ok/fail | ok/fail   | canonical |
| nene2-python |     | ok/fail | ok/fail | ok/fail | ok/fail   | parity    |

---

## Test results

| Suite                        | Tests | Result |
| ---------------------------- | ----- | ------ |
| Vitest (nene2-js)            |       |        |
| App test / E2E (nene2-js-FT) |       |        |

```text
(paste output)
```

---

## Outcomes

**Worked well:**

- **Still manual / missing:**

- ***

## Friction points

<!-- 摩擦ゼロ: **今回の FT では実装上の摩擦はゼロだった。** -->

### F-1: [Title] (severity: high / medium / low)

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| **Owner**  | `nene2-js` / `NENE2` / `nene2-python` / `nene2-js-FT` / `docs` |
| **Issue**  | https://github.com/…/issues/NNN                                |
| **PR**     | https://github.com/…/pull/NNN                                  |
| **Status** | open / merged / deferred                                       |

**What happened:**  
**Why:**  
**Resolution:**

---

## Developer Experience (DX) Review

### Persona 1 — 初心者 TypeScript（知識ゼロ・ja ドキュメントのみ）

**ドキュメント理解**:  
**実装のしやすさ**:  
**事故リスク**: 高 / 中 / 低  
**Risk**: high / medium / low

### Persona 2 — Python / nene2-python 経験者

**ポート・スタック切替**:  
**パリティ体感**:  
**Risk**: high / medium / low

### Persona 3 — フロントエンド（React / 業務 UI）

**エラーレスポンス → UI**:  
**開発体験**:  
**Risk**: high / medium / low

### Persona 4 — セキュリティ

**秘密・SSRF・ログ**:  
**Risk**: high / medium / low

### Persona 5 — DevOps / SRE

**Docker・ヘルス・ポート**:  
**Risk**: high / medium / low

### Persona 6 — テックリード

**レビュー観点・OpenAPI 境界**:  
**Risk**: high / medium / low

---

## Observations

### O1: [タイトル]

```ts
// コード例
```

[解説]

---

## Follow-up Issues (resolution tracker)

| Repo                      | Issue | PR  | Status |
| ------------------------- | ----- | --- | ------ |
| hideyukiMORI/nene2-js     |       |     |        |
| nene2-js-FT (local `../nene2-js-FT/`) | — | — | local sandbox only |
| hideyukiMORI/NENE2        |       |     |        |
| hideyukiMORI/nene2-python |       |     |        |

**FT completion:** open / blocked / done

---

## Reminder

No secrets, API keys, or production URLs in this report.
