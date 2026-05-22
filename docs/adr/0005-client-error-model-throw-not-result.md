# ADR 0005 — Client Error Model (Throw, Not Result)

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** #33

---

## Context

Phase 2 requires a stable public API for `@hideyukimori/nene2-client`. Roadmap listed an open choice: methods that **throw** on non-success HTTP vs returning a **`Result`** (or similar) discriminated union.

FT1–129 and current `createNene2Client` use **throw** via `Nene2ClientError` for failed responses, network errors, and invalid JSON shapes. Consumers already rely on `try/catch`, `instanceof Nene2ClientError`, and `isNene2ClientError`.

## Decision

1. **Keep throw-on-failure** for all client methods in Phase 2.
2. Export **`Nene2ClientError`** and **`isNene2ClientError`** as the primary error surface; attach parsed **`problem`** when the body is Problem Details.
3. **Do not** add a parallel `Result<T, E>` return type or wrapper methods in Phase 2.
4. Document the pattern in README and [howto/consume-client.md](../howto/consume-client.md).
5. **`parseProblemDetailsResponse`**: when `Content-Type` is JSON but the body is not Problem Details, return `undefined` (no throw). Callers use `err.problem` optionally; success-path JSON parsing still throws on shape mismatch (see `request.ts`).
6. Revisit only if a separate ADR proposes an additive opt-in API (e.g. `safeHealth()`) without breaking existing throws.

## Consequences

### Positive

- Matches `fetch` ergonomics and TypeScript `async`/`await` defaults
- Aligns with validation helpers (`validationErrorsFromClientError`)
- No dual API surface to test and publish

### Negative / trade-offs

- Callers must use `try/catch` or `.catch()`; functional-style codebases may prefer `Result`
- Uncaught promise rejections if errors are not handled

## Alternatives considered

- **`Result<T, Nene2ClientError>` everywhere** — rejected for Phase 2: doubles API surface and migration cost with little gain for target Persona A/B apps.
- **HTTP status only, no throw on 503 health** — already addressed with `health({ allowDegraded: true })` (ADR 0004 / FT2); not a global Result model.
