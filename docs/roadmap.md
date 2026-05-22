# Roadmap

nene2-js is the TypeScript companion to [NENE2](https://github.com/hideyukiMORI/NENE2). Phases are Issue-driven; update this file when scope or priority changes.

## Phase 0 — Governance (current)

**Goal:** repository bootstrap with clear scope and the same collaboration model as NENE2.

- [x] README, LICENSE, scope, workflow, commit conventions
- [x] AGENTS.md and AI tooling policy
- [x] ADR 0001 — relationship to NENE2 and nene-mcp
- [ ] GitHub repository + default branch protection (when ready)
- [ ] Initial Issues for Phase 1 deliverables

## Phase 1 — Contract baseline

**Goal:** pin OpenAPI input and prove TypeScript can track NENE2 health/ping shapes.

- [x] OpenAPI revision pin policy (`contracts/`, ADR 0002, `npm run contracts:sync|check`)
- Minimal types for `GET /health` and `GET /examples/ping`
- [x] Problem Details type guards for RFC 9457 subset used by NENE2
- [x] Light field-trial process + FT1 report (`docs/development/field-trials.md`)
- Vitest tests with fixture JSON (no live server required in CI)

## Phase 2 — Typed client

**Goal:** publish-quality `@hideyukimori/nene2-client` surface for documented example endpoints.

- `createNene2Client({ baseUrl, apiKey?, bearer? })`
- Typed errors throwing or returning `Result` — decide in ADR
- README usage examples for browser and Node
- `private: false` and first `0.1.0` npm publish when API stable

## Phase 3 — Codegen (optional)

**Goal:** reduce hand-written drift for large OpenAPI surfaces.

- codegen script from pinned OpenAPI
- CI check: generated output matches committed files
- Document when to hand-edit vs generate

## Non-goals

- Node.js reimplementation of NENE2 server stack
- Replacing nene-mcp
- Hosting consumer application code

See `docs/scope.md` for the authoritative boundary list.
