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
2. Exercise the smallest real path (Vitest fixtures and/or live NENE2 on :8080)
3. Record friction as F-1, F-2, … (observed only)
4. Write docs/field-trials/2026-05-field-trial-NN.md (template below)
5. DX Review: Persona A (primary) + Persona B (short) — see template
6. Open Issues only for friction that needs code or policy changes
7. Update docs/field-trials/INDEX.md and docs/todo/current.md
```

## Sandbox layout

| Phase    | Sandbox                                                                      |
| -------- | ---------------------------------------------------------------------------- |
| Now      | `tests/fixtures/` + optional live `NENE2_JS_API_BASE_URL`                    |
| After #3 | `examples/smoke/` or sibling `../nene2-js-FT/` if a multi-file app is needed |

Do not commit secrets, `.env`, or production URLs.

## What we do not copy from nene2-python

- 500-line security checklists per FT (server concern)
- FT number % 3 / % 4 security cycles
- Six full personas every time — use **two** (see template)

## Related

- Template: `docs/templates/field-trial-report.md`
- Index: `docs/field-trials/INDEX.md`
- NENE2 LLM trial direction: `../NENE2/docs/integrations/llm-field-trial.md` (MCP/API boundary ideas)
- Parity reference: `../nene2-python/CLAUDE.md` §12 (full framework FT loop)
