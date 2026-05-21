# Scope — nene2-js

This document defines what **nene2-js** owns, what it delegates to sibling repositories, and what consumer applications must own themselves.

## Mission

Make NENE2 JSON APIs pleasant and type-safe in TypeScript without turning this repo into a second framework runtime.

The contract source of truth remains **NENE2** `docs/openapi/openapi.yaml`. This repository tracks that contract with tests and releases on its own semver schedule once packages are published.

## In scope

| Area                    | Examples                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **HTTP client surface** | Typed `fetch` wrappers, base URL config, auth header helpers (`Bearer`, `X-NENE2-API-Key`)                          |
| **OpenAPI alignment**   | Generated or hand-maintained TypeScript types; drift checks against a pinned OpenAPI revision                       |
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

## Versioning (planned)

- `0.x` while public package API is forming.
- Align **major** bumps with breaking OpenAPI or client surface changes; document mapping to NENE2 release tags in CHANGELOG.
- Pin OpenAPI input revision in codegen config when codegen lands (ADR follow-up).

## When to open an Issue here vs NENE2

| Change                                               | Repository                      |
| ---------------------------------------------------- | ------------------------------- |
| New public JSON endpoint or Problem Details type URI | NENE2 first, then nene2-js sync |
| Typed client for existing documented endpoint        | nene2-js                        |
| MCP tool catalog or PHP middleware                   | NENE2 or nene-mcp               |
| ESLint/Prettier/tsconfig for TS packages only        | nene2-js                        |
