# エラーとバリデーション

## Nene2ClientError

`status`, `url`, `problem`。`isNene2ClientError` ガードあり。

## ヘルパー

`validationErrorsFromClientError`, `validationErrorsByField`, `isNene2ValidationFailedProblem`

クライアントなしでも `parseProblemDetails` 等を単体 import 可能です。
