# Phase 3 — OpenAPI codegen

**Status:** complete (2026-05-23) — types ([#37](https://github.com/hideyukiMORI/nene2-js/issues/37)) + guards ([#86](https://github.com/hideyukiMORI/nene2-js/issues/86))  
**ADR:** [0006 — types only](adr/0006-openapi-codegen-types-only.md) · [0007 — guard codegen](../adr/0007-openapi-guard-codegen-ajv-standalone.md)

## Exit criteria

- [x] `npm run codegen` from `contracts/openapi.yaml`
- [x] `npm run codegen:check` in `npm run check`
- [x] Alignment tests (exported types = `components['schemas']`)
- [x] `src/types/schemas.ts` re-exports; `src/types/*` guards delegate to `src/generated/guards.ts` (ADR 0007)
- [x] PR template reminds `codegen` on contract bumps
- [x] Export `OpenApiSchemas` and `OpenApiPaths` from package entry (ADR 0006)

## Commands

```bash
npm run contracts:sync   # after NENE2 contract bump
npm run codegen          # refresh src/generated/openapi.ts
npm run codegen:check    # CI drift gate
npm run codegen:guards   # refresh src/generated/guards.ts (ADR 0007)
npm run codegen:guards:check
```

## Non-goals (this phase)

- Auto-generated fetch client replacing `createNene2Client`
- npm subpath `@hideyukimori/nene2-client/openapi` (until ADR says otherwise)
