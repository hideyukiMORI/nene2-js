# nene2-python zuerst installieren

Python-Parity-Server auf Port **8000** (OpenAPI wie NENE2 PHP).

```bash
git clone https://github.com/hideyukiMORI/nene2-python.git
cd nene2-python
# README: uv / pip — Start auf http://localhost:8000
```

Dokumentation: https://hideyukimori.github.io/nene2-python/

```bash
curl -sS http://localhost:8000/health | jq .
curl -sS http://localhost:8000/examples/notes?limit=1 | jq .
```

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8000' });
await client.health({ strictService: true });
await client.listNotes({ limit: 5 });
```

Pfade unter `/examples/*` (OpenAPI). Multi-Backend: [Live smoke](live-smoke) mit `NENE2_JS_PYTHON_BASE_URL`.
