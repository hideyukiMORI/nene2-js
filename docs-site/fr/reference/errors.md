# Erreurs & validation

## Nene2ClientError

`status` (HTTP ; **`0`** = réseau/abort/timeout), `url`, `problem`, `rateLimit` (`Retry-After`, `X-RateLimit-*`).

Utiliser `isNene2ClientError` pour **toutes** les erreurs client, y compris DNS/connexion.

## Helpers

`validationErrorsFromClientError`, `validationErrorsByField`, parseurs Problem Details autonomes.
