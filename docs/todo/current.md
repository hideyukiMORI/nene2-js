# Current work

Last updated: 2026-05-22 (FT6 tags client)

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

## Next Issues

| #   | Title               |
| --- | ------------------- |
| —   | FT7: live JWT smoke |

## Handoff

- OpenAPI pin: `contracts/openapi.yaml` + `contracts/nene2-openapi-pin.json` (ADR 0002)
- Sync: `npm run contracts:sync` (source: sibling `../NENE2/...` or GitHub raw at pin ref)
- Authoritative author: `../NENE2/docs/openapi/openapi.yaml`
- Do not duplicate MCP server work from `../nene-mcp`
- Field trials: `docs/field-trials/INDEX.md` — FT6 candidate: tags or live JWT on evac port
- Evac ports: [ft-evac-ports.md](development/ft-evac-ports.md) — NENE2 `18080`, python `18000`, `./scripts/run-live-smoke-evac.sh`
- Client: full notes CRUD + `getProtected()`; parity [#553](https://github.com/hideyukiMORI/nene2-python/issues/553) open
- Live matrix: `NENE2_JS_*_BASE_URL` → `npm test -- tests/client/live-smoke-matrix.test.ts` (ADR 0003)
- FT friction cycle: report → Issue (owning repo) → PR → close → next FT (ADR 0004)
