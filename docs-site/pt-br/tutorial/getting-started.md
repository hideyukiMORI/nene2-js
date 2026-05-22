# Primeiros passos

```bash
npm install @hideyukimori/nene2-client
```

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
await client.smoke();
```

Confirme `/health` antes do smoke live. Nunca commite chaves de API.
