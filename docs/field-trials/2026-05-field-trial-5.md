# FT5: Note update/delete + live smoke on evac ports

**Date**: 2026-05-22  
**NENE2 pin**: `contracts/nene2-openapi-pin.json`  
**Package**: `@hideyukimori/nene2-client` @ `0.0.0`  
**Issues / PRs**: [#21](https://github.com/hideyukiMORI/nene2-js/issues/21)

---

## Theme

Complete example-notes **write path** (`updateNote`, `deleteNote`) and run **live smoke on evacuation ports** while `:8080` is occupied by another agent.

## What was exercised

| Item       | Notes                                                             |
| ---------- | ----------------------------------------------------------------- |
| Commands   | `npm run check`, `scripts/run-live-smoke-evac.sh`                 |
| APIs       | `updateNote`, `deleteNote`                                        |
| OpenAPI    | `updateExampleNoteById`, `deleteExampleNoteById`                  |
| Evac infra | `tools/compose-ft-evac.yaml`, `docs/development/ft-evac-ports.md` |
| Live URLs  | NENE2 `http://localhost:18080`, python `http://localhost:18000`   |

```bash
cd ../NENE2
docker compose -f compose.yaml -f ../nene2-js/tools/compose-ft-evac.yaml up -d
export NENE2_JS_API_BASE_URL=http://localhost:18080
./scripts/run-live-smoke-evac.sh
```

## Backend compatibility (live)

| Backend      | URL                    | health | ping | listNotes | Notes                           |
| ------------ | ---------------------- | ------ | ---- | --------- | ------------------------------- |
| NENE2 (PHP)  | http://localhost:18080 | ok     | ok   | ok        | Canonical on evac port          |
| nene2-python | http://localhost:18000 | ok     | fail | fail      | #553 — no ping/notes routes yet |
| nene2-node   | —                      | n/a    | n/a  | n/a       | Not started                     |

## Outcomes

**Worked well:**

- `updateNote` / `deleteNote` with mocked fetch (PUT + DELETE 204)
- NENE2 live matrix green on **18080** only
- `curl http://localhost:18080/examples/notes?limit=2` returns paginated items

**Still manual:**

- Parity matrix with python env set fails until #553 (intentional strict probe)

## Friction points

### F-1: Default compose still binds :8080 when override present (severity: low)

| Field      | Value                                                |
| ---------- | ---------------------------------------------------- |
| **Owner**  | `docs`                                               |
| **Issue**  | —                                                    |
| **PR**     | `tools/compose-ft-evac.yaml` with `ports: !override` |
| **Status** | merged                                               |

**What happened:** `docker compose up` in NENE2 merged `compose.yaml` + `compose.override.yaml` and still tried `:8080`.  
**Resolution:** Use explicit `-f compose.yaml -f ../nene2-js/tools/compose-ft-evac.yaml` (documented).

## Follow-up Issues (resolution tracker)

| Repo                      | Issue                                                           | Status              |
| ------------------------- | --------------------------------------------------------------- | ------------------- |
| hideyukiMORI/nene2-js     | #21                                                             | merged              |
| hideyukiMORI/nene2-python | [#553](https://github.com/hideyukiMORI/nene2-python/issues/553) | open (ping + notes) |

**FT completion:** done

## Next FT

**FT6** — tags client (`/examples/tags`) or live `getProtected` with JWT on evac port.
