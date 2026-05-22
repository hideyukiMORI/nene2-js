# Current work

Last updated: 2026-05-22 (JST)

## Active

- [ ] Phase 3 follow-up — generated client / guard codegen (optional Issue)
- [ ] nene2-js-FT FT4+ — blank-slate new app from ja docs only (`../nene2-js-FT/`)

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] Phase 2 — npm `0.1.0`, Trusted Publisher
- [x] [#37](https://github.com/hideyukiMORI/nene2-js/issues/37) Phase 3 — codegen + types migration
- [x] [#45](https://github.com/hideyukiMORI/nene2-js/issues/45) / PR [#47](https://github.com/hideyukiMORI/nene2-js/pull/47) — FT130–229 docs onboarding
- [x] [#46](https://github.com/hideyukiMORI/nene2-js/issues/46) — `health({ strictService: true })` — npm **0.1.2**
- [x] [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) / PR [#52](https://github.com/hideyukiMORI/nene2-js/pull/52) — FT marathon **500** (FT30–529)
- [x] [nene2-python#578](https://github.com/hideyukiMORI/nene2-python/issues/578) / [#579](https://github.com/hideyukiMORI/nene2-python/pull/579) — `/examples/*` API path parity
- [x] nene2-js-FT FT1–2 live (`../nene2-js-FT/`) — NENE2 + python evac
- [x] PR [#54](https://github.com/hideyukiMORI/nene2-js/pull/54) VitePress locales · [#55](https://github.com/hideyukiMORI/nene2-js/pull/55) verify:backends
- [x] [#59](https://github.com/hideyukiMORI/nene2-js/issues/59) / PR [#60](https://github.com/hideyukiMORI/nene2-js/pull/60) — locale `strictService` + `install-nene2-python`
- [x] nene2-js-FT FT3 dual-backend smoke (`../nene2-js-FT/docs/field-trials/2026-05-field-trial-3.md`)

## Handoff

```bash
npm install @hideyukimori/nene2-client@0.1.2
npm run test:ft-marathon          # 502 tests
npm run verify:backends           # needs :18080 + :18000
export NENE2_JS_API_BASE_URL=http://localhost:18080
npm test -- tests/client/live-smoke-matrix.test.ts
```
