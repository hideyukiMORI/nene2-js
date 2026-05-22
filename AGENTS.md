# Agent / AI Guide

Entry point for AI agents working on **nene2-js**.

## Read first

- Scope (mandatory): `docs/scope.md`
- Collaboration: `docs/CONTRIBUTING.md`
- Workflow: `docs/workflow.md`
- Coding standards: `docs/development/coding-standards.md`
- Commits: `docs/development/commit-conventions.md`
- NENE2 boundary: `docs/integrations/relationship-to-nene2.md`
- OpenAPI pin: `docs/adr/0002-openapi-contract-pin-policy.md`, `contracts/`
- Roadmap: `docs/roadmap.md`
- Current work: `docs/todo/current.md`

## Operating rules

- Work from GitHub Issues. Create an Issue before implementation or doc changes that affect policy.
- Do not commit directly to `main`. Branch: `type/issue-number-summary`.
- Keep `docs/todo/current.md` aligned with Issues and PRs.
- One focused change per PR — no mixed codegen + unrelated refactors.
- Do not commit secrets, `.env`, or generated `dist/` unless release policy changes.
- **Do not** add a Node HTTP framework or duplicate nene-mcp MCP server behavior.

## Project direction

TypeScript companion to NENE2:

- OpenAPI-aligned types and client helpers
- RFC 9457 Problem Details utilities
- strict, testable, AI-readable modules
- npm publish path for `@hideyukimori/nene2-client` when stable

PHP runtime and OpenAPI authoring stay in [NENE2](https://github.com/hideyukiMORI/NENE2).

## Local commands (after devDependencies in Phase 1)

```bash
npm install
npm run check
```

Optional live smoke (NENE2 running on :8080):

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
```
