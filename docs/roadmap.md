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

## Phase 2 — Typed client (complete)

**Goal:** publish-quality `@hideyukimori/nene2-client` surface for documented example endpoints.

**Docs:** [phase-2.md](phase-2.md) · [publish.md](development/publish.md) · **ADR:** [0005 throw model](adr/0005-client-error-model-throw-not-result.md)

- [x] `createNene2Client({ baseUrl, apiKey?, bearer?, signal? })`
- [x] Error model: throw `Nene2ClientError` (ADR 0005)
- [x] `npm run build` → `dist/` + `package.json` exports
- [x] README + howto npm install; `0.1.0`, `private` removed
- [x] CI build + `pack:smoke`; registry publish via [publish.md](development/publish.md)

## Phase 3 — Codegen (complete)

**Goal:** reduce hand-written drift for large OpenAPI surfaces.

**Docs:** [phase-3.md](phase-3.md) · **ADR:** [0006 types only](adr/0006-openapi-codegen-types-only.md)

- [x] `npm run codegen` / `codegen:check` → `src/generated/openapi.ts`
- [x] `src/types/schemas.ts` re-exports from generated schemas
- [x] PR template: contract bump → `codegen`

## Non-goals

- Node.js reimplementation of NENE2 server stack
- Replacing nene-mcp
- Hosting consumer application code

See `docs/scope.md` for the authoritative boundary list.

## 1.0.0 criteria (planned)

Ship **`1.0.0`** when all of the following hold:

1. Public client surface stable for two minor releases without breaking changes (except OpenAPI-driven optional fields).
2. Documented error model: HTTP errors + `status: 0` network/abort (Issue #79).
3. `timeoutMs` + `signal` documented; rate-limit headers on `Nene2ClientError` (#80); retry policy remains consumer/ADR scope.
4. OpenAPI pin + codegen types exported on npm; hand guards migration per ADR 0006 follow-up.
5. Consumer sandbox (nene2-js-FT) matrix green on NENE2 + nene2-python evac ports.

Until then, **`0.x`** — pin exact version in production apps and read [production-readiness.md](development/production-readiness.md).
