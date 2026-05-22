# FT1: OpenAPI pin and Problem Details (Phase 1 baseline)

**Date**: 2026-05-22  
**NENE2 pin**: `v1.5.98` (`openapi.info.version` 1.5.90) — ADR 0002  
**Package**: `@hideyukimori/nene2-client` @ `0.0.0` (main after PR #6–#7)  
**Issues / PRs**: [#1](https://github.com/hideyukiMORI/nene2-js/issues/1), [#2](https://github.com/hideyukiMORI/nene2-js/issues/2), PR [#6](https://github.com/hideyukiMORI/nene2-js/pull/6)–[#7](https://github.com/hideyukiMORI/nene2-js/pull/7)

---

## Theme

Validate the **consumer contract baseline** before `createNene2Client`: pinned OpenAPI under `contracts/`, sync/check tooling, and RFC 9457 Problem Details parsers. No live HTTP client wrapper yet ([#3](https://github.com/hideyukiMORI/nene2-js/issues/3) pending).

## What was exercised

| Item     | Notes                                                                              |
| -------- | ---------------------------------------------------------------------------------- |
| Commands | `npm run check`, `npm run contracts:check`, `npm run contracts:sync`               |
| Modules  | `parseProblemDetails`, `parseProblemDetailsResponse`, `isValidationProblemDetails` |
| OpenAPI  | `ProblemDetails`, `ValidationProblemDetails`, `ValidationError` schemas            |
| Sandbox  | `tests/fixtures/problem/*.json` (from OpenAPI examples)                            |

```text
cd nene2-js
npm install
npm run check
npm run contracts:check
```

Live NENE2 optional (not required for this FT): `NENE2_JS_API_BASE_URL=http://localhost:8080` after `docker compose up` in sibling `NENE2/`.

## Outcomes

**Worked well:**

- `contracts:check` fails clearly when pin SHA and `contracts/openapi.yaml` diverge
- Problem Details guards accept OpenAPI example JSON without a running server
- `parseProblemDetailsResponse` handles `application/problem+json` in tests
- Two-repo split (`nene2-js` vs `nene2-node`) documented in ADR 0001 amendment

**Still manual / missing:**

- No `createNene2Client` — success paths still require raw `fetch`
- No generated types from `contracts/openapi.yaml` (Phase 3 optional)
- Live smoke script not committed

## Friction points

### F-1: `@types/node` missing on first test PR (severity: low)

**What happened:** ESLint flagged `process`, `readFileSync`, and `import.meta` in tests until `@types/node` was added.  
**Why:** Client package had no Node typings; test files use filesystem helpers.  
**Follow-up:** Resolved in PR #7. Document in coding standards that tests assume `@types/node`.

### F-2: Prettier fails CI on markdown tables (severity: low)

**What happened:** `npm run check` failed on `docs/todo/current.md` and integration docs until `format:fix`.  
**Why:** Table column alignment differs from Prettier output.  
**Follow-up:** Run `npm run format:fix` before PR; consider noting in PR template.

### F-3: `nene2GitRef` vs `openapi.info.version` mismatch (severity: medium)

**What happened:** Pin file records `v1.5.98` while OpenAPI `info.version` is `1.5.90`.  
**Why:** NENE2 may tag releases without bumping `info.version`.  
**Follow-up:** ADR 0002 already stores both; add one line to `contracts/README.md` when bumping pin. No code change required.

### F-4: Library surface too thin for “import and call API” (severity: medium)

**What happened:** After #1–#2, consumers still hand-roll `fetch` for success bodies.  
**Why:** By design — #3 delivers typed client.  
**Follow-up:** [#3](https://github.com/hideyukiMORI/nene2-js/issues/3). Track in FT2 after client lands.

## DX Review

### Persona A — TypeScript app developer (primary)

Building a React dashboard against NENE2 on localhost. Wants `validation-failed` → field errors without reading PHP docs.

**Documentation:** ADR 0002 and `contracts/README.md` explain pin well. Missing: a single “5-minute consumer” page with copy-paste `fetch` + `parseProblemDetailsResponse` until #3 ships.  
**Error handling:** `isValidationProblemDetails` + `NENE2_PROBLEM_TYPE_VALIDATION_FAILED` are enough to branch UI. `problemDetailsExtensions` helps for `max_body_bytes` on 413.  
**Friction felt:** Medium — parsers are clear; wiring every endpoint is still manual.  
**Risk:** medium until typed client exists.

### Persona B — New to NENE2 (secondary)

Cloned only `nene2-js`, no sibling `NENE2/`.

**Onboarding:** `contracts:check` works offline thanks to vendored yaml — good. `contracts:sync` needs network or sibling path; README could state that upfront.  
**One surprise:** Two npm repos (`nene2-client` vs future `nene2-framework` on `nene2-node`) — README table helps after cross-link PR.  
**Risk:** low for read-only contract work; medium if they expect a server in this repo.

## Follow-up Issues

| Issue                                                   | Summary                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| [#3](https://github.com/hideyukiMORI/nene2-js/issues/3) | `createNene2Client` + health/ping                                  |
| —                                                       | Optional: `docs/howto/consume-problem-details.md` (short) after #3 |
| —                                                       | Optional: `examples/smoke/` for live NENE2 (non-CI)                |

## Next FT

**FT2** (after #3): Typed client for `GET /health` and `GET /examples/ping` — live or fixture-backed; Persona A focus on `baseUrl` / auth headers.
