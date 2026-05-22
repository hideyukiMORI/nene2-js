# Fehler & Validierung

## Nene2ClientError

`status` (HTTP; **`0`** = Netzwerk/Abort/Timeout), `url`, `problem`, `rateLimit` (`Retry-After`, `X-RateLimit-*`).

`isNene2ClientError` für **alle** Client-Fehler inkl. DNS/Verbindung.

## Hilfsfunktionen

`validationErrorsFromClientError`, `validationErrorsByField`, eigenständige Problem-Details-Parser (`parseProblemDetails`, …).
