# Current work

Last updated: 2026-05-22

## Active

- [ ] Phase 3 follow-up — generated client / guard codegen (optional Issue)
- [ ] npm `0.1.2` publish (`strictService`, FT reports regen)
- [x] Local app FT — `../nene2-js-FT/apps/notes-console` live on :18080 (FT1 report)

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] Phase 2 — npm `0.1.0`, Trusted Publisher
- [x] [#37](https://github.com/hideyukiMORI/nene2-js/issues/37) Phase 3 — codegen + `src/types/schemas.ts` migration
- [x] [#45](https://github.com/hideyukiMORI/nene2-js/issues/45) / PR [#47](https://github.com/hideyukiMORI/nene2-js/pull/47) — FT130–229 docs onboarding + full-granularity reports
- [x] [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) / PR [#48](https://github.com/hideyukiMORI/nene2-js/pull/48) — `health({ strictService: true })`

## Handoff

- **Codegen:** `npm run contracts:sync` → `npm run codegen` → commit `src/generated/openapi.ts`
- **Install:** `npm install @hideyukimori/nene2-client`
- Types: `src/types/schemas.ts` ← `components['schemas']`
