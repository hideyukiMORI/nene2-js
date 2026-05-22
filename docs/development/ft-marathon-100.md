# FT marathon (100 scenarios)

Automated field trials **FT30–FT129** — ~100 patterns without hand-writing each test body.

## Run

```bash
# Fixture scenarios (88) always run in CI
npm run test:ft-marathon

# All 100 including live evac (needs NENE2 on :18080)
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_MACHINE_API_KEY=ft-evac-local-machine-api-key-32ch!!
export NENE2_LOCAL_JWT_SECRET=ft-evac-local-jwt-secret-min-32-chars!!
npm run ft:marathon
```

`ft:marathon` = tests + regenerate report markdown from `tools/ft-marathon/catalog.mjs`.

## Layout

| Path                                          | Role                                                     |
| --------------------------------------------- | -------------------------------------------------------- |
| `tools/ft-marathon/catalog.mjs`               | 100 scenario definitions (theme, handler, persona notes) |
| `tests/field-trials/runners.ts`               | Handler implementations                                  |
| `tests/field-trials/ft-marathon.test.ts`      | Vitest driver                                            |
| `tools/ft-marathon/build-report-markdown.mjs` | Full report body (NENE2 / nene2-python granularity)      |
| `tools/ft-marathon/write-reports.mjs`         | Writes `docs/field-trials/2026-05-field-trial-NN.md`     |

## Categories (100 total)

health · system · notes · tags · protected · auth-headers · config-dx · errors · problem · validation-dx · concurrency · query · live-evac

Friction from a failing scenario: fix in `runners.ts` or client code, re-run `npm run ft:marathon`, update report manually if needed (ADR 0004).
