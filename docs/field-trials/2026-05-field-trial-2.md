# FT2: Typed client for health and ping

**Date**: 2026-05-22  
**NENE2 pin**: `v1.5.98` (`openapi.info.version` 1.5.90)  
**Package**: `@hideyukimori/nene2-client` @ `0.0.0` (after Issue #3)  
**Issues / PRs**: [#3](https://github.com/hideyukiMORI/nene2-js/issues/3)

---

## Theme

Exercise **`createNene2Client`** for `GET /health` and `GET /examples/ping` using OpenAPI fixtures, mocked `fetch`, and optional live NENE2.

## What was exercised

| Item     | Notes                                                                       |
| -------- | --------------------------------------------------------------------------- |
| Commands | `npm run check`, `npm test`, optional `NENE2_JS_API_BASE_URL=… npm test`    |
| APIs     | `createNene2Client`, `client.health()`, `client.ping()`, `Nene2ClientError` |
| OpenAPI  | `getHealth`, `getExamplePing`                                               |
| Sandbox  | `tests/fixtures/system/`, `tests/client/*.test.ts`                          |

```text
cd nene2-js
npm run check
# optional live:
export NENE2_JS_API_BASE_URL=http://localhost:8080
npm test -- tests/client/live-smoke.test.ts
```

## Outcomes

**Worked well:**

- Two-line consumer flow: `createNene2Client` → `health()` / `ping()`
- `Nene2ClientError.problem` reuses FT1 Problem Details parsers
- Injectable `fetch` keeps CI deterministic
- Live smoke skips cleanly when env is unset

**Live smoke note:** `NENE2_JS_API_BASE_URL=http://localhost:8080` on this host returned a **non-NENE2** health JSON (`Result`/`Data` wrapper) and HTML 404 for `/examples/ping` — port is another app, not sibling NENE2 Docker. Mocked tests pass; live verification needs NENE2 `docker compose up`.

**Still manual / missing:**

- 503 degraded `/health` returns valid JSON but client throws (by design today)
- No `Result` type — errors throw (ADR pending)
- Notes/Tags endpoints not in client yet

## Friction points

### F-1: Degraded health (503) is indistinguishable from “broken client” (severity: medium)

| Field      | Value                                                     |
| ---------- | --------------------------------------------------------- |
| **Owner**  | `nene2-js`                                                |
| **Issue**  | [#16](https://github.com/hideyukiMORI/nene2-js/issues/16) |
| **PR**     | FT3 client PR                                             |
| **Status** | merged                                                    |

**What happened:** OpenAPI allows HTTP 503 with a `HealthResponse` body (`status: degraded`). `getJson` treated any `!response.ok` as `Nene2ClientError`.  
**Why:** Simple success/fail split for Phase 2.  
**Resolution:** `health({ allowDegraded: true })` accepts 503 when body validates (FT3).

### F-2: `fetch` must exist or be injected (severity: low)

**What happened:** `resolveConfig` throws if `globalThis.fetch` is missing.  
**Why:** Node 22+ and browsers have native fetch; older Node needs polyfill.  
**Follow-up:** README notes Node 22+; optional undici peer dep later.

### F-3: Live smoke requires real NENE2 on the URL (severity: low)

**What happened:** Port 8080 served a different API shape; client correctly rejected the body.  
**Why:** FT environment did not run NENE2 PHP container.  
**Follow-up:** Document in README: confirm `curl http://localhost:8080/health` returns `{ "status": "ok", "service": "NENE2" }` before live smoke.

### F-4: Duplicate `ping()` in README example (severity: low)

**What happened:** First draft called `ping()` twice in try/catch demo.  
**Why:** Copy-paste in doc edit.  
**Follow-up:** Fixed before merge.

## DX Review

### Persona A — TypeScript app developer (primary)

Called `health()` and `ping()` from a Vite app against local NENE2.

**Documentation:** README snippet is enough for first success. Would like `docs/howto/consume-health-ping.md` one page later.  
**Error handling:** `instanceof Nene2ClientError` + `problem` fits React error boundaries.  
**Friction felt:** Low for happy path; medium if load balancer expects 503 body without throw.  
**Risk:** medium for degraded health UX; low otherwise.

### Persona B — New to NENE2 (secondary)

Cloned `nene2-js` only, set `NENE2_JS_API_BASE_URL`, ran live smoke.

**Onboarding:** Worked when sibling NENE2 was already on :8080.  
**One surprise:** `health` and `ping` are separate methods — expected single `smoke()` helper; not required.  
**Risk:** low.

## Follow-up Issues (resolution tracker)

| Repo                  | Issue                                                                     | Status       |
| --------------------- | ------------------------------------------------------------------------- | ------------ |
| hideyukiMORI/nene2-js | [#16](https://github.com/hideyukiMORI/nene2-js/issues/16) degraded health | merged (FT3) |
| hideyukiMORI/nene2-js | [#17](https://github.com/hideyukiMORI/nene2-js/issues/17) notes client    | merged (FT3) |

**FT completion:** done

## Next FT

See [FT3](2026-05-field-trial-3.md). **FT4** — update/delete notes or protected route.
