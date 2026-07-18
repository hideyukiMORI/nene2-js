# nene2-js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@hideyukimori/nene2-client.svg)](https://www.npmjs.com/package/@hideyukimori/nene2-client)
[![Node](https://img.shields.io/badge/Node-%3E%3D22%20LTS-339933)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)](https://www.typescriptlang.org/)

TypeScript ecosystem for [NENE2](https://github.com/hideyukiMORI/NENE2): OpenAPI-aligned types, HTTP client helpers, and Problem Details utilities for apps that consume NENE2 JSON APIs.

**Documentation:** https://hideyukimori.github.io/nene2-js/ (English, 日本語, Français, 中文, Português, Deutsch)

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

## Install (consumers)

Use the published package from **your app’s project root** (React/Vite frontend, Node script, etc.). You do **not** clone `nene2-js` or lay it out next to NENE2 for normal usage.

```bash
cd your-app
npm install @hideyukimori/nene2-client@^1.0.0
```

Requires **Node 22+** (native `fetch`) or a browser with `fetch`. TypeScript consumers get `.d.ts` from the package.

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({
  baseUrl: process.env.NENE2_JS_API_BASE_URL!,
});
```

More examples: [howto/consume-client.md](docs/howto/consume-client.md) · [VitePress tutorial](https://hideyukimori.github.io/nene2-js/tutorial/getting-started).

## Develop this repository (contributors)

**Optional** sibling layout when working on **nene2-js itself** (OpenAPI sync, codegen, tests) next to NENE2 — not required to consume the npm package.

```text
../docker/                    # example parent directory
├── NENE2/                    # PHP framework (OpenAPI source: docs/openapi/openapi.yaml)
├── nene2-js/                 # this repository
├── nene-mcp/                 # PHP MCP stdio library (separate concern)
└── NENE2-FT/                 # field-trial reference apps (historical name; see nene2-js-FT)
```

```bash
cd /path/to/parent-of-NENE2
git clone git@github.com:hideyukiMORI/nene2-js.git
cd nene2-js
npm install
npm run check
```

OpenAPI types: `npm run codegen` (see [Phase 3](docs/phase-3.md)).

Point live tests at a running NENE2 API when needed:

```bash
cp .env.example .env
# NENE2_JS_API_BASE_URL=http://localhost:8080
```

## Usage (typed client)

```ts
import { createNene2Client, Nene2ClientError } from '@hideyukimori/nene2-client';

const client = createNene2Client({
  baseUrl: 'http://localhost:8080',
  // apiKey: process.env.NENE2_MACHINE_API_KEY,
  // bearer: process.env.NENE2_BEARER_TOKEN,
});

const { health, ping } = await client.smoke();
const root = await client.frameworkSmoke();
const notes = await client.listNotes({ limit: 20 });

// Load balancers may return 503 with status "degraded" — opt in:
const degraded = await client.health({ allowDegraded: true });

try {
  await client.getNote(1);
} catch (err) {
  if (err instanceof Nene2ClientError && err.problem) {
    console.error(err.problem.title, err.problem.detail);
  }
}
```

Works in Node 22+ and browsers that provide `fetch`.

### Verify the API before live smoke

Port `8080` is not always NENE2. Confirm the canonical health shape:

```bash
curl -sS http://localhost:8080/health | jq .
# expect: { "status": "ok", "service": "NENE2" }
```

Or in TypeScript: `await client.health({ strictService: true })` rejects wrong `service` values.

If you see a different JSON wrapper, point `NENE2_JS_API_BASE_URL` at a running NENE2 PHP instance (sibling `../NENE2`).

**Multi-backend live smoke** (same client, OpenAPI contract — see [ADR 0003](docs/adr/0003-multi-backend-live-verification.md)):

```bash
export NENE2_JS_API_BASE_URL=http://localhost:18080     # NENE2 evac (see ft-evac-ports.md)
export NENE2_JS_PYTHON_BASE_URL=http://localhost:18000  # optional: nene2-python
# export NENE2_JS_NODE_BASE_URL=http://localhost:13000  # optional: nene2-node

npm run verify:backends   # curl /health, /examples/ping, /examples/notes
npm test -- tests/client/live-smoke-matrix.test.ts
```

Unset URLs are skipped; CI runs fixture tests only. Field-trial friction: [ADR 0004](docs/adr/0004-field-trial-friction-resolution-cycle.md).

## Transport headers

Every authenticated request carries the bearer token on **two** headers: the standard `Authorization` **and a non-standard `X-Authorization` mirror**. Both the typed client (`createNene2Client`) and the fleet transport (`createNene2Transport`) apply the mirror on every path — JSON verbs, blob downloads, multipart uploads, raw byte POSTs. Auth headers are applied **after** static and per-request headers, so no caller can drop or overwrite the mirror. **In the current version the mirror cannot be disabled** (`src/transport/headers.ts`, `src/client/request.ts`).

**Why.** Some shared-hosting front proxies and reverse proxies strip the standard `Authorization` header before it reaches the application (observed on HETEML). NENE2 backends fall back to the `X-Authorization` mirror when the standard header is missing, so the mirror keeps auth working behind such proxies.

**Operational note — please read.** Because the bearer is duplicated onto a non-standard header, add **`X-Authorization`** to the credential-masking rules of anything that records or inspects requests: application logs, access logs, WAF rules, and proxy log pipelines. An environment that masks only `Authorization` will otherwise record the bearer token in clear text.

**Planned.** An opt-out flag is _planned_ for a future minor release, and making the mirror **off by default** is _planned_ for a future major release. Until then, treat the mirror as always-on and mask it accordingly.

## Documentation site (local)

```bash
npm install
npm run docs:dev    # http://localhost:5175
npm run docs:build  # static output → .vitepress/dist
```

Published on push to `main` via [.github/workflows/docs.yml](.github/workflows/docs.yml).

## Contributing

Work is **GitHub Issue driven**. Read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) and [docs/workflow.md](docs/workflow.md) before opening a PR.

AI agents: start at [AGENTS.md](AGENTS.md).

Consumer DX evidence: [field trials](docs/field-trials/INDEX.md) (FT30–529 marathon; see [methodology](docs/development/field-trials.md), [friction registry](docs/development/ft-friction-registry.md)). Local app sandbox: sibling `../nene2-js-FT/`. Quick start: [howto/consume-client.md](docs/howto/consume-client.md).

**Release:** [releases.md](docs/development/releases.md) · [publish.md](docs/development/publish.md) · [GitHub Releases](https://github.com/hideyukiMORI/nene2-js/releases) · Phase history: [phase-2.md](docs/phase-2.md).

## Related projects

| Project                                                                 | Role                                                     |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [NENE2](https://github.com/hideyukiMORI/NENE2)                          | PHP API framework, OpenAPI contract, MCP catalog in-repo |
| [nene2-node](https://github.com/hideyukiMORI/nene2-node)                | Node.js framework port (`@hideyukimori/nene2-framework`) |
| [nene-mcp](https://github.com/hideyukiMORI/nene-mcp)                    | Standalone PHP stdio MCP server                          |
| [hideyukimori/nene2](https://packagist.org/packages/hideyukimori/nene2) | Composer package for PHP consumers                       |

## License

MIT — see [LICENSE](LICENSE).
