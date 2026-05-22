# Field trials (nene2-js)

Lightweight, evidence-driven trials for **consumers** of NENE2 JSON APIs using `@hideyukimori/nene2-client`.

This repo is a **client library**, not a server framework. Field trials here focus on:

- OpenAPI pin and contract drift (`contracts/`, ADR 0002)
- Problem Details parsing and UI-friendly errors
- Typed `fetch` / `createNene2Client` ergonomics (Phase 2)
- Browser and Node consumer setups

Server-side field trials (full apps, VulnTest, MySQL cycles) stay in [NENE2](https://github.com/hideyukiMORI/NENE2) and [nene2-python](https://github.com/hideyukiMORI/nene2-python).

## When to run an FT

Run a field trial when:

- A new public client API ships (`createNene2Client`, new parsers, codegen)
- OpenAPI pin bumps (`contracts:sync`) change consumer-visible behavior
- Real friction appears in a sample app or fixture workflow — not from speculation

Skip an FT for docs-only typo fixes unrelated to consumer DX.

## Flow (one FT)

```text
1. Pick a theme from docs/todo/current.md or roadmap Phase 1–2
2. Exercise the smallest real path (fixtures + optional live matrix — see below)
3. Write docs/field-trials/2026-05-field-trial-NN.md (draft friction + DX Review)
4. Run the friction resolution cycle (§ below) — do not skip
5. Mark FT "done" in INDEX only when cycle is complete
6. Start FT(N+1)
```

Policy: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md).

## Friction resolution cycle (mandatory)

When friction appears (including failed parity probes), follow this loop **before** the next FT.

```text
┌─────────────┐
│ Run FT      │
└──────┬──────┘
       ▼
┌─────────────────────────────┐
│ Report: F-1, F-2, …         │  ← owner + severity in template
└──────┬──────────────────────┘
       ▼
┌─────────────────────────────┐
│ Open Issue(s)             │  ← correct repo (see routing table)
└──────┬──────────────────────┘
       ▼
┌─────────────────────────────┐
│ Fix via PR                  │  ← server bug → server repo PR
└──────┬──────────────────────┘  ← client bug → nene2-js PR
       ▼
┌─────────────────────────────┐
│ Verify + update report      │  ← links, re-run matrix if live
└──────┬──────────────────────┘
       ▼
┌─────────────────────────────┐
│ Close Issues → FT done      │
└──────┬──────────────────────┘
       ▼
   Next FT
```

### Issue / PR routing

| Owner                                         | Open Issue / PR in                                    |
| --------------------------------------------- | ----------------------------------------------------- |
| OpenAPI contract change                       | **NENE2** → then `npm run contracts:sync` in nene2-js |
| Client library (`@hideyukimori/nene2-client`) | **nene2-js**                                          |
| NENE2 PHP runtime (vs OpenAPI)                | **NENE2**                                             |
| nene2-python parity drift                     | **nene2-python**                                      |
| nene2-node parity drift                       | **nene2-node**                                        |
| Docs / FT template only                       | **nene2-js**                                          |

Link cross-repo Issues in the FT report (e.g. “blocked by NENE2 #NNN”).

### Completion rules

| Situation                                                        | Next FT allowed?                     |
| ---------------------------------------------------------------- | ------------------------------------ |
| All F-n Issues **merged** (or fixed in same FT PR with Closes #) | Yes                                  |
| F-n **deferred** with reason + Issue in backlog                  | Yes, only if noted in report + INDEX |
| Open friction Issues without defer                               | **No**                               |

After server fixes that change the contract: bump `contracts/` in nene2-js in a separate focused PR.

### Zero friction

State explicitly in the report: **“No actionable friction — FT complete.”** Skip Issue creation; proceed to next FT.

## Sandbox layout

| Phase    | Sandbox                                                                      |
| -------- | ---------------------------------------------------------------------------- |
| Now      | `tests/fixtures/` + optional live env URLs (see multi-backend below)         |
| After #3 | `examples/smoke/` or sibling `../nene2-js-FT/` if a multi-file app is needed |

Do not commit secrets, `.env`, or production URLs.

## Multi-backend verification

The same `createNene2Client({ baseUrl })` should work against any server that implements the **pinned NENE2 OpenAPI** contract. Verify in this order when running a field trial:

| Order | Backend      | Env variable               | Typical local URL       | Role      |
| ----- | ------------ | -------------------------- | ----------------------- | --------- |
| 1     | NENE2 (PHP)  | `NENE2_JS_API_BASE_URL`    | `http://localhost:8080` | Canonical |
| 2     | nene2-python | `NENE2_JS_PYTHON_BASE_URL` | `http://localhost:8000` | Parity    |
| 3     | nene2-node   | `NENE2_JS_NODE_BASE_URL`   | `http://localhost:3000` | Parity    |

```bash
# Example: probe all configured backends (skipped when env unset)
export NENE2_JS_API_BASE_URL=http://localhost:8080
export NENE2_JS_PYTHON_BASE_URL=http://localhost:8000
# export NENE2_JS_NODE_BASE_URL=http://localhost:3000   # when nene2-node serves health/ping

npm test -- tests/client/live-smoke-matrix.test.ts
```

- **CI** does not set these URLs — only fixture tests run.
- **Parity failures are evidence** — open Issues on the port repo or document in the FT report; do not weaken client guards to match a drifting server.
- Policy: [ADR 0003](../adr/0003-multi-backend-live-verification.md).

## What we do not copy from nene2-python

- 500-line security checklists per FT (server concern)
- FT number % 3 / % 4 security cycles
- Six full personas every time — use **two** (see template)

## Related

- Friction cycle policy: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md)
- Template: `docs/templates/field-trial-report.md`
- Index: `docs/field-trials/INDEX.md`
- NENE2 LLM trial direction: `../NENE2/docs/integrations/llm-field-trial.md` (MCP/API boundary ideas)
- Parity reference: `../nene2-python/CLAUDE.md` §12 (full framework FT loop)
