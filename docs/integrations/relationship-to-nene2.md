# Relationship to NENE2

## Roles

| Repository     | Responsibility                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **NENE2**      | PHP HTTP runtime, OpenAPI authoring, MCP catalog, examples, `frontend/` starter                                         |
| **nene2-js**   | TypeScript types and client libraries for consumers of NENE2 APIs                                                       |
| **nene2-node** | Node.js framework port (`@hideyukimori/nene2-framework`) — see [nene2-node](https://github.com/hideyukiMORI/nene2-node) |
| **nene-mcp**   | PHP stdio MCP server (framework-agnostic, NENE2-compatible catalog format)                                              |

## Contract flow

1. NENE2 adds or changes an endpoint → updates `docs/openapi/openapi.yaml` and tests.
2. nene2-js opens an Issue to sync types/client (may depend on NENE2 release tag).
3. Consumer apps upgrade `@hideyukimori/nene2-client` when ready.

## Local development paths

Default sibling layout:

```text
../NENE2/                    # git clone
../nene2-js/                 # this repo
```

Environment variables (this repo):

| Variable                | Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `NENE2_JS_API_BASE_URL` | Base URL for optional live smoke (e.g. `http://localhost:8080`)                    |
| `NENE2_JS_OPENAPI_PATH` | Optional path for `contracts:sync` (default: `../NENE2/docs/openapi/openapi.yaml`) |
| (committed)             | `contracts/openapi.yaml` — pinned copy for CI/tests (ADR 0002)                     |

NENE2 machine client variables (`NENE2_MACHINE_API_KEY`, `NENE2_LOCAL_JWT_SECRET`) are documented in NENE2; this SDK only forwards them when configured — never commit values.

## What not to copy into nene2-js

- `src/` PHP framework code
- `tools/local-mcp-server.php` (use nene-mcp or NENE2 tools instead)
- Database migrations, Phinx, Docker Compose for PHP app runtime

## References

- NENE2 OpenAPI: https://github.com/hideyukiMORI/NENE2/blob/main/docs/openapi/openapi.yaml
- NENE2 AGENTS.md: https://github.com/hideyukiMORI/NENE2/blob/main/AGENTS.md
