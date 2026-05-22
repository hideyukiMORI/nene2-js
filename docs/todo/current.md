# Current work

Last updated: 2026-05-22 (Phase 3 types migration)

## Active

- [ ] Phase 3 follow-up — generated client / guard codegen (optional Issue)
- [x] npm `0.1.1` — Phase 3 types/codegen (see [releases.md](development/releases.md))

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] Phase 2 — npm `0.1.0`, Trusted Publisher
- [x] [#37](https://github.com/hideyukiMORI/nene2-js/issues/37) Phase 3 — codegen + `src/types/schemas.ts` migration

## Handoff

- **Codegen:** `npm run contracts:sync` → `npm run codegen` → commit `src/generated/openapi.ts`
- **Install:** `npm install @hideyukimori/nene2-client`
- Types: `src/types/schemas.ts` ← `components['schemas']`
