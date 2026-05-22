# ADR 0006 — OpenAPI Codegen (Types Only)

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** [#37](https://github.com/hideyukiMORI/nene2-js/issues/37)

---

## Context

Phase 1–2 hand-maintained `src/types/*` and runtime guards track `contracts/openapi.yaml`. As NENE2 OpenAPI grows, manual drift risk increases. Phase 3 adds automated generation while keeping the published client API stable.

## Decision

1. **Tool:** [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) v7 (CLI `openapi-typescript`).
2. **Input:** `contracts/openapi.yaml` only (ADR 0002 pin).
3. **Output:** committed `src/generated/openapi.ts` (do not hand-edit; regenerate via `npm run codegen`).
4. **CI:** `npm run codegen:check` fails when generated output drifts.
5. **Public exports:** unchanged for `0.1.x` — hand types and guards remain the npm surface. `src/types/openapi-bridge.ts` documents parity with `components['schemas']`.
6. **Out of scope (follow-up Issues):** generating `createNene2Client` methods, replacing hand guards, publishing generated paths as subpath exports.

## Consequences

### Positive

- Contract changes surface as `codegen:check` failures after `contracts:sync`
- Single generated file (~800 lines) is reviewable in PRs
- Alignment tests lock hand types to generated schemas

### Negative / trade-offs

- Duplicate type definitions until migration completes
- Generated file excluded from strict ESLint (machine output)

## Alternatives considered

- **openapi-generator** — heavier; full client codegen not wanted yet (ADR 0001 boundary).
- **No commit of generated file** — rejected; CI and offline clones need deterministic types without running codegen first.
