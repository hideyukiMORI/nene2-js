# FT4: Protected route with bearer token

**Date**: 2026-05-22  
**NENE2 pin**: `contracts/nene2-openapi-pin.json`  
**Package**: `@hideyukimori/nene2-client` @ `0.0.0`  
**Issues / PRs**: [#19](https://github.com/hideyukiMORI/nene2-js/issues/19)

---

## Theme

Exercise **auth header forwarding** and `GET /examples/protected` (`getProtected`) for JWT claim introspection in consumer apps.

## What was exercised

| Item     | Notes                                       |
| -------- | ------------------------------------------- |
| Commands | `npm run check`                             |
| APIs     | `getProtected()`, existing `bearer` config  |
| OpenAPI  | `getProtected`, `ProtectedResponse`         |
| Sandbox  | mocked `fetch`, fixture `protected-ok.json` |

## Backend compatibility

Live not run — `:8080` occupied by non-NENE2 service; NENE2 Docker could not bind.

## Outcomes

**Worked well:**

- Reused `buildAuthHeaders` — no new auth API surface
- 401 returns `Nene2ClientError` with Problem Details when present

**Still manual:**

- Live JWT against NENE2 with `NENE2_LOCAL_JWT_SECRET`

## Friction points

No actionable friction — FT complete.

## Follow-up Issues (resolution tracker)

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #19   | merged |

**FT completion:** done

## Parity (tracked elsewhere)

| Repo         | Issue                                                           | Topic                  |
| ------------ | --------------------------------------------------------------- | ---------------------- |
| nene2-python | [#552](https://github.com/hideyukiMORI/nene2-python/issues/552) | health `service` field |
| nene2-python | [#553](https://github.com/hideyukiMORI/nene2-python/issues/553) | ping + notes routes    |

## Next FT

**FT5** — `updateNote` / `deleteNote`, or tag client (`/examples/tags`).
