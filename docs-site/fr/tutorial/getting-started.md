# Premiers pas

```bash
npm install @hideyukimori/nene2-client
```

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
const { health, ping } = await client.smoke();
```

Vérifiez `/health` avant le smoke live. Ne commitez jamais les clés API.

- [Smoke live](/fr/howto/live-smoke)
- [OpenAPI & codegen](/fr/howto/openapi-codegen)
