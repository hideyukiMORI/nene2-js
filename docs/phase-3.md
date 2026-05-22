# Phase 3 — OpenAPI codegen

**Status:** in progress (2026-05-22)  
**Tracking Issue:** [#37](https://github.com/hideyukiMORI/nene2-js/issues/37)  
**ADR:** [0006 — types only](adr/0006-openapi-codegen-types-only.md)

## Exit criteria

- [x] `npm run codegen` from `contracts/openapi.yaml`
- [x] `npm run codegen:check` in `npm run check`
- [x] Alignment tests (exported types = `components['schemas']`)
- [x] `src/types/schemas.ts` re-exports; hand files keep guards only
- [x] PR template reminds `codegen` on contract bumps
- [ ] Optional: export `OpenApiSchemas` / paths from package entry (ADR follow-up)

## Commands

```bash
npm run contracts:sync   # after NENE2 contract bump
npm run codegen          # refresh src/generated/openapi.ts
npm run codegen:check    # CI drift gate
```

## Non-goals (this phase)

- Auto-generated fetch client replacing `createNene2Client`
- npm subpath `@hideyukimori/nene2-client/openapi` (until ADR says otherwise)
