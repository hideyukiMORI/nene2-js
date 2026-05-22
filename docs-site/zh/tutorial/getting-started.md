# 入门

```bash
npm install @hideyukimori/nene2-client
```

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
await client.smoke();
```

调用 live smoke 前请确认 `/health` 返回 NENE2 形状。切勿提交 API 密钥。
