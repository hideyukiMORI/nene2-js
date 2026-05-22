# Current work

Last updated: 2026-05-22 (ADR 0002 OpenAPI pin)

## Active

- [x] Bootstrap at `/home/xi/docker/nene2-js` (sibling of `NENE2`)
- [x] GitHub: https://github.com/hideyukiMORI/nene2-js
- [x] `npm run check` passes locally
- [x] [#1](https://github.com/hideyukiMORI/nene2-js/issues/1) ADR 0002 — OpenAPI pin (`contracts/`, `contracts:sync|check`)

## Next Issues

| #                                                       | Title                                |
| ------------------------------------------------------- | ------------------------------------ |
| [#2](https://github.com/hideyukiMORI/nene2-js/issues/2) | Problem Details 型ガード（RFC 9457） |
| [#3](https://github.com/hideyukiMORI/nene2-js/issues/3) | health / ping の typed client        |

## Handoff

- OpenAPI pin: `contracts/openapi.yaml` + `contracts/nene2-openapi-pin.json` (ADR 0002)
- Sync: `npm run contracts:sync` (source: sibling `../NENE2/...` or GitHub raw at pin ref)
- Authoritative author: `../NENE2/docs/openapi/openapi.yaml`
- Do not duplicate MCP server work from `../nene-mcp`
