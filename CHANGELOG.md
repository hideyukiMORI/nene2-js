# Changelog

All notable changes to this project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

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
