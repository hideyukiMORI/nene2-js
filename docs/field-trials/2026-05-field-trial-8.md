# FT8: Live notes CRUD on evac port

**Date**: 2026-05-22  
**Issues / PRs**: [#26](https://github.com/hideyukiMORI/nene2-js/issues/26)

---

## Theme

Prove **create → read → update → delete** against real NENE2 on `http://localhost:18080` (not fixtures).

## What was exercised

| Item     | Notes                                          |
| -------- | ---------------------------------------------- |
| Test     | `tests/client/live-notes-crud.test.ts`         |
| Live URL | `NENE2_JS_API_BASE_URL=http://localhost:18080` |

## Outcomes

**Worked well:** Full CRUD round-trip; delete returns 404 on subsequent `getNote`.

## Friction points

None.

## Follow-up Issues

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #26   | merged |

**FT completion:** done

## Next FT

**FT9** — live tags CRUD or machine API key header smoke (`X-NENE2-API-Key`).
