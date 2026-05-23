# Primeiros passos

Instale o cliente npm publicado e chame uma API JSON NENE2 em execução.

## Instalação

Na **raiz do seu app** (frontend Vite/React, script Node, etc.):

```bash
npm install @hideyukimori/nene2-client@^1.0.0
```

Não é necessário clonar `nene2-js` nem colocá-lo ao lado do NENE2. Aponte `baseUrl` para sua API NENE2 (ou nene2-python) em execução.

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
