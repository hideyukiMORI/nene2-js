# Ecosystem map

```text
  [NENE2 PHP]  ──OpenAPI──►  openapi.yaml
        ▲                         │
        │ HTTP                    ▼
  [Your TS app]  ◄──uses──  [@hideyukimori/nene2-client]
        │
        └── optional ──► [nene-mcp] (stdio, PHP)
```

## Documentation sites

| Project      | Docs                                         |
| ------------ | -------------------------------------------- |
| NENE2 (PHP)  | https://hideyukimori.github.io/NENE2/        |
| nene2-python | https://hideyukimori.github.io/nene2-python/ |
| **nene2-js** | this site                                    |

## Repositories

- [nene2-js](https://github.com/hideyukiMORI/nene2-js) — TypeScript client (you are here)
- [NENE2](https://github.com/hideyukiMORI/NENE2) — contract source + PHP runtime
- [nene-mcp](https://github.com/hideyukiMORI/nene-mcp) — MCP stdio server
- [nene2-python](https://github.com/hideyukiMORI/nene2-python) — Python parity
- [nene2-node](https://github.com/hideyukiMORI/nene2-node) — Node framework port

## Contributor docs

Issue workflow, ADRs, and field-trial reports live in the Git repository under `docs/` (not all pages are mirrored on this site).
