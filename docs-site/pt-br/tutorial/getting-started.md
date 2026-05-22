# Primeiros passos

Instale o cliente npm e chame uma API JSON NENE2 em execução.

## Instalação

```bash
npm install @hideyukimori/nene2-client
```

**Node 22+** (`fetch` nativo) ou navegador moderno.

## Exemplo mínimo

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
const { health, ping } = await client.smoke();
```

## Verificar a origem da API

```bash
curl -sS http://localhost:8080/health | jq .
# esperado: { "status": "ok", "service": "NENE2" }
```

Se `service` não for `NENE2`, outro processo pode estar na porta:

```ts
await client.health({ strictService: true });
```

## Health degradado

```ts
const health = await client.health({ allowDegraded: true });
```

Nunca commite chaves de API.

## Próximos passos

- [Live smoke](/pt-br/howto/live-smoke)
- [OpenAPI e codegen](/pt-br/howto/openapi-codegen)
- [API do cliente](/pt-br/reference/client-api)
