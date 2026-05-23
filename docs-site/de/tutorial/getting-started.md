# Erste Schritte

Installieren Sie den veröffentlichten npm-Client und rufen Sie eine laufende NENE2 JSON API auf.

## Installation

Im **Projektroot Ihrer App** (Vite/React-Frontend, Node-Skript usw.):

```bash
npm install @hideyukimori/nene2-client@^1.0.0
```

Sie müssen `nene2-js` nicht klonen oder neben NENE2 ablegen. `baseUrl` zeigt auf Ihre laufende NENE2- (oder nene2-python-) API.

**Node 22+** (nativer `fetch`) oder ein moderner Browser.

## Minimales Beispiel

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
const { health, ping } = await client.smoke();
```

## API-Herkunft prüfen

```bash
curl -sS http://localhost:8080/health | jq .
# erwartet: { "status": "ok", "service": "NENE2" }
```

Ist `service` nicht `NENE2`, hört ein anderer Prozess auf dem Port:

```ts
await client.health({ strictService: true });
```

## Degraded health

```ts
const health = await client.health({ allowDegraded: true });
```

API-Schlüssel niemals committen.

## Nächste Schritte

- [Live smoke](/de/howto/live-smoke)
- [OpenAPI & codegen](/de/howto/openapi-codegen)
- [Client-API](/de/reference/client-api)
