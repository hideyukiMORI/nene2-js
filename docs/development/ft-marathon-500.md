# FT marathon (500 scenarios)

Automated field trials **FT30–FT529** — 500 patterns (fixture-heavy + live evac subset).

## Run

```bash
# Fixture scenarios (488) — CI-safe
npm run test:ft-marathon

# All 500 including live evac (NENE2 on :18080)
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_MACHINE_API_KEY=ft-evac-local-machine-api-key-32ch!!
export NENE2_LOCAL_JWT_SECRET=ft-evac-local-jwt-secret-min-32-chars!!
npm run ft:marathon
```

`ft:marathon` = `test:ft-marathon` + regenerate reports from `tools/ft-marathon/catalog.mjs`.

## Layout

| Path                                          | Role                        |
| --------------------------------------------- | --------------------------- |
| `tools/ft-marathon/catalog.mjs`               | Base 100 + bulk 400 entries |
| `tools/ft-marathon/generate-bulk-catalog.mjs` | Bulk template builder       |
| `tests/field-trials/runners.ts`               | Core handlers               |
| `tests/field-trials/runners-bulk.ts`          | `bulk_*` handlers           |
| `tests/field-trials/ft-marathon.test.ts`      | Vitest driver               |

## Bulk categories (400 added)

errors-bulk · query-bulk · notes-bulk · tags-bulk · validation-bulk · problem-bulk · config-bulk · auth-bulk · concurrency-bulk · openapi-bulk · fixtures-bulk · content-type-bulk · replay-bulk · misc-bulk

See [field-trials.md](field-trials.md) for friction cycle (ADR 0004).
