# Erste Schritte

```bash
npm install @hideyukimori/nene2-client
```

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
await client.smoke();
```

Vor Live-Smoke `/health` prüfen. API-Schlüssel niemals committen.
