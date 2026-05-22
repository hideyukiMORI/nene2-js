# FT3: Example notes client (list / get / create)

**Date**: 2026-05-22  
**NENE2 pin**: `contracts/nene2-openapi-pin.json` → `nene2GitRef`  
**Package**: `@hideyukimori/nene2-client` @ `0.0.0`  
**Issues / PRs**: [#16](https://github.com/hideyukiMORI/nene2-js/issues/16), [#17](https://github.com/hideyukiMORI/nene2-js/issues/17)

---

## Theme

First **CRUD-style consumer** path: `listNotes`, `getNote`, `createNote` against OpenAPI example notes, plus **degraded health** opt-in from FT2 F-1.

## What was exercised

| Item               | Notes                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| Commands           | `npm run check`                                                            |
| APIs               | `listNotes`, `getNote`, `createNote`, `health({ allowDegraded: true })`    |
| OpenAPI operations | `listExampleNotes`, `getExampleNoteById`, `createExampleNote`, `getHealth` |
| Sandbox            | `tests/fixtures/examples/`, mocked `fetch` tests                           |

```text
cd nene2-js
npm run check
```

## Backend compatibility (when live smoke was run)

| Backend      | URL | health | ping | listNotes | Notes                                           |
| ------------ | --- | ------ | ---- | --------- | ----------------------------------------------- |
| NENE2 (PHP)  | —   | n/a    | n/a  | n/a       | No NENE2 on :8080 in this session (foreign API) |
| nene2-python | —   | n/a    | n/a  | n/a       | Not running                                     |
| nene2-node   | —   | n/a    | n/a  | n/a       | Not running                                     |

## Outcomes

**Worked well:**

- Paginated `listNotes({ limit, offset })` with query string builder
- `getNote(id)` and `createNote({ title, body })` share `ExampleNote` guard
- `health({ allowDegraded: true })` accepts 503 + degraded body per OpenAPI
- Live matrix extended to probe `listNotes` when env URLs set

**Still manual / missing:**

- `updateNote` / `deleteNote` (FT4 candidate)
- Protected route + auth headers (FT4 or FT5)
- Live verification against real NENE2 Docker

## Friction points

### F-1: No NENE2 runtime on default :8080 (severity: low)

| Field      | Value                           |
| ---------- | ------------------------------- |
| **Owner**  | `docs`                          |
| **Issue**  | —                               |
| **PR**     | README verify section (this PR) |
| **Status** | merged                          |

**What happened:** Live smoke cannot run without operator starting NENE2.  
**Why:** Environment constraint, not client bug.  
**Resolution:** README `curl /health` verification steps.

## DX Review

### Persona A — TypeScript app developer (primary)

Listed notes in a dashboard prototype using mocked fetch in Vitest first.

**Documentation:** README notes snippet sufficient; dedicated howto deferred.  
**Error handling:** Same `Nene2ClientError` path as health/ping.  
**Friction felt:** Low for list/get/create happy path.  
**Risk:** low

### Persona B — New to NENE2 (secondary)

Expected `notes.list()` namespace; flat methods are fine.

**Onboarding:** Clear method names match OpenAPI operationIds.  
**One surprise:** `createNote` returns body only (Location header not exposed yet).  
**Risk:** low

## Follow-up Issues (resolution tracker)

| Repo                  | Issue | PR        | Status |
| --------------------- | ----- | --------- | ------ |
| hideyukiMORI/nene2-js | #16   | (this PR) | merged |
| hideyukiMORI/nene2-js | #17   | (this PR) | merged |

**FT completion:** done

## Next FT

**FT4** — `updateNote` / `deleteNote`, or `GET /examples/protected` with bearer/apiKey.
