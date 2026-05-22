# Current work

Last updated: 2026-05-22 (field trials introduced)

## Active

- [x] Bootstrap at `/home/xi/docker/nene2-js` (sibling of `NENE2`)
- [x] GitHub: https://github.com/hideyukiMORI/nene2-js
- [x] `npm run check` passes locally
- [x] [#1](https://github.com/hideyukiMORI/nene2-js/issues/1) ADR 0002 — OpenAPI pin (`contracts/`, `contracts:sync|check`)
- [x] [#2](https://github.com/hideyukiMORI/nene2-js/issues/2) Problem Details guards (`src/problem/`)
- [x] Field trial framework + [FT1](docs/field-trials/2026-05-field-trial-1.md)
- [x] [#3](https://github.com/hideyukiMORI/nene2-js/issues/3) + [FT2](docs/field-trials/2026-05-field-trial-2.md) health / ping client

## Next Issues

| #   | Title                            |
| --- | -------------------------------- |
| —   | (next) Note client or auth smoke |

## Handoff

- OpenAPI pin: `contracts/openapi.yaml` + `contracts/nene2-openapi-pin.json` (ADR 0002)
- Sync: `npm run contracts:sync` (source: sibling `../NENE2/...` or GitHub raw at pin ref)
- Authoritative author: `../NENE2/docs/openapi/openapi.yaml`
- Do not duplicate MCP server work from `../nene-mcp`
- Field trials: `docs/field-trials/INDEX.md` — FT3 candidate: notes or protected route
- Client: `createNene2Client({ baseUrl }).health()` / `.ping()`
