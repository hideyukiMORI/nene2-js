# Field trial friction registry (2026-05)

Living index of **actionable friction** found in nene2-js marathon (FT30–529), library FTs, and **nene2-js-FT** consumer apps. Update when a new F-n closes.

Policy loop: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md) · Methodology: [field-trials.md](field-trials.md)

## Mandatory rule (no exceptions)

1. **Friction が出たら必ず GitHub Issue を先に起票**（正しい Owner リポ）。
2. **PR で修正・マージ**（または同一 PR で `Closes #NN`）。
3. **再検証**（matrix / `verify:backends` / nene2-js-FT smoke）。
4. **レポートと本 registry を更新**してから **次の FT** へ。

オープンな摩擦 Issue が残っている状態で次 FT に進まない。

## Routing (where to fix)

| Symptom                        | Open Issue / PR in                        |
| ------------------------------ | ----------------------------------------- |
| Client API, docs, FT templates | **nene2-js**                              |
| nene2-python OpenAPI drift     | **nene2-python**                          |
| NENE2 PHP vs contract          | **NENE2** → then `npm run contracts:sync` |
| Consumer app only (local)      | **nene2-js** (no separate FT repo)        |

## Resolved friction

| ID                 | Severity | Phenomenon                                    | Owner        | Resolution                                       | Links                                                                                                                          |
| ------------------ | -------- | --------------------------------------------- | ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Marathon / **#46** | medium   | Wrong process on port still passes `health()` | nene2-js     | `health({ strictService: true })`; npm **0.1.2** | [#46](https://github.com/hideyukiMORI/nene2-js/issues/46), [#48](https://github.com/hideyukiMORI/nene2-js/pull/48)             |
| **F-2-1 / #578**   | high     | `/notes` vs `/examples/notes` on python       | nene2-python | Mount under `/examples` + ping                   | [#578](https://github.com/hideyukiMORI/nene2-python/issues/578), [#579](https://github.com/hideyukiMORI/nene2-python/pull/579) |
| **F-5-1 / #582**   | medium   | `GET /` 404 on python (`frameworkSmoke`)      | nene2-python | Framework smoke route                            | [#582](https://github.com/hideyukiMORI/nene2-python/issues/582), [#583](https://github.com/hideyukiMORI/nene2-python/pull/583) |
| **F-5-2**          | low      | `/machine/health` 404; wrong API key header   | nene2-python | Route + `X-NENE2-API-Key` + evac default key     | Same as #583                                                                                                                   |
| **FT6 gap / #586** | medium   | No `/examples/protected` on python            | nene2-python | `LocalBearerJwtVerifier` + Bearer route          | [#586](https://github.com/hideyukiMORI/nene2-python/issues/586), [#587](https://github.com/hideyukiMORI/nene2-python/pull/587) |

## Documentation / DX (no separate runtime bug)

| Theme            | Phenomenon                                            | Mitigation                                                         | Links                                                                                                              |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Multi-backend    | `NENE2_JS_PYTHON_BASE_URL` easy to miss in live smoke | ja howto + marathon observations                                   | [#45](https://github.com/hideyukiMORI/nene2-js/issues/45), [#47](https://github.com/hideyukiMORI/nene2-js/pull/47) |
| Locales          | Missing `strictService` / python install howto        | de/fr/zh/pt-br pages                                               | [#59](https://github.com/hideyukiMORI/nene2-js/issues/59), [#60](https://github.com/hideyukiMORI/nene2-js/pull/60) |
| Consumer sandbox | App FT location unclear                               | [consumer-sandbox-nene2-js-ft.md](consumer-sandbox-nene2-js-ft.md) | [#62](https://github.com/hideyukiMORI/nene2-js/issues/62), [#63](https://github.com/hideyukiMORI/nene2-js/pull/63) |
| Evac ports       | :8080 / :8000 conflicts                               | [ft-evac-ports.md](ft-evac-ports.md), `:18080` / `:18000`          | compose-ft-evac                                                                                                    |

## Verification after a fix

```bash
npm run verify:backends
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_JS_PYTHON_BASE_URL=http://localhost:18000
npm test -- tests/client/live-smoke-matrix.test.ts
npm test -- tests/client/live-protected.test.ts
# optional: ../nene2-js-FT/apps/*/scripts/live-smoke.mjs
```

## nene2-js-FT app trials

| FT  | App             | Friction       | Status |
| --- | --------------- | -------------- | ------ |
| 1–3 | notes-console   | F-2-1 (#578)   | done   |
| 4   | tags-studio     | —              | done   |
| 5   | health-board    | F-5-1/2 (#582) | done   |
| 6–7 | protected-smoke | #586 (python)  | done   |

Reports: `../nene2-js-FT/docs/field-trials/` (local only).

## Open / deferred

| Item                       | Notes                                                     |
| -------------------------- | --------------------------------------------------------- |
| nene2-node parity          | `NENE2_JS_NODE_BASE_URL` optional in matrix               |
| Guard codegen from OpenAPI | ADR 0006 follow-up Issue (hand guards remain intentional) |
| Published Pages lag        | Wait for deploy after docs PRs                            |

## Phase 1 historical (resolved)

| F-n                     | Resolution                     |
| ----------------------- | ------------------------------ |
| F-1 `@types/node`       | PR #7                          |
| F-2 Prettier tables     | `format:fix` in workflow       |
| F-3 pin vs info.version | Documented in contracts README |
| F-4 thin client surface | Phase 2 client + #37 codegen   |
