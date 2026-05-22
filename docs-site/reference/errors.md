# Errors & validation helpers

## Nene2ClientError

| Property    | Description                                  |
| ----------- | -------------------------------------------- |
| `status`    | HTTP status (`0` = network/abort/timeout)    |
| `url`       | Request URL                                  |
| `problem`   | Parsed Problem Details, if body matched      |
| `rateLimit` | `Retry-After` / `X-RateLimit-*` when present |

`isNene2ClientError(error)` type guard — use for **all** client failures including DNS and connection errors.

### Rate limit backoff (429)

When the server sends rate-limit headers, they appear on `error.rateLimit`:

```ts
catch (error) {
  if (isNene2ClientError(error) && error.status === 429 && error.rateLimit?.retryAfterSeconds) {
    await sleep(error.rateLimit.retryAfterSeconds * 1000);
  }
}
```

`parseRateLimitHeaders(headers)` is exported for custom `fetch` wrappers.

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
