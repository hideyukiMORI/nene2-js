# How to migrate a product `apiClient` onto the transport

Move a nene-\* product from a hand-rolled `apiClient` (its own `fetch`,
401-refresh, token storage) onto the fleet-standard transport —
`createNene2Transport` + `createSessionTokenStore` + the opt-in `recoverAuth`
seam ([ADR 0008](../adr/0008-recover-auth-seam.md)). One audited implementation
of the request plumbing every product used to re-write: the `X-Authorization`
mirror, Problem Details (RFC 9457) mapping, 401/403 hooks, and — new in ADR 0008
— rotation-safe silent re-authentication.

The worked example throughout is **nene-invoice**
(`frontend/src/shared/api/client.ts`), the first W2b consumer.

> **Prerequisite:** the `recoverAuth` seam and `transport.recover()` ship in
> **`@hideyukimori/nene2-client` >= 1.2.0**. 1.1.0 has the transport but not the
> seam, so install/pin `>=1.2.0` before the migration — an older version will
> not type-check against `recoverAuth` / `recover()`.

## The golden rule: keep your public surface, swap the internals

The migration is **internal**. Your product's `apiClient` (and its auth module)
keep the **same exported signatures**; only their bodies change to delegate to
the transport. Do this and the migration touches a handful of files instead of
hundreds.

> invoice, measured: `apiClient` is referenced by **40 files**; the auth surface
> (`setAuthToken`/`hasAuthToken`/`refreshSession`/…) by ~20 more, across a
> boundary (`shared/api/client` is imported by 46 files). None of them need to
> change if the signatures hold.

## Steps

### 1. Stand up the transport and a token store

```ts
import { createNene2Transport } from '@hideyukimori/nene2-client';

const transport = createNene2Transport({
  baseUrl: apiBasePath, // your install-base prefix (ADR 0015 in invoice)
  tokenStore, // ← chosen by your token posture; see below
  onUnauthorized: () => authGate.showLoginInPlace(), // fail-closed side effect
  // recoverAuth: … // ← added in step 4, BUT see the promotion gate below
});
```

#### Choose a token store to match your **existing** posture — do not regress it

The transport only needs a `TokenStore` (`getToken` / `clearToken`, plus
`setToken` for the recover hook). Pick the one your product already uses; a
migration is a refactor, not the place to change where the token lives.

- **sessionStorage posture** → `createSessionTokenStore({ key: 'nene_<product>_token' })`
  (the fleet default: survives reloads, bounded XSS blast radius vs
  `localStorage`).

  ```ts
  import { createSessionTokenStore } from '@hideyukimori/nene2-client';
  const tokenStore = createSessionTokenStore({ key: 'nene_<product>_token' });
  ```

- 🔴 **In-memory posture** (e.g. **invoice**, deliberately: `client.ts` keeps the
  access token **in memory** — a module variable, lost on reload — while the
  **httpOnly refresh cookie** survives the reload and restores the token via
  `refreshSession()`, ADR 0014) → **adapt your in-memory store to `TokenStore`**.
  Do **not** switch to `createSessionTokenStore`: moving an in-memory token into
  `sessionStorage` **widens the XSS exposure surface** and is a posture
  regression that needs its own ADR, not a silent side effect of this migration.

  ```ts
  // Wrap the token variable your app already owns.
  let accessToken: string | null = null;
  const tokenStore: TokenStore = {
    getToken: () => accessToken,
    clearToken: () => {
      accessToken = null;
    },
  };
  // setToken (used by recoverAuth in step 3) seats the refreshed token:
  function setAccessToken(t: string | null): void {
    accessToken = t;
  }
  ```

  `TokenStore` is exported from the package; the recover hook calls whatever
  seats your token (`setAccessToken` above / your `setAuthToken`).

### 2. Make `apiClient` a thin adapter — preserve every signature

Keep the exact verb surface your callers already use; forward to the transport:

```ts
export const apiClient = {
  get: <T>(path: string) => transport.get<T>(path),
  post: <T>(path: string, body?: Json) => transport.post<T>(path, body),
  put: <T>(path: string, body?: Json) => transport.put<T>(path, body),
  patch: <T>(path: string, body?: Json) => transport.patch<T>(path, body),
  delete: <T>(path: string) => transport.delete<T>(path),
  postCsv: <T>(path: string, csv: string) => transport.postCsv<T>(path, csv),
  postBytes: <T>(path: string, body: Blob) => transport.postBytes<T>(path, body),
  getBlob: (path: string) => transport.getBlob(path).then((d) => d.blob),
} as const;
```

Already handled by the transport, so **delete** your hand-rolled versions:

- the `X-Authorization` mirror (set for every request in the transport);
- blob GET and raw-bytes POST (they route through the same `send()` choke point,
  so they inherit auth + recovery — `postBytes` never re-encodes the body, which
  Shift_JIS bank CSVs depend on);
- `alsoOkStatuses` for the CSV 200-or-422 report shape (pass
  `{ alsoOkStatuses: [422] }` per request instead of a bespoke branch).

### 3. Move the refresh **mechanics** into a `recoverAuth` function

The transport owns the **orchestration** (single-flight, one replay,
no-recursion). Your function owns only the product/contract **mechanics**: read
the CSRF cookie, POST your refresh endpoint, seat the new token.

```ts
async function recoverAuth(): Promise<boolean> {
  const csrf = readCookie('ni_csrf');
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (csrf !== null) headers['X-CSRF-Token'] = csrf;

  // 🔴 BARE fetch — must NOT go through `transport`, or it would await its own
  // recovery. Use a plain fetch (or a transport built without `recoverAuth`).
  const res = await fetch(apiUrl('/auth/refresh'), { method: 'POST', headers });
  if (!res.ok) return false;
  const token = (safeJsonParse(await res.text()) as { token?: unknown } | null)?.token;
  if (typeof token !== 'string') return false;
  setAccessToken(token); // session store: tokenStore.setToken(token) — in-memory: your setter (step 1)
  return true;
}
```

Then **delete** the hand-rolled orchestration — for invoice that is
`refreshInFlight` (single-flight), `shouldRetryAfterRefresh`, the `isRetry`
threading, and the per-verb 401-replay branches. The transport does all of it.

### 4. App-start session probe → `transport.recover()`

After a reload the in-memory access token is gone but the refresh cookie may
still be valid, so products fire a boot probe to restore the session. Route it
through the transport, **not** `recoverAuth` directly:

```ts
// was: refreshSession() → refreshAccessToken()
export function refreshSession(): Promise<boolean> {
  return transport.recover();
}
```

> 🔴 **Why through `transport.recover()`, not `recoverAuth`.** The probe and any
> early 401-retry must share **one** in-flight refresh. `/auth/refresh` rotates
> the refresh token within its family, and presenting an already-rotated token
> **revokes the whole family** (reuse defense). Two concurrent refreshes =
> hard logout. `transport.recover()` runs `recoverAuth` through the transport's
> shared single-flight, so probe + retry collapse into one call. Calling
> `recoverAuth` directly bypasses that and can trip the reuse defense.

### 5. Fail-closed 401 and token clearing → hooks + `TokenStore`

- Your `handleUnauthorized` (clear token, flag "session expired", show login)
  becomes the transport's default behavior plus `onUnauthorized`. Keep the UX
  bits (the "why am I back at login" flag) in your `onUnauthorized` callback.
- Token clear/read/subscribe move to the `TokenStore`
  (`createSessionTokenStore` also exposes `subscribe` for
  `useSyncExternalStore`).

### 6. Keep your public auth surface stable (boundary hygiene)

Feature code should not start importing the transport directly. Re-export the
**same** names your product already exposes from your auth module, now backed by
the token store / transport:

```ts
// entities/auth (invoice FSD boundary): features import from here, not shared/api
export const setAuthToken = (t: string | null) =>
  t === null ? tokenStore.clearToken() : tokenStore.setToken(t);
export const hasAuthToken = () => tokenStore.getToken() !== null;
export { refreshSession, subscribeAuthChange /* … */ };
```

> invoice enforces this at the FSD layer: features may not import `shared/api`
> directly (they go through `entities/auth`). Holding those re-exports stable is
> what keeps the ~20 auth-surface consumers from churning.

## 🔴 The promotion gate is **per tenancy mode**, not blanket

`recoverAuth` is **opt-in**, and whether you may enable it depends on the
deployment's **tenancy mode** — because `_work/issues.md` **#38** is a
**path-mode** bug, not a universal one. Decide per mode:

| Tenancy mode                                 | `#38` applies?                            | `recoverAuth`                           |
| -------------------------------------------- | ----------------------------------------- | --------------------------------------- |
| **single / host** (one org, no slug)         | **No** — no slug, no path-scoped rotation | **Enable now** (`#38`-independent)      |
| **path-scoped / multi-tenant** (`/{slug}/…`) | **Yes** — the rotation bug                | **Wire but don't pass** until `#38` fix |

- **single / host mode**: there is no slug and no path-scoped refresh cookie, so
  the `#38` rotation bug cannot occur. Pass `recoverAuth` — silent refresh is
  safe today.
- **path-scoped / multi-tenant mode** (e.g. the invoice disposable-org demo,
  `invoice.ayane.co.jp/demo/…`): the server reissues the rotated `ni_refresh` at
  the slug-stripped `Path`, so a second refresh re-presents a consumed token →
  family revoke. **Wire the seam but do not pass `recoverAuth`** — leave the
  transport in its fail-closed default (behavior identical to today: one-shot;
  reload → login) until the `#38` cookie-`Path` root fix lands server-side, then
  flip it on. See [ADR 0008 §3](../adr/0008-recover-auth-seam.md).

A product that runs **both** modes decides at runtime from whatever tells it
which mode it is in (invoice: install-base slug vs asset base). Concretely:

```ts
const transport = createNene2Transport({
  baseUrl: apiBasePath,
  tokenStore,
  onUnauthorized,
  // single/host mode → pass it; path mode → omit until #38:
  ...(isPathMode ? {} : { recoverAuth }),
});
```

Either way the migration itself is a **behavior-preserving refactor**: in path
mode you ship the wiring with `recoverAuth` withheld, decoupled from the
server-side `#38` fix; in single mode you turn it on and gain rotation-safe
silent refresh immediately.

## Verify

- Product build + type-check + tests green with the transport swapped in;
  the untouched caller files still compile (proof the signatures held).
- A 401 mid-session with `recoverAuth` **enabled** (host mode / tests): one
  refresh, request replays, no double refresh under concurrency.
- With `recoverAuth` **omitted** (path-mode gate): a 401 fails closed exactly as
  before — no behavior change.

## Reference

- Seam design & rationale: [ADR 0008](../adr/0008-recover-auth-seam.md)
- Transport API: `createNene2Transport`, `Nene2TransportConfig`,
  `Nene2Transport.recover`, `createSessionTokenStore` (JSDoc in
  `src/transport/`).
- Worked example: nene-invoice `frontend/src/shared/api/client.ts`.
