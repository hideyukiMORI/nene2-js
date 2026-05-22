# 入门

安装已发布的客户端并调用运行中的 NENE2 JSON API。

## 安装

```bash
npm install @hideyukimori/nene2-client
```

需要 **Node 22+**（原生 `fetch`）或现代浏览器。

## 最小示例

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:8080' });
const { health, ping } = await client.smoke();
```

## 确认 API 来源

```bash
curl -sS http://localhost:8080/health | jq .
# 期望: { "status": "ok", "service": "NENE2" }
```

若 `service` 不是 `NENE2`，可能是其他进程占用了端口：

```ts
await client.health({ strictService: true });
```

## 降级 health

```ts
const health = await client.health({ allowDegraded: true });
```

切勿提交 API 密钥。

## 下一步

- [Live smoke](/zh/howto/live-smoke)
- [OpenAPI 与 codegen](/zh/howto/openapi-codegen)
- [客户端 API](/zh/reference/client-api)
