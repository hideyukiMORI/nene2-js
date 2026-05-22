# 配置

| 字段        | 说明                                  |
| ----------- | ------------------------------------- |
| `baseUrl`   | API 根 URL（无尾部斜杠）              |
| `apiKey`    | `X-NENE2-API-Key`                     |
| `bearer`    | Bearer JWT                            |
| `fetch`     | 测试注入                              |
| `signal`    | 转发至每个请求                        |
| `timeoutMs` | 单次请求超时（`AbortSignal.timeout`） |

密钥由应用环境变量提供，勿写入仓库。
