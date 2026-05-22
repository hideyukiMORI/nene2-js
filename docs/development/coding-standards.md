# Coding Standards

## TypeScript baseline

- **Strict** mode enabled in `tsconfig.json`.
- Prefer `readonly` properties and narrow types over `any`.
- Use explicit exports from package entry points (`src/index.ts` when added).
- Avoid default exports for library public API unless an ADR says otherwise.

## Architecture

- **Client-only** — no HTTP server framework in this repository.
- **OpenAPI-aligned** — response types must match NENE2 OpenAPI schemas for documented endpoints.
- **Problem Details** — parse errors with dedicated helpers; do not leak stack traces or secrets in thrown messages.
- **Environment** — read `process.env` only in config/bootstrap modules, not in pure parsers.

## File layout (target)

```text
contracts/      # pinned openapi.yaml (ADR 0002) — do not hand-edit
src/
  client/       # fetch wrapper and request helpers
  problem/      # RFC 9457 parsing
  types/        # shared types (generated or hand-written)
tests/
  fixtures/     # JSON fixtures from OpenAPI examples
tools/          # contracts:sync, codegen scripts (Phase 3)
```

## Testing

- Use **Vitest** for unit tests.
- Prefer fixture JSON over live HTTP in CI.
- Optional live smoke against `NENE2_JS_API_BASE_URL` for local/manual runs only.

## Dependencies

- Minimize runtime dependencies.
- Pin dev tooling (TypeScript, ESLint, Prettier) in `package-lock.json`.
- Target active Node.js LTS (`engines` in `package.json`).

## Documentation comments

- Use TSDoc on **public** exports and non-obvious behavior.
- Do not repeat types already expressed in TypeScript signatures.
