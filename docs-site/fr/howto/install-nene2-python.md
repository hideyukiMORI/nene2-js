# Installer nene2-python en premier

Serveur de parité Python sur le port **8000** (même contrat OpenAPI que NENE2 PHP).

```bash
git clone https://github.com/hideyukiMORI/nene2-python.git
cd nene2-python
# Suivre le README (uv / pip) — http://localhost:8000
```

Documentation : https://hideyukimori.github.io/nene2-python/

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

Chemins sous `/examples/*` (OpenAPI). Multi-backend : [Smoke live](live-smoke) et `NENE2_JS_PYTHON_BASE_URL`.
