# nene2-js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D22%20LTS-339933)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)](https://www.typescriptlang.org/)

TypeScript ecosystem for [NENE2](https://github.com/hideyukiMORI/NENE2): OpenAPI-aligned types, HTTP client helpers, and Problem Details utilities for apps that consume NENE2 JSON APIs.

**This repository is not a Node.js port of the PHP framework.** The PHP runtime stays in [NENE2](https://github.com/hideyukiMORI/NENE2). MCP stdio servers in PHP live in [nene-mcp](https://github.com/hideyukiMORI/nene-mcp).

## What this repo is for

- Typed fetch wrappers and shared client boundaries derived from NENE2 OpenAPI
- RFC 9457 Problem Details parsing and validation-error helpers for TypeScript consumers
- Optional codegen scripts and published npm packages (`@hideyukimori/nene2-client`, scoped subpackages later)
- Documentation and tooling that follow the same Issue-driven workflow as NENE2

## What this repo is not for

- Replacing NENE2 PHP HTTP runtime, routing, middleware, or DI
- Duplicating [nene-mcp](https://github.com/hideyukiMORI/nene-mcp) (stdio MCP server in PHP)
- React/Vite starter UI (that remains in NENE2 `frontend/` unless explicitly extracted later)
- Direct database access from AI tools or SDK code
- Application-specific business logic (belongs in consumer projects and [NENE2-FT](https://github.com/hideyukiMORI/NENE2-FT) style trials)

See [docs/scope.md](docs/scope.md) for the full in-scope / out-of-scope matrix.

## Local layout (sibling of NENE2)

```text
../docker/
├── NENE2/          # PHP framework (contract source: docs/openapi/openapi.yaml)
├── nene2-js/       # this repository
├── nene-mcp/       # PHP MCP stdio library (separate concern)
└── NENE2-FT/       # field-trial reference apps
```

Clone next to your existing NENE2 checkout:

```bash
cd /path/to/parent-of-NENE2
git clone git@github.com:hideyukiMORI/nene2-js.git
cd nene2-js
npm install
npm run check
```

Point local development at a running NENE2 API when needed:

```bash
cp .env.example .env
# NENE2_JS_API_BASE_URL=http://localhost:8080
```

## Contributing

Work is **GitHub Issue driven**. Read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) and [docs/workflow.md](docs/workflow.md) before opening a PR.

AI agents: start at [AGENTS.md](AGENTS.md).

## Related projects

| Project                                                                 | Role                                                     |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [NENE2](https://github.com/hideyukiMORI/NENE2)                          | PHP API framework, OpenAPI contract, MCP catalog in-repo |
| [nene-mcp](https://github.com/hideyukiMORI/nene-mcp)                    | Standalone PHP stdio MCP server                          |
| [hideyukimori/nene2](https://packagist.org/packages/hideyukimori/nene2) | Composer package for PHP consumers                       |

## License

MIT — see [LICENSE](LICENSE).
