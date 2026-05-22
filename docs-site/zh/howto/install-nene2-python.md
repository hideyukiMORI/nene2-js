# 先安装 nene2-python

Python 版 NENE2 对等服务器，默认端口 **8000**（与 NENE2 PHP 同一 OpenAPI 契约）。

```bash
git clone https://github.com/hideyukiMORI/nene2-python.git
cd nene2-python
# 按 README 启动（uv / pip）— http://localhost:8000
```

文档：https://hideyukimori.github.io/nene2-python/

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

路径为 `/examples/*`（OpenAPI）。多后端验证见 [Live smoke](live-smoke) 的 `NENE2_JS_PYTHON_BASE_URL`。
