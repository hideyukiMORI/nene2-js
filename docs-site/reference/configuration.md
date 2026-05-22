# Configuration

## Nene2ClientConfig

| Field     | Type            | Description                                |
| --------- | --------------- | ------------------------------------------ |
| `baseUrl` | `string`        | API origin, no trailing slash (normalized) |
| `apiKey`  | `string?`       | Sent as `X-NENE2-API-Key`                  |
| `bearer`  | `string?`       | `Authorization: Bearer …`                  |
| `fetch`   | `typeof fetch?` | Test double or polyfill                    |
| `signal`  | `AbortSignal?`  | Forwarded to every request                 |

## Environment variables (apps)

| Variable                 | Purpose                          |
| ------------------------ | -------------------------------- |
| `NENE2_JS_API_BASE_URL`  | Live smoke / local dev           |
| `NENE2_JS_OPENAPI_PATH`  | Override for `contracts:sync`    |
| `NENE2_MACHINE_API_KEY`  | Machine routes (from NENE2 docs) |
| `NENE2_LOCAL_JWT_SECRET` | Dev JWT issuance on server       |

The SDK **forwards** credentials; it does not read `.env` files. Never commit secrets.

## Security notes

- Treat `baseUrl` as trusted configuration (SSRF risk if end-users control it).
- Log `Nene2ClientError` carefully — `problem.detail` may contain server messages.
- Path IDs are interpolated with `String(id)`; prefer numeric IDs or sanitized strings from your domain layer.
