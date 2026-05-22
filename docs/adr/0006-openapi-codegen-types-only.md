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
5. **Public exports:** type aliases in `src/types/schemas.ts` re-export `components['schemas']`; runtime guards stay in hand-maintained modules. `OpenApiSchemas` exported from the package entry for advanced consumers.
6. **Out of scope (follow-up Issues):** generating `createNene2Client` methods, replacing hand guards with codegen, publishing `src/generated/` as a subpath export.

   **Guard codegen follow-up:** [#86](https://github.com/hideyukiMORI/nene2-js/issues/86) (planned ADR 0007).

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

## Update (2026-05-23)

Schema runtime guards shipped via [ADR 0007](0007-openapi-guard-codegen-ajv-standalone.md) ([#86](https://github.com/hideyukiMORI/nene2-js/issues/86)). `src/types/*` `is*` functions delegate to `src/generated/guards.ts`. Decision items 5–6 and the #86 follow-up apply to **schema guards only**; `src/problem/guards.ts` stays hand-maintained (ADR 0007 §7).
