# エラーとバリデーション

## Nene2ClientError

| プロパティ  | 説明                                               |
| ----------- | -------------------------------------------------- |
| `status`    | HTTP ステータス（`0` = network / abort / timeout） |
| `url`       | リクエスト URL                                     |
| `problem`   | パース済み Problem Details（該当時）               |
| `rateLimit` | `Retry-After` / `X-RateLimit-*`（該当時）          |

`isNene2ClientError` — DNS・接続エラーも含め **すべて** のクライアント失敗に使用。

## ヘルパー

`validationErrorsFromClientError`, `validationErrorsByField`, `isNene2ValidationFailedProblem`

クライアントなしでも `parseProblemDetails` 等を単体 import 可能です。
