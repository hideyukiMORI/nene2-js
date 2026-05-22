# ADR 0001 — Repository Scope and Relationship to NENE2

**Status:** Accepted  
**Date:** 2026-05-22  
**Issue:** (bootstrap — file Issue when pushing to GitHub)

---

## Context

NENE2 is a PHP API-first framework with OpenAPI, MCP catalog, and an in-repo React starter. TypeScript consumers need typed clients and Problem Details helpers without expanding the PHP core or duplicating the standalone `nene-mcp` package.

Three naming candidates were considered for a sibling repository: `nene2-typescript`, `nene2-node`, `nene2-npm`. The ecosystem role is **JavaScript/TypeScript client libraries**, not a Node runtime port.

## Decision

1. Create sibling repository **`nene2-js`** next to `NENE2` (same parent directory as local clones).
2. Primary npm package name: **`@hideyukimori/nene2-client`** (private until first publish).
3. **In scope:** OpenAPI-aligned types, fetch client, Problem Details utilities, codegen tooling, docs/CI.
4. **Out of scope:** PHP runtime, MCP stdio server (see `nene-mcp`), React starter, domain logic, direct DB access.
5. OpenAPI contract **source of truth** remains NENE2 `docs/openapi/openapi.yaml`.
6. Collaboration model matches NENE2: GitHub Issues, Conventional Commits (English type, Japanese description), no direct commits to `main`.

## Consequences

### Positive

- Clear boundary with NENE2 and nene-mcp
- Independent semver for npm consumers
- Aligns with roadmap Phase 3 “API client / typed fetch” direction in NENE2

### Negative / trade-offs

- OpenAPI drift must be managed explicitly (pin/copy/codegen — Phase 1 Issue)
- Two repositories to coordinate for new endpoints

## Alternatives considered

| Alternative            | Rejected because                              |
| ---------------------- | --------------------------------------------- |
| `nene2-npm`            | Describes distribution, not purpose           |
| `nene2-node`           | Implies Node-only server framework            |
| `nene2-typescript`     | Acceptable but less common than `-js` in OSS  |
| Monorepo inside NENE2  | Keeps PHP repo heavier; publish cycle coupled |
| Full TS framework port | Violates NENE2 “small PHP core” philosophy    |

## Amendment (2026-05-22) — sibling `nene2-node`

The Node.js **framework port** lives in **[nene2-node](https://github.com/hideyukiMORI/nene2-node)** (`@hideyukimori/nene2-framework`). **This repository stays client-only.** The earlier rejection of `nene2-node` applied to a single-repo model; with two repositories, `nene2-node` is the correct framework name.
