# Erros & validação

## Nene2ClientError

`status` (HTTP; **`0`** = rede/abort/timeout), `url`, `problem`, `rateLimit` (`Retry-After`, `X-RateLimit-*`).

Use `isNene2ClientError` para **todas** as falhas do client, incluindo DNS/conexão.

## Helpers

`validationErrorsFromClientError`, `validationErrorsByField`, parsers Problem Details standalone.
