# OpenAPI sync & codegen

Contributors pin NENE2 OpenAPI in this repo and regenerate TypeScript types.

## Sibling layout

```text
../NENE2/docs/openapi/openapi.yaml   # contract source
../nene2-js/contracts/openapi.yaml   # pinned copy for CI
```

## Commands

```bash
npm run contracts:sync   # refresh pin + contracts/openapi.yaml
npm run codegen          # src/generated/openapi.ts
npm run codegen:check    # drift gate (in npm run check)
```

## Workflow on NENE2 bump

1. NENE2 merges OpenAPI change and tags a release.
2. Open an Issue in **nene2-js** to sync.
3. `contracts:sync` → `codegen` → `npm run check`.
4. PR updates guards/types if the public client surface changed.

Codegen is **types only** today (ADR 0006). **Guard codegen** (ADR 0007, [#86](https://github.com/hideyukiMORI/nene2-js/issues/86)) will add `npm run codegen:guards` in Phase B — `createNene2Client` stays hand-maintained.

## Pin file

`contracts/nene2-openapi-pin.json` records git ref, OpenAPI info version, and SHA-256 of the YAML. `syncedFrom` stays a relative sibling path, not an absolute machine path.
