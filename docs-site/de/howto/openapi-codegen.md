# OpenAPI-Sync & Codegen

Mitwirkende pinnen die NENE2-OpenAPI und regenerieren TypeScript-**Typen** sowie **Runtime-Guards**.

## Verzeichnislayout

```text
../NENE2/docs/openapi/openapi.yaml   # Vertragsquelle
../nene2-js/contracts/openapi.yaml   # gepinnte Kopie für CI
```

## Befehle

```bash
npm run contracts:sync      # Pin + contracts/openapi.yaml
npm run codegen             # src/generated/openapi.ts (Typen)
npm run codegen:check       # Typ-Drift-Gate (in npm run check)
npm run codegen:guards      # src/generated/guards.ts (Validators)
npm run codegen:guards:check
```

## Workflow bei NENE2-Bump

1. NENE2 merged OpenAPI-Änderung und taggt Release
2. Issue in **nene2-js** eröffnen
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`
4. PR aktualisiert types/guards bei geänderter Client-Oberfläche

Codegen umfasst **Typen** (`codegen`, ADR 0006) und **Guards** (`codegen:guards`, ADR 0007). `createNene2Client` und `src/problem/guards.ts` bleiben handgepflegt.

## Pin-Datei

`contracts/nene2-openapi-pin.json` speichert git ref, OpenAPI info version und SHA-256 der YAML. `syncedFrom` bleibt ein relativer Sibling-Pfad.
