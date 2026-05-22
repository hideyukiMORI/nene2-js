# Production readiness (honest assessment)

This client targets **typed access to NENE2 JSON APIs** for internal tools, MVPs, and apps that own their own resilience layer. It is **not** a full production HTTP client (no built-in retry, connection pooling, or observability hooks).

## Suitable today

| Use case                                   | Notes                                                 |
| ------------------------------------------ | ----------------------------------------------------- |
| Internal admin / ops dashboards            | Accept `0.x` semver; pin `@hideyukimori/nene2-client` |
| Startup MVP on NENE2                       | Wrap client in your app’s retry/backoff if needed     |
| AI-driven consumer sandboxes (nene2-js-FT) | Documented friction cycle                             |

## Not ready alone for

| Gap                                      | Workaround                                              | Planned                                      |
| ---------------------------------------- | ------------------------------------------------------- | -------------------------------------------- |
| SLA-critical API with no app-layer retry | Implement retry in consumer; use `timeoutMs` + `signal` | Retry policy out of scope until ADR          |
| 429 `Retry-After` / rate-limit headers   | Read headers in custom `fetch` wrapper today            | Issue backlog — `problem` only today         |
| Pagination `total` on all backends       | python may include `total`; PHP may omit optional field | OpenAPI optional field                       |
| `1.0.0` stability guarantee              | Stay on pinned `0.x`                                    | See [roadmap.md](../roadmap.md) 1.0 criteria |

## Error model (since 0.1.3+)

| Situation                                 | `Nene2ClientError.status`   |
| ----------------------------------------- | --------------------------- |
| HTTP error with body                      | HTTP status (e.g. 404, 422) |
| Network / DNS / connection refused        | **`0`**                     |
| Abort / timeout (`timeoutMs` or `signal`) | **`0`**                     |

Always use `isNene2ClientError(error)` — do not assume every failure is HTTP 4xx/5xx.

## Configuration for resilience

```ts
const client = createNene2Client({
  baseUrl: process.env.NENE2_JS_API_BASE_URL!,
  timeoutMs: 15_000,
  signal: appShutdownSignal,
});
```

Retry, circuit breaking, and metrics remain **consumer responsibility** until explicitly scoped in an ADR.

## NENE2 dependency

Commercial viability depends on **NENE2 (or nene2-python) runtime maturity**, not this package alone.
