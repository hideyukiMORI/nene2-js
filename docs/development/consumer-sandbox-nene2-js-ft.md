# Consumer sandbox (`../nene2-js-FT/`)

Local **business-app** field trials for `@hideyukimori/nene2-client`. Not a GitHub repository — lives beside `nene2-js` on disk.

## Purpose

Answer: can a blank-slate implementer (especially an AI agent) ship a working app using **only** [published ja docs](https://hideyukimori.github.io/nene2-js/ja/) and npm types?

## Apps

| App             | Path                    | APIs exercised                                       |
| --------------- | ----------------------- | ---------------------------------------------------- |
| Notes Console   | `apps/notes-console/`   | notes CRUD, `strictService`, 422 field errors        |
| Tags Studio     | `apps/tags-studio/`     | tags CRUD, `ping`, `strictService`                   |
| Health Board    | `apps/health-board/`    | Node CLI: `smoke`, `frameworkSmoke`, `machineHealth` |
| Protected smoke | `apps/protected-smoke/` | `getProtected`, `machineHealth` (evac API key + JWT) |
| Notes Editor    | `apps/notes-editor/`    | `getNote`, `updateNote`, list/create                 |
| Tags Editor     | `apps/tags-editor/`     | `getTag`, `updateTag` (CLI smoke)                    |

## Backends (evac)

| Backend      | URL                      |
| ------------ | ------------------------ |
| NENE2 PHP    | `http://localhost:18080` |
| nene2-python | `http://localhost:18000` |

See [ft-evac-ports.md](ft-evac-ports.md), `npm run verify:backends` in nene2-js.

## Quick smoke

```bash
cd ../nene2-js-FT/apps/tags-studio
cp .env.example .env
npm install && npm run build
export NENE2_JS_API_BASE_URL=http://localhost:18080
node scripts/live-smoke.mjs
```

Reports: `../nene2-js-FT/docs/field-trials/` (INDEX per FT number).

## AI policy

`../nene2-js-FT/AGENTS.md` — no reading `nene2-js/docs/` or server `src/` unless the user explicitly allows it.

## Related

- [Field trials](field-trials.md) — library FT methodology
- [Multi-backend live matrix](../adr/0003-multi-backend-live-verification.md) — `tests/client/live-smoke-matrix.test.ts`
