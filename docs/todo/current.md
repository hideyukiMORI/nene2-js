# Current work

Last updated: 2026-05-22

## Active

- [ ] Phase 3 follow-up — generated client / guard codegen (optional Issue)
- [ ] nene2-python — example `/examples/notes` parity (blocks FT2 notes on :18000)

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] Phase 2 — npm `0.1.0`, Trusted Publisher
- [x] [#37](https://github.com/hideyukiMORI/nene2-js/issues/37) Phase 3 — codegen + `src/types/schemas.ts` migration
- [x] [#45](https://github.com/hideyukiMORI/nene2-js/issues/45) / PR [#47](https://github.com/hideyukiMORI/nene2-js/pull/47) — FT130–229 docs onboarding
- [x] [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) / PR [#48](https://github.com/hideyukiMORI/nene2-js/pull/48) — `health({ strictService: true })`
- [x] npm `0.1.2` — PR [#50](https://github.com/hideyukiMORI/nene2-js/pull/50)
- [x] [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) / PR [#52](https://github.com/hideyukiMORI/nene2-js/pull/52) — FT marathon 500 (FT30–529)
- [x] Local app FT — `../nene2-js-FT` FT1 NENE2 live, FT2 python health-only

## Handoff

- **Codegen:** `npm run contracts:sync` → `npm run codegen` → commit `src/generated/openapi.ts`
- **Install:** `npm install @hideyukimori/nene2-client@0.1.2`
- **Marathon:** `npm run test:ft-marathon` (502 tests; live needs `NENE2_JS_API_BASE_URL=http://localhost:18080`)
