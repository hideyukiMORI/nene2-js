# Phase 3 — OpenAPI codegen

**Status:** in progress (2026-05-22)  
**Tracking Issue:** [#37](https://github.com/hideyukiMORI/nene2-js/issues/37)  
**ADR:** [0006 — types only](adr/0006-openapi-codegen-types-only.md)

## Exit criteria

- [x] `npm run codegen` from `contracts/openapi.yaml`
- [x] `npm run codegen:check` in `npm run check`
- [x] Alignment tests (hand types vs `components['schemas']`)
- [ ] Migrate hand `src/types/*` to re-export generated schemas (follow-up)
- [ ] Optional: codegen on OpenAPI pin bump PR template note

## Commands

```bash
npm run contracts:sync   # after NENE2 contract bump
npm run codegen          # refresh src/generated/openapi.ts
npm run codegen:check    # CI drift gate
```

## Non-goals (this phase)

- Auto-generated fetch client replacing `createNene2Client`
- npm subpath `@hideyukimori/nene2-client/openapi` (until ADR says otherwise)
