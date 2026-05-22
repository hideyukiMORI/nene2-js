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
- Multi-backend live smoke: `docs/adr/0003-multi-backend-live-verification.md`
- Field trials: `docs/development/field-trials.md`, `docs/field-trials/INDEX.md`, ADR 0004 friction cycle
- Roadmap: `docs/roadmap.md`
- Current work: `docs/todo/current.md`

## Operating rules

- Work from GitHub Issues. Create an Issue before implementation or doc changes that affect policy.
- Do not commit directly to `main`. Branch: `type/issue-number-summary`.
- Keep `docs/todo/current.md` aligned with Issues and PRs.
- One focused change per PR — no mixed codegen + unrelated refactors.
- Do not commit secrets, `.env`, or generated `dist/` unless release policy changes.
- **Do not** add a Node HTTP framework or duplicate nene-mcp MCP server behavior.
- **Field trials:** record friction in the FT report → Issue in the **owning repo** → fix PR → close Issues → then next FT (ADR 0004). Server bugs go to NENE2 / nene2-python / nene2-node, not nene2-js workarounds.

## Project direction

TypeScript companion to NENE2:

- OpenAPI-aligned types and client helpers
- RFC 9457 Problem Details utilities
- strict, testable, AI-readable modules
- Published package `@hideyukimori/nene2-client` (`0.1.0+`); see `docs/development/publish.md`

PHP runtime and OpenAPI authoring stay in [NENE2](https://github.com/hideyukiMORI/NENE2).

## Local commands

```bash
npm install
npm run check    # type-check, lint, format, contracts, codegen:check, build, test, pack:smoke
npm run build    # dist/ only (not committed)
npm run codegen  # src/generated/openapi.ts from contracts/openapi.yaml
```

Optional live smoke (NENE2 running on :8080):

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
```
