# Errors & validation helpers

## Nene2ClientError

| Property  | Description                               |
| --------- | ----------------------------------------- |
| `status`  | HTTP status (`0` = network/abort/timeout) |
| `url`     | Request URL                               |
| `problem` | Parsed Problem Details, if body matched   |

`isNene2ClientError(error)` type guard — use for **all** client failures including DNS and connection errors.

**Known gap:** 429 responses parse `problem` from the body but **do not** expose `Retry-After` or `X-RateLimit-*` headers on the error object yet. Use a custom `fetch` wrapper if you need header-based backoff.

## Validation helpers

| Export                                 | Use                            |
| -------------------------------------- | ------------------------------ |
| `validationErrorsFromClientError`      | `errors[]` from a client error |
| `validationErrorsByField`              | Map field → messages           |
| `isNene2ValidationFailedProblem`       | Narrow Problem document        |
| `NENE2_PROBLEM_TYPE_VALIDATION_FAILED` | Constant type URI              |

## Standalone Problem Details

Exported without the client: `parseProblemDetails`, `isProblemDetails`, `isValidationProblemDetails`, `problemDetailsExtensions`, etc.

Useful for middleware or custom `fetch` wrappers in consumer apps.
