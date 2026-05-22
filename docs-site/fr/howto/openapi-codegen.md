# Sync OpenAPI & codegen

Les contributeurs épinglent l’OpenAPI NENE2 et régénèrent les **types** TypeScript et les **guards** runtime.

## Arborescence

```text
../NENE2/docs/openapi/openapi.yaml   # source du contrat
../nene2-js/contracts/openapi.yaml   # copie épinglée pour la CI
```

## Commandes

```bash
npm run contracts:sync      # pin + contracts/openapi.yaml
npm run codegen             # src/generated/openapi.ts (types)
npm run codegen:check       # gate drift types (dans npm run check)
npm run codegen:guards      # src/generated/guards.ts (validateurs)
npm run codegen:guards:check
```

## Workflow sur bump NENE2

1. NENE2 merge le changement OpenAPI et tague une release
2. Ouvrir une Issue dans **nene2-js**
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`
4. PR met à jour types/guards si la surface client publique change

Codegen = **types** (`codegen`, ADR 0006) + **guards** (`codegen:guards`, ADR 0007). `createNene2Client` et `src/problem/guards.ts` restent maintenus à la main.

## Fichier pin

`contracts/nene2-openapi-pin.json` enregistre git ref, version info OpenAPI et SHA-256 du YAML. `syncedFrom` reste un chemin sibling relatif.
