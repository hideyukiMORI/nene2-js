# Sync OpenAPI & codegen

Contribuidores fixam o OpenAPI do NENE2 e regeneram **tipos** TypeScript e **guards** de runtime.

## Layout

```text
../NENE2/docs/openapi/openapi.yaml   # fonte do contrato
../nene2-js/contracts/openapi.yaml   # cópia fixada para CI
```

## Comandos

```bash
npm run contracts:sync      # pin + contracts/openapi.yaml
npm run codegen             # src/generated/openapi.ts (tipos)
npm run codegen:check       # gate de drift de tipos (em npm run check)
npm run codegen:guards      # src/generated/guards.ts (validadores)
npm run codegen:guards:check
```

## Fluxo em bump do NENE2

1. NENE2 faz merge da mudança OpenAPI e publica tag
2. Abrir Issue no **nene2-js**
3. `contracts:sync` → `codegen` → `codegen:guards` → `npm run check`
4. PR atualiza types/guards se a superfície pública do client mudar

Codegen = **tipos** (`codegen`, ADR 0006) + **guards** (`codegen:guards`, ADR 0007). `createNene2Client` e `src/problem/guards.ts` permanecem manuais.

## Arquivo pin

`contracts/nene2-openapi-pin.json` registra git ref, versão info OpenAPI e SHA-256 do YAML. `syncedFrom` permanece caminho sibling relativo.
