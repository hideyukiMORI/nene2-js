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
npm run codegen          # src/generated/openapi.ts (types)
npm run codegen:check    # types drift gate (in npm run check)
npm run codegen:guards   # src/generated/guards.ts (validators)
npm run codegen:guards:check
```

## Workflow on NENE2 bump

1. NENE2 merges OpenAPI change and tags a release.
2. Open an Issue in **nene2-js** to sync.
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`.
4. PR updates guards/types if the public client surface changed.

Codegen is **types** (`codegen`, ADR 0006) + **guards** (`codegen:guards`, ADR 0007). `createNene2Client` and `src/problem/guards.ts` stay hand-maintained.

## Pin file

`contracts/nene2-openapi-pin.json` records git ref, OpenAPI info version, and SHA-256 of the YAML. `syncedFrom` stays a relative sibling path, not an absolute machine path.
