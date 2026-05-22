# Roadmap

nene2-js is the TypeScript companion to [NENE2](https://github.com/hideyukiMORI/NENE2). Phases are Issue-driven; update this file when scope or priority changes.

## Phase 0 — Governance

**Goal:** repository bootstrap with clear scope and the same collaboration model as NENE2.

- [x] README, LICENSE, scope, workflow, commit conventions
- [x] AGENTS.md and AI tooling policy
- [x] ADR 0001 — relationship to NENE2 and nene-mcp
- [x] GitHub repository + Issue-driven workflow
- [x] Initial Issues for Phase 1 deliverables

## Phase 1 — Contract baseline (complete)

**Goal:** pin OpenAPI input and prove TypeScript can track NENE2 health/ping and example endpoints.

- [x] OpenAPI revision pin policy (`contracts/`, ADR 0002, `npm run contracts:sync|check`)
- [x] Minimal types for system + example routes + `createNene2Client`
- [x] Problem Details type guards for RFC 9457 subset used by NENE2
- [x] Field trials FT1–129 + marathon runner (`npm run test:ft-marathon`)
- [x] Vitest tests with fixture JSON (no live server required in CI)

## Phase 2 — Typed client (current)

**Goal:** publish-quality `@hideyukimori/nene2-client` surface for documented example endpoints.

**Kickoff:** [docs/phase-2.md](phase-2.md) · **ADR:** [0005 throw model](adr/0005-client-error-model-throw-not-result.md)

- [x] `createNene2Client({ baseUrl, apiKey?, bearer?, signal? })` — implemented in Phase 1
- [x] Error model: throw `Nene2ClientError` (ADR 0005)
- [ ] `npm run build` → `dist/` + `package.json` exports
- [ ] README usage for browser and Node + npm install
- [ ] `private: false` and first `0.1.0` npm publish when API stable

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
