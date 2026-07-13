# Fleet transport API

> Added in **v1.1.0** ([#102](https://github.com/hideyukiMORI/nene2-js/issues/102)). English and Japanese only for now; other locales will follow.

`createNene2Transport(config?)` → `Nene2Transport` — the generic, authenticated HTTP transport for NENE2-based product frontends. One correct implementation of the plumbing every product used to hand-write: the `X-Authorization` mirror on every request, the sessionStorage token store, RFC 9457 Problem Details errors, and 401/403 hooks.

## Why the `X-Authorization` mirror

Some shared-hosting front proxies (Tier A; observed on HETEML) strip the standard `Authorization` header before it reaches PHP. NENE2 backends fall back to the `X-Authorization` mirror when the standard header is missing. The transport builds all auth headers in a single internal choke point that **every** path goes through — JSON verbs, blob downloads, multipart uploads, raw CSV/bytes — so no caller can drop the mirror. Auth headers are applied last; per-request headers cannot override them.

## Token store

```ts
import { createSessionTokenStore } from '@hideyukimori/nene2-client';

const tokenStore = createSessionTokenStore({ key: 'nene_myproduct_token' });
tokenStore.setToken(jwt); // after login
tokenStore.getToken(); // string | null
tokenStore.clearToken(); // logout
const unsubscribe = tokenStore.subscribe(() => rerenderAuthGate());
```

- Default backend: `sessionStorage` (fleet decision 2026-07-14 — the token does not persist across browser restarts, bounding the XSS blast radius). Never `localStorage`.
- Non-browser environments (tests, SSR) fall back to an in-memory store automatically.
- Storage failures fail closed (reads behave as signed out).
- **No API puts the token in a URL.**

A product with its own session store can pass any object implementing `TokenStore` (`getToken()` / `clearToken()`) instead.

## Transport

```ts
import { createNene2Transport } from '@hideyukimori/nene2-client';

const transport = createNene2Transport({
  baseUrl: '', // '' = same-origin relative paths (default)
  tokenStore,
  onUnauthorized: () => authGate.showLoginInPlace(), // side effects stay in the app
  onForbidden: () => router.navigate('/forbidden'),
});
```

### Methods

| Method                             | HTTP                        | Notes                                                                                |
| ---------------------------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| `get<T>(path, opts?)`              | `GET` JSON                  |                                                                                      |
| `post<T>(path, body?, opts?)`      | `POST` JSON                 | Body optional                                                                        |
| `put<T>(path, body?, opts?)`       | `PUT` JSON                  |                                                                                      |
| `patch<T>(path, body?, opts?)`     | `PATCH` JSON                |                                                                                      |
| `delete<T = void>(path, opts?)`    | `DELETE`                    | Resolves `undefined` on 204/empty                                                    |
| `getBlob(path, opts?)`             | `GET` binary                | → `{ blob, filename }` (filename from `Content-Disposition`)                         |
| `postBlob(path, body?, opts?)`     | `POST` JSON → binary        | e.g. export with filter body                                                         |
| `upload<T>(path, formData, opts?)` | `POST` multipart            | `Content-Type` left unset so the browser adds the boundary                           |
| `postCsv<T>(path, csv, opts?)`     | `POST text/csv` (string)    | `opts.contentType` overridable                                                       |
| `postBytes<T>(path, blob, opts?)`  | `POST text/csv` (raw bytes) | Bytes are never re-decoded (Shift_JIS bank CSV safe); `opts.contentType` overridable |

Per-request options: `signal`, `headers` (cannot override auth), and `alsoOkStatuses` — extra statuses whose body resolves instead of throwing (e.g. `[422]` for CSV import endpoints whose rejection report is the response body).

### Config

| Key                    | Default    | Notes                                                           |
| ---------------------- | ---------- | --------------------------------------------------------------- |
| `baseUrl`              | `''`       | Origin or install-base prefix; trailing slashes stripped        |
| `tokenStore`           | —          | Omit for unauthenticated transports                             |
| `apiKey`               | —          | Sent as `X-NENE2-API-Key`                                       |
| `headers`              | `{}`       | Static extras, e.g. `X-Organization-Slug`                       |
| `credentials`          | —          | Forwarded to `fetch` (e.g. `'include'`)                         |
| `fetch` / `timeoutMs`  | global / — | Same semantics as `createNene2Client`                           |
| `onUnauthorized`       | —          | Fired on 401 of an authenticated request, after the token clear |
| `onForbidden`          | —          | Fired on any 403                                                |
| `clearTokenOnStatuses` | `[401]`    | Add `403` to also sign out on forbidden                         |

### Error and 401/403 semantics

- Non-2xx (unless in `alsoOkStatuses`) throws `Nene2ClientError` with `status`, `url`, parsed `problem` (RFC 9457) and `rateLimit`. **API errors are never surfaced as HTML** — an HTML error page yields `problem: undefined` and the page body never enters the message.
- **401 with a token attached** (expired session): the token store is cleared (`clearTokenOnStatuses`), then `onUnauthorized(context)` fires. The app decides the side effect (login-in-place, redirect…).
- **401 without a token** (e.g. wrong credentials on login): nothing is cleared, no hook fires — the error surfaces to the form.
- **403**: `onForbidden(context)` fires; the token is kept unless the app opts into clearing.
- `context` = `{ status, path, url, tokenAttached, problem }`.

## Relationship to `createNene2Client`

`createNene2Client` remains the typed client for the documented NENE2 system/example endpoints. `createNene2Transport` is the generic transport for product APIs. Both share the same error type, Problem Details parsing, timeout and network-error wrapping — and as of v1.1.0 both send the `X-Authorization` mirror.

See the migration guide: [Adopt the fleet transport in a product](../howto/migrate-product-client).
