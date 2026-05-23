# Scope — nene2-js

This document defines what **nene2-js** owns, what it delegates to sibling repositories, and what consumer applications must own themselves.

## Mission

Make NENE2 JSON APIs pleasant and type-safe in TypeScript without turning this repo into a second framework runtime.

The contract source of truth remains **NENE2** `docs/openapi/openapi.yaml`. This repository tracks that contract with tests and releases on its own semver schedule once packages are published.

## In scope

| Area                    | Examples                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **HTTP client surface** | Typed `fetch` wrappers, base URL config, auth header helpers (`Bearer`, `X-NENE2-API-Key`)                          |
| **OpenAPI alignment**   | Generated types and schema guards from pinned OpenAPI; drift checks via `codegen:check` and `codegen:guards:check`  |
| **Problem Details**     | Parse `application/problem+json`; map `validation-failed` to structured errors                                      |
| **Shared DX**           | `.env.example`, local smoke scripts against `NENE2_JS_API_BASE_URL`                                                 |
| **Documentation**       | Issue-driven workflow, ADRs, roadmap, AI agent entry (`AGENTS.md`)                                                  |
| **npm packages**        | `@hideyukimori/nene2-client` (primary); optional `@hideyukimori/nene2-problem-details` etc. when split is justified |

## Out of scope

| Area                                          | Owner instead                                            |
| --------------------------------------------- | -------------------------------------------------------- |
| PHP HTTP runtime, routing, middleware, DI     | [NENE2](https://github.com/hideyukiMORI/NENE2)           |
| stdio MCP server (PHP)                        | [nene-mcp](https://github.com/hideyukiMORI/nene-mcp)     |
| In-repo MCP catalog authoring                 | NENE2 `docs/mcp/tools.json`                              |
| React/Vite SPA starter                        | NENE2 `frontend/` (may consume packages from here later) |
| Domain use cases, repositories, migrations    | Consumer apps / NENE2-FT trials                          |
| Direct DB access from SDK or AI tooling       | Forbidden — API boundary only                            |
| Production deployment guides for PHP apps     | NENE2 docs                                               |
| Re-implementing NENE2 server behavior in Node | Non-goal                                                 |

## Boundary rules

1. **No server framework in Node** — no Express/Fastify “NENE2 clone”; only client and tooling libraries.
2. **OpenAPI wins** — if TypeScript types disagree with NENE2 OpenAPI, fix types or coordinate an NENE2 contract change; do not invent parallel API shapes.
3. **Secrets stay in env** — never commit tokens, `.env`, or consumer credentials.
4. **Small PRs** — one Issue, one focused change; do not mix codegen rollout with unrelated lint fixes.
5. **Browser and Node** — prefer APIs that work in both unless an ADR documents a Node-only tool (CLI, file IO).

## Relationship diagram

```text
  [NENE2 PHP app]  --OpenAPI-->  contract (yaml)
         ^                            |
         | HTTP                       v
  [Consumer TS app]  <--uses--  [nene2-js packages]
         |
         +-- optional --> [nene-mcp] (stdio, PHP) for AI tools
```

## Versioning

- **`1.0.0`** — first stable `@hideyukimori/nene2-client` on npm and [GitHub Release `v1.0.0`](https://github.com/hideyukiMORI/nene2-js/releases/tag/v1.0.0) ([#84](https://github.com/hideyukiMORI/nene2-js/issues/84)); semver applies to the public client surface.
- **Every publish** — git tag `vX.Y.Z` + GitHub Release (CHANGELOG body); see [releases.md](development/releases.md).
- **Major** bumps align with breaking OpenAPI or client API changes; document NENE2 contract mapping in [CHANGELOG.md](../CHANGELOG.md).
- **Minor / patch** — additive client features or fixes; OpenAPI optional fields may evolve per [ADR 0002](adr/0002-openapi-pin-policy.md).
- OpenAPI input is pinned under `contracts/` with `npm run contracts:sync|check` and codegen drift gates (`codegen:check`, `codegen:guards:check`).

## When to open an Issue here vs NENE2

| Change                                               | Repository                      |
| ---------------------------------------------------- | ------------------------------- |
| New public JSON endpoint or Problem Details type URI | NENE2 first, then nene2-js sync |
| Typed client for existing documented endpoint        | nene2-js                        |
| MCP tool catalog or PHP middleware                   | NENE2 or nene-mcp               |
| ESLint/Prettier/tsconfig for TS packages only        | nene2-js                        |
