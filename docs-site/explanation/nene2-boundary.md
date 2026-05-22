# Relationship to NENE2

## Roles

| Repository       | Responsibility                              |
| ---------------- | ------------------------------------------- |
| **NENE2**        | PHP runtime, OpenAPI authoring, MCP catalog |
| **nene2-js**     | TypeScript consumer SDK                     |
| **nene2-python** | Python parity port                          |
| **nene-mcp**     | PHP stdio MCP (separate from this client)   |

## Contract flow

1. NENE2 changes `docs/openapi/openapi.yaml`.
2. nene2-js syncs `contracts/openapi.yaml` and regenerates types.
3. Apps upgrade `@hideyukimori/nene2-client` when ready.

**OpenAPI wins** — if the server matches the contract, fix the client; if the server diverges, fix the server or the contract in NENE2 first.

## What not to copy here

- PHP `src/`, migrations, Compose for the PHP app
- MCP stdio server implementation
- Application domain logic

See also [Ecosystem map](/integrations/ecosystem).
