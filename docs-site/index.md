---
layout: home

hero:
  name: 'nene2-js'
  text: 'TypeScript Client for NENE2'
  tagline: OpenAPI-aligned types, typed fetch, RFC 9457 Problem Details — Node 22+ and browsers, zero runtime dependencies.
  actions:
    - theme: brand
      text: Get Started →
      link: /tutorial/getting-started
    - theme: alt
      text: npm package
      link: https://www.npmjs.com/package/@hideyukimori/nene2-client
    - theme: alt
      text: NENE2 (PHP)
      link: https://hideyukimori.github.io/NENE2/

features:
  - icon: 📦
    title: Published on npm
    details: 'Install @hideyukimori/nene2-client — strict TypeScript, ESM, tree-shakeable sideEffects false, npm provenance on release.'

  - icon: 📄
    title: OpenAPI first
    details: Contract copied from NENE2 and checked in CI. Codegen keeps `components['schemas']` aligned with exported guards and client types.

  - icon: 🛡️
    title: Problem Details built in
    details: Parse `application/problem+json`, detect `validation-failed`, and surface field-level errors — same RFC 9457 story as the PHP framework.

  - icon: ⚡
    title: Native fetch
    details: No axios, no heavy HTTP stack. Inject `fetch` for tests, forward `AbortSignal` for cancellation, opt into degraded health (503).

  - icon: 🔗
    title: Ecosystem aware
    details: Not a Node port of NENE2. PHP runtime stays in NENE2; MCP in nene-mcp; parity ports in nene2-python / nene2-node.

  - icon: 🔬
    title: Field-trial driven
    details: Hundreds of automated client scenarios plus ADR-backed friction cycles — DX fixes land as Issues and PRs, not silent drift.
---
