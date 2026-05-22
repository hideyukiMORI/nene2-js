# FT6: Example tags client (full CRUD)

**Date**: 2026-05-22  
**Issues / PRs**: [#23](https://github.com/hideyukiMORI/nene2-js/issues/23)

---

## Theme

Mirror notes client for **tags** (`listTags`, `getTag`, `createTag`, `updateTag`, `deleteTag`) and confirm live list on evac port **18080**.

## What was exercised

| Item     | Notes                                                      |
| -------- | ---------------------------------------------------------- |
| Commands | `npm run check`, `./scripts/run-live-smoke-evac.sh`        |
| APIs     | tags CRUD surface                                          |
| Live     | `GET http://localhost:18080/examples/tags` → empty list OK |

## Friction points

None — FT complete.

## Follow-up Issues

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #23   | merged |

**FT completion:** done

## Next FT

**FT7** — live `getProtected` with JWT on NENE2 evac port, or codegen spike.
