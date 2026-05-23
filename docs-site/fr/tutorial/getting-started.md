# Premiers pas

Installez le client npm publié et appelez une API JSON NENE2 en cours d'exécution.

## Installation

À la **racine de votre application** (frontend Vite/React, script Node, etc.) :

```bash
npm install @hideyukimori/nene2-client@^1.0.0
```

Inutile de cloner `nene2-js` ou de le placer à côté de NENE2. Pointez `baseUrl` vers votre API NENE2 (ou nene2-python) en cours d'exécution.

**Node 22+** (`fetch` natif) ou un navigateur moderne.

## Exemple minimal

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
const { health, ping } = await client.smoke();
```

## Vérifier l'origine de l'API

```bash
curl -sS http://localhost:8080/health | jq .
# attendu : { "status": "ok", "service": "NENE2" }
```

Si `service` n'est pas `NENE2`, un autre processus occupe peut-être le port :

```ts
await client.health({ strictService: true });
```

## Santé dégradée

```ts
const health = await client.health({ allowDegraded: true });
```

Ne commitez jamais les clés API.

## Suite

- [Smoke live](/fr/howto/live-smoke)
- [OpenAPI & codegen](/fr/howto/openapi-codegen)
- [API client](/fr/reference/client-api)
