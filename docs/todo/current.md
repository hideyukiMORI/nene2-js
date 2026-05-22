# Current work

Last updated: 2026-05-22 (Phase 2 complete)

## Active

- [ ] Phase 3 — OpenAPI codegen ADR + script (Issue TBD)
- [ ] npm **Trusted Publisher** on package settings + remove `NPM_TOKEN` if set ([publish.md](development/publish.md))

## Completed

- [x] Phase 1 — contract baseline, FT1–129
- [x] [#33](https://github.com/hideyukiMORI/nene2-js/issues/33) Phase 2 — build, exports, npm `0.1.0` published

## Handoff

- **Install:** `npm install @hideyukimori/nene2-client` — [npm](https://www.npmjs.com/package/@hideyukimori/nene2-client) `0.1.0`
- **Build:** `npm run build` · **Verify:** `npm run pack:smoke` · **Release:** [publish.md](development/publish.md)
- OpenAPI pin: `contracts/openapi.yaml` (ADR 0002)
- Field trials: `npm run test:ft-marathon`
- External parity: [nene2-python #553](https://github.com/hideyukiMORI/nene2-python/issues/553)
