# Instalar nene2-python primeiro

Servidor de paridade Python na porta **8000** (mesmo contrato OpenAPI que NENE2 PHP).

```bash
git clone https://github.com/hideyukiMORI/nene2-python.git
cd nene2-python
# Siga o README (uv / pip) — http://localhost:8000
```

Documentação: https://hideyukimori.github.io/nene2-python/

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

Rotas em `/examples/*` (OpenAPI). Multi-backend: [Live smoke](live-smoke) e `NENE2_JS_PYTHON_BASE_URL`.
