# Phase 2 — Typed client (publish path)

**Status:** complete (2026-05-22)  
**Tracking Issue:** [#33](https://github.com/hideyukiMORI/nene2-js/issues/33)  
**ADR:** [0005 — throw, not Result](adr/0005-client-error-model-throw-not-result.md)

Phase 1 delivered contract pin, Problem Details, `createNene2Client` for documented example endpoints, and FT1–129 evidence. Phase 2 makes the package **consumable outside the monorepo** and documents browser/Node usage for publish.

## Exit criteria

- [x] `npm run build` emits `dist/` with declarations and `package.json` `exports`
- [x] `private: false` and version `0.1.0` when API frozen
- [x] README + howto cover install from npm (not only sibling clone)
- [x] CI runs build; publish workflow documented (manual + workflow_dispatch)
- [x] Pack smoke script against tarball (`npm run pack:smoke`)

## Work breakdown

| Step | Owner    | Notes                                                                                   |
| ---- | -------- | --------------------------------------------------------------------------------------- |
| 1    | nene2-js | ADR 0005 accepted — throw model locked                                                  |
| 2    | nene2-js | `tsconfig.build.json` + `build` script → `dist/`                                        |
| 3    | nene2-js | `package.json` `exports`, `files`, `types`                                              |
| 4    | nene2-js | README: npm install, Node 22+, browser `fetch`                                          |
| 5    | nene2-js | First npm publish — [publish.md](development/publish.md)                                |
| 6    | nene2-js | `publish.yml` — npm + git tag + GitHub Release ([releases.md](development/releases.md)) |

## Known issues (tracked, not Phase 2 blockers)

| Item                           | Repo         | Issue                                                           | Action                                                                           |
| ------------------------------ | ------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| nene2-python ping/notes parity | nene2-python | [#553](https://github.com/hideyukiMORI/nene2-python/issues/553) | Live matrix skips or fails when `NENE2_JS_PYTHON_BASE_URL` set; client unchanged |
| OpenAPI codegen                | nene2-js     | [#37](https://github.com/hideyukiMORI/nene2-js/issues/37)       | **Resolved** — Phase 3 complete; see [phase-3.md](phase-3.md)                    |
| Port 8080 not NENE2            | docs         | —                                                               | [ft-evac-ports.md](development/ft-evac-ports.md), README health curl check       |

## Non-goals (Phase 2)

- Node HTTP server / framework port
- MCP server duplication
- Full OpenAPI codegen (Phase 3)

See [roadmap.md](roadmap.md) for phase overview.
