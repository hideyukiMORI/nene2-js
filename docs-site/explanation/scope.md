# Scope & mission

**nene2-js** makes NENE2 JSON APIs pleasant and type-safe in TypeScript without becoming a second framework runtime.

## In scope

| Area              | Examples                                             |
| ----------------- | ---------------------------------------------------- |
| HTTP client       | `createNene2Client`, auth headers, `fetch` injection |
| OpenAPI alignment | Pinned contract, codegen, drift checks               |
| Problem Details   | RFC 9457 parse + validation helpers                  |
| npm packages      | `@hideyukimori/nene2-client`                         |

## Out of scope

| Area                | Owner                                                    |
| ------------------- | -------------------------------------------------------- |
| PHP HTTP runtime    | [NENE2](https://github.com/hideyukiMORI/NENE2)           |
| stdio MCP server    | [nene-mcp](https://github.com/hideyukiMORI/nene-mcp)     |
| Node framework port | [nene2-node](https://github.com/hideyukiMORI/nene2-node) |
| Direct DB from SDK  | Forbidden — API boundary only                            |

Full matrix: [docs/scope.md](https://github.com/hideyukiMORI/nene2-js/blob/main/docs/scope.md) in the repository.
