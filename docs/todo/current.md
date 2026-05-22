# Current work

Last updated: 2026-05-22 (FT30–129 marathon)

## Active

- [x] Bootstrap at `/home/xi/docker/nene2-js` (sibling of `NENE2`)
- [x] GitHub: https://github.com/hideyukiMORI/nene2-js
- [x] `npm run check` passes locally
- [x] [#1](https://github.com/hideyukiMORI/nene2-js/issues/1) ADR 0002 — OpenAPI pin (`contracts/`, `contracts:sync|check`)
- [x] [#2](https://github.com/hideyukiMORI/nene2-js/issues/2) Problem Details guards (`src/problem/`)
- [x] Field trial framework + [FT1](docs/field-trials/2026-05-field-trial-1.md)
- [x] [#3](https://github.com/hideyukiMORI/nene2-js/issues/3) + [FT2](docs/field-trials/2026-05-field-trial-2.md) health / ping client
- [x] [#13](https://github.com/hideyukiMORI/nene2-js/issues/13) ADR 0004 FT friction cycle
- [x] [#16](https://github.com/hideyukiMORI/nene2-js/issues/16) + [#17](https://github.com/hideyukiMORI/nene2-js/issues/17) + [FT3](docs/field-trials/2026-05-field-trial-3.md) notes client
- [x] [#19](https://github.com/hideyukiMORI/nene2-js/issues/19) + [FT4](docs/field-trials/2026-05-field-trial-4.md) getProtected
- [x] [#21](https://github.com/hideyukiMORI/nene2-js/issues/21) + [FT5](docs/field-trials/2026-05-field-trial-5.md) update/delete + evac ports
- [x] [#23](https://github.com/hideyukiMORI/nene2-js/issues/23) + [FT6](docs/field-trials/2026-05-field-trial-6.md) tags CRUD
- [x] [#25](https://github.com/hideyukiMORI/nene2-js/issues/25) + [FT7](docs/field-trials/2026-05-field-trial-7.md) live JWT protected
- [x] [#26](https://github.com/hideyukiMORI/nene2-js/issues/26) + [FT8](docs/field-trials/2026-05-field-trial-8.md) live notes CRUD
- [x] [#27](https://github.com/hideyukiMORI/nene2-js/issues/27) + [FT9](docs/field-trials/2026-05-field-trial-9.md) live tags CRUD
- [x] [#29](https://github.com/hideyukiMORI/nene2-js/issues/29) + [FT10–29](docs/field-trials/INDEX.md) marathon
- [ ] [#31](https://github.com/hideyukiMORI/nene2-js/issues/31) + [FT30–129](docs/field-trials/INDEX.md) 100-scenario marathon

## Next Issues

| #   | Title                         |
| --- | ----------------------------- |
| —   | Phase 2 publish / codegen ADR |

## Handoff

- OpenAPI pin: `contracts/openapi.yaml` + `contracts/nene2-openapi-pin.json` (ADR 0002)
- Sync: `npm run contracts:sync` (source: sibling `../NENE2/...` or GitHub raw at pin ref)
- Authoritative author: `../NENE2/docs/openapi/openapi.yaml`
- Do not duplicate MCP server work from `../nene-mcp`
- Field trials: `docs/field-trials/INDEX.md` — FT1–129 (marathon runner: `npm run test:ft-marathon`); next Phase 2 publish
- Evac ports: [ft-evac-ports.md](development/ft-evac-ports.md) — NENE2 `18080`, python `18000`, `./scripts/run-live-smoke-evac.sh`
- Client: `smoke()`, `frameworkSmoke()`, `machineHealth()`, validation helpers; parity [#553](https://github.com/hideyukiMORI/nene2-python/issues/553) open
- Live matrix: `NENE2_JS_*_BASE_URL` → `npm test -- tests/client/live-smoke-matrix.test.ts` (ADR 0003)
- FT friction cycle: report → Issue (owning repo) → PR → close → next FT (ADR 0004)
