# FT7: Live JWT `getProtected` on evac port

**Date**: 2026-05-22  
**Issues / PRs**: [#25](https://github.com/hideyukiMORI/nene2-js/issues/25)

---

## Theme

End-to-end **Bearer JWT** against `GET /examples/protected` on **http://localhost:18080**, including dev token minting aligned with NENE2 `LocalBearerTokenVerifier`.

## What was exercised

| Item     | Notes                                                                  |
| -------- | ---------------------------------------------------------------------- |
| Commands | `node tools/issue-dev-jwt.mjs`, `tests/client/live-protected.test.ts`  |
| Infra    | `compose-ft-evac.yaml` sets `NENE2_LOCAL_JWT_SECRET` (route registers) |
| Live     | `getProtected()` → `sub: user-42`, `scope: read:system`                |

```bash
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_LOCAL_JWT_SECRET=ft-evac-local-jwt-secret-min-32-chars!!
./scripts/run-live-smoke-evac.sh
```

## Backend compatibility

| Backend | protected | Notes                                                |
| ------- | --------- | ---------------------------------------------------- |
| NENE2   | ok        | 404 when `NENE2_LOCAL_JWT_SECRET` empty (documented) |

## Friction points

### F-1: `/examples/protected` 404 without JWT secret (severity: low)

| Field      | Value                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| **Owner**  | `docs`                                                                       |
| **Issue**  | —                                                                            |
| **PR**     | `compose-ft-evac.yaml` + [ft-evac-ports.md](../development/ft-evac-ports.md) |
| **Status** | merged                                                                       |

**What happened:** Empty `NENE2_LOCAL_JWT_SECRET` → route not registered (by design).  
**Resolution:** Evac compose injects dev-only secret; README/ft-evac docs.

## Follow-up Issues

| Repo                  | Issue | Status |
| --------------------- | ----- | ------ |
| hideyukiMORI/nene2-js | #25   | merged |

**FT completion:** done

## Next FT

See [FT8](2026-05-field-trial-8.md) — live notes CRUD on evac port.
