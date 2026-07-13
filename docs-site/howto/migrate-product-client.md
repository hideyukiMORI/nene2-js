# Adopt the fleet transport in a product

> Added in **v1.1.0** ([#102](https://github.com/hideyukiMORI/nene2-js/issues/102)). English and Japanese only for now; other locales will follow.

Goal: replace a hand-written `frontend/src/**/client.ts` with `createNene2Transport` **without touching call sites**. Keep the product's existing `apiClient` surface as a **thin adapter** so the adopt PR stays a minimal diff.

## The thin adapter pattern

```ts
// frontend/src/shared/api/client.ts — after migration
import { createNene2Transport, createSessionTokenStore } from '@hideyukimori/nene2-client';

export const tokenStore = createSessionTokenStore({ key: 'nene_myproduct_token' });

const transport = createNene2Transport({
  baseUrl: '', // or the product's apiBasePath / env.apiBaseUrl
  tokenStore,
  onUnauthorized: () => {
    /* app side effect: login-in-place, notice flag, … */
  },
  onForbidden: () => {
    /* app side effect: redirect to /forbidden, … */
  },
});

// The existing product surface, preserved verbatim:
export const apiClient = {
  get: <T>(path: string) => transport.get<T>(path),
  post: <T>(path: string, body?: unknown) => transport.post<T>(path, body),
  put: <T>(path: string, body?: unknown) => transport.put<T>(path, body),
  patch: <T>(path: string, body?: unknown) => transport.patch<T>(path, body),
  delete: <T = void>(path: string) => transport.delete<T>(path),
  getBlob: (path: string) => transport.getBlob(path),
  upload: <T>(path: string, form: FormData) => transport.upload<T>(path, form),
} as const;
```

What the package now guarantees for every one of these paths (backed by unit tests in `tests/transport/`):

- `Authorization` **and** `X-Authorization` mirror on every verb and every route (JSON / blob / multipart / CSV / bytes) — callers cannot drop it.
- Token in `sessionStorage` only (in-memory fallback outside browsers); cleared on 401 of an authenticated request and on logout (`clearToken`).
- The token never appears in a URL.
- Errors are RFC 9457 Problem Details mapped to `Nene2ClientError` — never raw HTML.

## Mapping tables (from the four reference products)

### nene-vault (`frontend/src/shared/api/client.ts`)

| Existing surface                                     | Transport call                                        | Notes                                                    |
| ---------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| `apiClient.get(p, signal)`                           | `transport.get(p, { signal })`                        |                                                          |
| `apiClient.post/patch`                               | `transport.post/patch(p, body)`                       |                                                          |
| `apiClient.delete`                                   | `transport.delete(p)`                                 |                                                          |
| `apiClient.upload`                                   | `transport.upload(p, formData)`                       | Boundary handling identical (no manual `Content-Type`)   |
| `apiClient.postBlob`                                 | `transport.postBlob(p, body)`                         | `BlobDownload { blob, filename }` shape matches          |
| `apiClient.getBlob`                                  | `(await transport.getBlob(p, { signal })).blob`       |                                                          |
| `credentials: 'include'`                             | `createNene2Transport({ credentials: 'include' })`    |                                                          |
| 401 → `authStore.clearSession()`; 403 → `/forbidden` | `tokenStore` adapter over `authStore` + `onForbidden` | Vault keeps its session object; adapt it to `TokenStore` |

Vault stores a session **object**; adapt it: `{ getToken: () => authStore.getToken(), clearToken: () => authStore.clearSession() }`.

### nene-clear (`frontend/src/api/client.ts`)

| Existing surface                                               | Transport call                                         | Notes                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `api.get/post/put/delete`                                      | `transport.get/post/put/delete`                        |                                                        |
| `apiFetch(path, init)` (multipart/binary escape hatch)         | `transport.upload` / `transport.getBlob`               | The escape hatch disappears — the mirror is structural |
| `storeToken/clearToken` (`sessionStorage`, `nene_clear_token`) | `createSessionTokenStore({ key: 'nene_clear_token' })` | Same key, same storage — no re-login on deploy         |
| `subscribeAuthChange`                                          | `tokenStore.subscribe`                                 |                                                        |
| 401 (non-login) → `clearToken()`                               | Built-in (only when a token was attached)              | Login 401 is credentials feedback — also built-in      |
| JWT decode helpers (`isAuthenticated`, `getUserRole`)          | stay in the app                                        | Out of transport scope                                 |

### nene-deal (`frontend/src/shared/auth/auth-headers.ts` + api client)

| Existing surface                          | Transport call                                                                                  | Notes |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- | ----- |
| `buildAuthHeaders()` (#83 choke point)    | Built into the transport (same design, packaged)                                                |       |
| `X-Organization-Slug` / `X-NENE2-API-Key` | `createNene2Transport({ headers: { 'X-Organization-Slug': env.orgSlug }, apiKey: env.apiKey })` |       |
| JSON client + CSV download                | `transport.get/post/…` + `transport.getBlob`                                                    |       |

### nene-invoice (`frontend/src/shared/api/client.ts`)

| Existing surface                            | Transport call                                            | Notes                                       |
| ------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| `apiClient.get/post/put/patch/delete`       | `transport.get/post/put/patch/delete`                     |                                             |
| `apiClient.postCsv`                         | `transport.postCsv(p, csv, { alsoOkStatuses: [422] })`    | 200/422 both resolve with the import report |
| `apiClient.postBytes`                       | `transport.postBytes(p, blob, { alsoOkStatuses: [422] })` | Raw bytes untouched (Shift_JIS bank CSV)    |
| `apiClient.getBlob`                         | `(await transport.getBlob(p)).blob`                       |                                             |
| `apiUrl()` install-base prefix (ADR 0015)   | `createNene2Transport({ baseUrl: apiBasePath })`          |                                             |
| In-memory token + silent refresh (ADR 0014) | **stays app-side**                                        | See the honest limitation below             |

**Honest limitation — invoice's silent-refresh retry:** the transport does not implement invoice's 401 → `/auth/refresh` → replay loop (ADR 0014, cookie+CSRF). An invoice adapter either keeps that loop around the transport calls, or invoice migrates to the fleet sessionStorage store first. This is a product decision, not something the package should guess.

## Adapter for a custom token store

```ts
import type { TokenStore } from '@hideyukimori/nene2-client';

const vaultTokenStore: TokenStore = {
  getToken: () => authStore.getToken(),
  clearToken: () => authStore.clearSession(),
};
```

## What stays in the app

- Redirects, login-in-place rendering, "session expired" notices → `onUnauthorized` / `onForbidden` callbacks.
- Domain error mapping (e.g. wrapping `Nene2ClientError` into a product `AppError`) → thin adapter.
- JWT claim decoding for UI gating, refresh-token flows, CSRF cookie pairing.
- ESLint bans on bare `fetch()` (vault #118/#173, clear #265/#312 pattern) — a separate fleet issue distributes the shared config.
