# Changelog

All notable changes to this project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- `mirrorAuthorizationHeader?: boolean` on both `Nene2TransportConfig` and `Nene2ClientConfig` — opt out of the non-standard `X-Authorization` mirror ([#119](https://github.com/hideyukiMORI/nene2-js/issues/119), audit A-3). Default `true` keeps the existing fleet posture (bearer on both `Authorization` and `X-Authorization`, for proxies that strip the standard header); `false` sends `Authorization` only. Construction-time switch — no per-request override, no behavior change for existing consumers. See the README **Transport headers** section.

### Documentation

- README / SECURITY **Transport headers**: document the opt-out flag and mark it available since 1.3.0; generalize the mirror rationale (no specific hosting-vendor name).

## [1.2.0] - 2026-07-16

Opt-in silent re-authentication for the transport ([#107](https://github.com/hideyukiMORI/nene2-js/issues/107), [ADR 0008](docs/adr/0008-recover-auth-seam.md)). Additive — no breaking changes to the 1.1.0 surface; the default behavior is unchanged.

### Added

- `Nene2TransportConfig.recoverAuth?: () => Promise<boolean>` — opt-in hook called on a 401 for an authenticated request **before** the token is cleared. Return `true` once a fresh token has been seated (the transport then replays the original request **once**), or `false`/throw to fail closed (clear token + `onUnauthorized`, the 1.1.0 default). Default `undefined` keeps the fail-closed 401 policy unchanged. The refresh mechanics (endpoint, CSRF, body) stay in the app; the transport owns single-flight + one replay + no-recursion.
- `Nene2Transport.recover(): Promise<boolean>` — runs `recoverAuth` through the transport's shared single-flight and reports whether a token was seated. An app-start session probe must call this (not `recoverAuth` directly) so the probe and any concurrent 401-retry collapse into one refresh — a refresh-token-rotation reuse-defense requirement (concurrent `/auth/refresh` would trip server-side family revocation). Resolves `false` when no `recoverAuth` is configured.

### Documentation

- `howto/migrate-product-client` — migrate a product `apiClient` onto the transport seam: thin adapter (preserve verb signatures), token-store posture (sessionStorage vs in-memory adapter), refresh mechanics → `recoverAuth`, boot probe → `recover()`, and the promotion gate (path-mode: wire but don't enable until the `_work/issues.md #38` cookie-`Path` root fix).

## [1.1.0] - 2026-07-14

Fleet-standard frontend transport ([#102](https://github.com/hideyukiMORI/nene2-js/issues/102)): one correct implementation of the request plumbing every nene-\* product used to hand-write. Additive — no breaking changes to the 1.0.0 surface.

### Added

- `createNene2Transport()` — generic authenticated transport for product frontends: JSON `get/post/put/patch/delete`, blob downloads (`getBlob` / `postBlob` with `Content-Disposition` filename), multipart `upload` (browser-set boundary), raw-body `postCsv` / `postBytes` (Shift_JIS-safe; `alsoOkStatuses` for 422 import reports).
- `X-Authorization` mirror built in: every transport path builds auth headers in a single choke point (the nene-deal #83 pattern), so no caller can drop the mirror that HETEML-class proxies require. `createNene2Client` bearer requests now send the mirror too.
- `createSessionTokenStore()` — fleet-standard token store: `sessionStorage` under an app-specified key, in-memory fallback outside browsers, `set/get/clear` + `subscribe`, fail-closed on storage errors. No API carries the token in a URL.
- 401/403 hooks: on an authenticated 401 the store is cleared and `onUnauthorized` fires (a credentials 401 without a token does neither); `onForbidden` fires on 403; `clearTokenOnStatuses` opts into 403 sign-out. Side effects (redirects) stay in the app.
- Errors map to `Nene2ClientError` with RFC 9457 Problem Details — API errors are never surfaced as HTML.
- Package-side unit tests for the fleet invariants (`tests/transport/`), the canonical home of the cross-product client test policy.

### Documentation

- Reference `reference/transport` and migration guide `howto/migrate-product-client` (thin adapter + mapping tables from nene-vault / nene-clear / nene-deal / nene-invoice) — EN/JA; other locales follow.

## [1.0.0] - 2026-05-23

First stable release. Roadmap 1.0.0 criteria satisfied ([#84](https://github.com/hideyukiMORI/nene2-js/issues/84)): public API additive-only across 0.1.2–0.1.4; error model, timeout/rate-limit, OpenAPI codegen + guard migration, nene2-js-FT matrix green.

### Added

- ADR 0007 — OpenAPI guard codegen (Ajv standalone, #86 Phase A).
- `npm run codegen:guards` → `src/generated/guards.ts`; `codegen:guards:check` in CI (#86 Phase B).
- Hand `is*` guards delegate to generated validators (Phase C migration).

### Documentation

- VitePress `howto/openapi-codegen.md` — all 6 locales document `codegen:guards` (#86).

## [0.1.4] - 2026-05-22

### Added

- `Nene2ClientError.rateLimit` — `Retry-After` and `X-RateLimit-*` parsed from error responses (Issue #80).
- Export `RateLimitInfo` type and `parseRateLimitHeaders()` helper.

## [0.1.3] - 2026-05-22

### Added

- Export `OpenApiPaths` and `OpenApiSchemas` from the public package entry (Issue #77).
- `pack:smoke` asserts `OpenApiPaths` / `OpenApiSchemas` in the published tarball.
- `timeoutMs` on `Nene2ClientConfig` — per-request `AbortSignal.timeout` (Issue #79).
- Network / abort failures from `fetch` wrapped in `Nene2ClientError` with `status: 0` (Issue #79).

### Fixed

- JSDoc placement for `Nene2ClientError` and `isNene2ClientError`.

### Documentation

- [production-readiness.md](docs/development/production-readiness.md) — commercial use honest assessment.

## [0.1.2] - 2026-05-22

### Added

- `health({ strictService: true })` rejects `service !== "NENE2"` after a valid JSON body (Issue #46).
- FT130–229 docs-driven onboarding marathon; full-granularity field-trial reports (Issue #45).

### Documentation

- VitePress site (6 locales) at https://hideyukimori.github.io/nene2-js/

## [0.1.1] - 2026-05-22

### Added

- OpenAPI codegen types; Phase 3 client surface.

## [0.1.0] - 2026-05-22

### Added

- Initial published `@hideyukimori/nene2-client` on npm.

## [0.0.0] - bootstrap

### Added

- Repository bootstrap: scope, workflow, ADR 0001, AGENTS.md, governance docs
