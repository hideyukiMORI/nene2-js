# 错误与校验

## Nene2ClientError

`status`（HTTP；**`0`** = 网络/中止/超时）、`url`、`problem`、`rateLimit`（`Retry-After`、`X-RateLimit-*`）。

请用 `isNene2ClientError` 处理 **所有** 客户端失败（含 DNS/连接错误）。

## 辅助函数

`validationErrorsFromClientError`、`validationErrorsByField`、独立 Problem Details 解析器。
