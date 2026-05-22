# Current work

Last updated: 2026-05-22 (Phase 2 kickoff)

## Active

- [ ] [#33](https://github.com/hideyukiMORI/nene2-js/issues/33) Phase 2 — build, exports, npm `0.1.0` publish ([phase-2.md](phase-2.md))

## Completed (Phase 1)

- [x] Bootstrap at `/home/xi/docker/nene2-js` (sibling of `NENE2`)
- [x] GitHub: https://github.com/hideyukiMORI/nene2-js
- [x] `npm run check` passes locally
- [x] [#1](https://github.com/hideyukiMORI/nene2-js/issues/1) ADR 0002 — OpenAPI pin
- [x] [#2](https://github.com/hideyukiMORI/nene2-js/issues/2) Problem Details guards
- [x] Field trial framework + FT1–129 ([INDEX](field-trials/INDEX.md))
- [x] [#3](https://github.com/hideyukiMORI/nene2-js/issues/3)–[#27](https://github.com/hideyukiMORI/nene2-js/issues/27) client + live evac
- [x] [#29](https://github.com/hideyukiMORI/nene2-js/issues/29) FT10–29 marathon
- [x] [#31](https://github.com/hideyukiMORI/nene2-js/issues/31) FT30–129 marathon (PR #32)

## Next Issues

| #   | Title                                      |
| --- | ------------------------------------------ |
| 33  | Phase 2 — build + npm publish              |
| —   | Phase 3 codegen ADR (after publish stable) |

## Handoff

- **Phase 2:** [phase-2.md](phase-2.md), ADR [0005](adr/0005-client-error-model-throw-not-result.md)
- OpenAPI pin: `contracts/openapi.yaml` + `contracts/nene2-openapi-pin.json` (ADR 0002)
- Field trials: `docs/field-trials/INDEX.md` — regression via `npm run test:ft-marathon`
- Evac ports: [ft-evac-ports.md](development/ft-evac-ports.md) — NENE2 `18080`
- External parity: [nene2-python #553](https://github.com/hideyukiMORI/nene2-python/issues/553) (not blocking publish)
- Live matrix: `NENE2_JS_*_BASE_URL` → `tests/client/live-smoke-matrix.test.ts` (ADR 0003)
