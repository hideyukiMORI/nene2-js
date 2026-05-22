# ADR 0002 — OpenAPI Contract Pin Policy

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** [#1](https://github.com/hideyukiMORI/nene2-js/issues/1)

---

## Context

nene2-js must track [NENE2](https://github.com/hideyukiMORI/NENE2) `docs/openapi/openapi.yaml` without becoming a second contract author. Contributors may clone only `nene2-js`; CI must not depend on a sibling `NENE2/` checkout. Options considered: git submodule, committed vendored copy, CI-only fetch, local path only.

## Decision

1. **Authoritative contract** remains NENE2 `docs/openapi/openapi.yaml`. nene2-js never edits public API shapes locally without coordinating an NENE2 change first.

2. **Committed pin** lives under `contracts/`:
   - `contracts/openapi.yaml` — vendored copy used by tests, codegen (Phase 3), and CI
   - `contracts/nene2-openapi-pin.json` — metadata: `nene2GitRef`, `openapiInfoVersion`, `contractSha256`, `syncedAt`, `sourcePath`

3. **Local development** may read the sibling file directly via `NENE2_JS_OPENAPI_PATH` (default `../NENE2/docs/openapi/openapi.yaml`). Sync script copies from that path when present.

4. **Sync tooling**: `npm run contracts:sync` updates the vendored copy and pin metadata from the resolved source. `npm run contracts:check` verifies the committed copy matches the pin (SHA-256). Both are part of `npm run check` in CI.

5. **Remote fallback**: when the sibling path is missing, sync/check fetch from  
   `https://raw.githubusercontent.com/hideyukiMORI/NENE2/<nene2GitRef>/docs/openapi/openapi.yaml`.

6. **Pin bumps**: intentional — open an Issue, run `contracts:sync` after updating `nene2GitRef` in the pin file (or let sync read a newer sibling), commit `contracts/*`, note NENE2 tag in PR.

7. **Phase 3 codegen** reads `contracts/openapi.yaml` only, not ad-hoc paths.

## Consequences

### Positive

- CI and contributors without a local NENE2 clone get a reproducible contract
- Drift is detectable (`contracts:check` fails when yaml and pin disagree)
- No submodule maintenance or nested git history
- Clear handoff: bump pin when NENE2 releases a contract change

### Negative / trade-offs

- Large yaml is committed (~1k lines); PRs that sync contracts can be noisy
- `openapi.info.version` and `nene2GitRef` may diverge (NENE2 may tag without bumping info.version) — pin records both for traceability
- Manual sync step until automation Issue links NENE2 release tags

## Alternatives considered

| Alternative                      | Rejected because                                        |
| -------------------------------- | ------------------------------------------------------- |
| Git submodule of NENE2           | Heavy for a thin client repo; awkward for npm consumers |
| Sibling path only                | Breaks CI and clones that only fetch nene2-js           |
| CI fetch without commit          | Non-reproducible offline builds; harder code review     |
| Copy script without pin metadata | Hard to know which NENE2 revision the yaml came from    |

## References

- Implementation: `tools/sync-openapi.mjs`, `contracts/README.md`
- Env: `NENE2_JS_OPENAPI_PATH` in `.env.example`
- NENE2 OpenAPI: https://github.com/hideyukiMORI/NENE2/blob/main/docs/openapi/openapi.yaml
