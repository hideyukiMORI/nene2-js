# ADR 0008 — `recoverAuth` seam: opt-in silent-refresh + single replay on 401

**Status:** Accepted (2026-07-16 — hub standards checkpoint)
**Date:** 2026-07-16
**Issue:** [#107](https://github.com/hideyukiMORI/nene2-js/issues/107) (nene2-js) · board (B) W2b · root fix tracked as `_work/issues.md` **#38** (workspace-issues layer; fix lands in nene-invoice's backend — **not** GitHub `nene-invoice#38`, which is unrelated org-CRUD, merged)

---

## Context

`createNene2Transport` (#102, v1.1.0) is the fleet-standard frontend transport.
Today its 401 policy is **fail-closed only**: on a 401 for an authenticated
request it clears the token store and fires `onUnauthorized` — there is no
attempt to recover the session before giving up (`src/transport/transport.ts`
`send()`).

Every product that supports **silent re-authentication** (rotate the httpOnly
refresh cookie for a fresh in-memory access token, then replay the failed
request) therefore keeps hand-rolling that flow _outside_ the transport. The
reference implementation is nene-invoice
`frontend/src/shared/api/client.ts`, which W2b (board (B), due 2026-08-08)
wants to migrate onto this transport. Its flow — the requirements the seam
must satisfy — is:

1. **Silent refresh + single replay.** On a 401 for a signed-in caller, POST
   the install-base-prefixed `/auth/refresh` (double-submit CSRF: read the
   readable `ni_csrf` cookie → `X-CSRF-Token` header), seat the returned
   `{ token }`, then replay the original request **once** (`isRetry` guard).
   Applies to every verb (JSON, blob, CSV string, raw bytes).
2. **Single-flight de-duplication.** Concurrent 401s (plus an app-start probe)
   share **one** in-flight refresh (`refreshInFlight` singleton). This is not a
   nicety: under refresh-token **rotation**, N parallel refreshes each consume
   and rotate the token, and all but the first look like **token reuse** →
   server `revokeFamily` → hard logout. De-dup is a correctness requirement.
3. **No recursion.** The refresh/logout endpoints never themselves trigger a
   refresh-retry.
4. **App-defined mechanics.** The endpoint path, the CSRF cookie/header names,
   and the response body shape are product/contract specifics. The transport
   must stay CSRF- and endpoint-agnostic (same principle as the generic
   error model, ADR 0005, and the auth-header choke point, `headers.ts`).

### The `#38` constraint (why this is opt-in, not the default)

`_work/issues.md` **#38** (path-mode `RefreshHandler`; the fix lands in
nene-invoice's backend — distinct from the merged GitHub `nene-invoice#38`): on
rotation the server reissues
`ni_refresh` at the **install base with the slug stripped**
(`BasePath::fromRequest()` → `Path=/auth`, not `Path=/{slug}/auth`). In
**path-scoped multi-tenant** mode the rotated cookie is then never sent to
`/{slug}/auth/refresh`, so silent refresh works exactly **once**; the next
refresh replays a consumed token → reuse detection → `revokeFamily` → 401.
`ACCESS_TOKEN_TTL_SECONDS=3600` is fixed. This is latent in production only
because path-mode is not yet used there (handoff
`_work/handoff-invoice-demo-2026-07-07.md` §将来/潜在課題).

**A perfectly correct client-side seam cannot fix `#38`** — the bug is the
server's cookie `Path`. Standardizing "silent refresh + replay" as the fleet
**default** would therefore make path-mode multi-tenant consumers _worse off_
(one-shot-then-hard-logout, possibly family revocation) than the current
fail-closed behavior. Root fix is server-side: nene-invoice **案B** (keep the
rotation cookie scoped to the slug `Path`), or 案C (subdomain host isolation).

hide ruling 2026-07-14 = **方針B**: ship the seam now with _future
standardization noted_ and a _promotion gate_.

## Decision

### 1. Add an opt-in `recoverAuth` seam to `Nene2TransportConfig`

```ts
/**
 * Attempt to recover an expired session on a 401 for an authenticated request,
 * BEFORE the token is cleared. Return true when a fresh token has been seated
 * in the token store — the transport then replays the original request exactly
 * once. Return false to fail closed (clear token + onUnauthorized, as today).
 *
 * The transport single-flights concurrent calls: a burst of parallel 401s
 * awaits one shared recovery (required under refresh-token rotation). The
 * replayed request never re-enters recovery. The recovery request itself MUST
 * bypass this transport instance's recovery path — issue it with a bare fetch
 * or a transport configured without `recoverAuth` — otherwise it awaits itself.
 */
readonly recoverAuth?: (() => Promise<boolean>) | undefined;
```

- **Default `undefined` ⇒ zero behavior change.** Every current consumer keeps
  today's fail-closed 401 policy. No breaking change; ships in a **minor**.
- Fires only on **401** with a token attached, and only when the request is not
  itself a recovery replay. 403 and the token-clear policy are unchanged.
- The transport owns **single-flight + one replay**; the app owns the refresh
  **mechanics** (endpoint, CSRF, body parsing, seating the new token via its
  `TokenStore.setToken`). Boolean in / boolean out keeps the transport generic.

### 1b. Expose `transport.recover()` — single-flight is reuse-defense, not an optimization

The single-flight **must be owned by the transport and shared by every caller**,
including the app-start session probe. This is a **correctness requirement under
refresh-token rotation**, verified in the consumer backend
(`nene-invoice/src/Auth/RefreshSessionUseCase.php`): `/auth/refresh` _rotates the
refresh token within its family, and presenting an already-rotated/consumed token
burns the whole lineage_ (`RefreshTokenReuseException`). So **two concurrent
`/auth/refresh` calls hard-log-out the user**: the second presents the token the
first just rotated away → reuse → `revokeFamily` → 401.

After a reload the in-memory access token is gone but the refresh cookie may live;
the app fires a boot probe to restore the session. If that probe calls the app's
`recoverAuth` **directly**, it bypasses the transport's single-flight and can race
an early 401-retry → two `/auth/refresh` in flight → family revoke. Therefore:

```ts
interface Nene2Transport {
  // …existing verbs…
  /**
   * Run the configured `recoverAuth` through the transport's single-flight and
   * report whether a token was seated. The app-start session probe MUST call
   * this (not `recoverAuth` directly) so the probe and any concurrent 401-retry
   * share ONE in-flight recovery — concurrent refreshes trip server-side reuse
   * defense (family revocation). Resolves false when no `recoverAuth` is set.
   */
  recover(): Promise<boolean>;
}
```

`recover()` and the internal 401-retry share the **same** `Promise<boolean> | null`.
`recoverAuth` stays app-owned and idempotent; the transport is the sole owner of
the single-flight that makes it reuse-safe.

### 2. `send()` flow (sketch)

```
response = fetch(...)
if !ok && status == 401 && tokenAttached && recoverAuth && !isReplay:
    recovered = await sharedRecovery()      // single-flight; see §1
    if recovered: return send(..., isReplay=true)   // one replay, fresh token
# unchanged fail-closed path:
if tokenAttached && clearTokenOnStatuses.includes(status): clearToken()
fire onUnauthorized / onForbidden; throw Nene2ClientError
```

`sharedRecovery()` holds a closure-level `Promise<boolean> | null`, created on
first 401 and cleared when it settles; all overlapping 401s await it.

### 3. Promotion gate (方針B)

`recoverAuth` ships **opt-in / experimental** and is documented as the intended
**future fleet standard** for silent re-auth. It is promoted from opt-in to the
recommended default **only when both hold**:

- **(a) W2b complete** — nene-invoice migrated onto the transport seam and green
  (demo-gated), proving the API in a real consumer.
- **(b) `#38` root fix designed & landed** — server keeps the rotation cookie
  slug-scoped (案B), so path-mode multi-tenant silent refresh survives rotation.

Until (b), docs MUST warn: **do not enable `recoverAuth` for path-scoped
multi-tenant deployments** (host/single-tenant mode is safe now — invoice
production is not yet path-mode).

## Consequences

### Positive

- Deletes the hand-rolled refresh/replay/dedup from every consumer (invoice
  first); one audited implementation of the rotation-safe single-flight.
- No behavior change for non-adopters; safe minor release.
- Transport stays CSRF/endpoint-agnostic — the seam is a boolean callback.
- The promotion gate ties fleet-wide standardization to the `#38` root fix, so
  we never quietly regress path-mode tenants.
- **The consumer's other must-keep behaviors are already transport-native**,
  because recovery lives inside `send()` — the sole `fetch` choke point that
  _every_ verb routes through: (a) the **X-Authorization mirror** is set for all
  requests in `headers.ts` (defends the HETEML Tier-A proxy that strips
  `Authorization`); (b) **blob GET** (`getBlob`) and (c) **raw-bytes POST**
  (`postBytes`, sends a `Blob` un-re-encoded — required for Shift_JIS bank CSVs)
  both go through `send()`, so they inherit recovery + replay with no extra
  wiring. The seam adds nothing that could drop these.

### Negative / trade-offs

- The app still writes the refresh mechanics (CSRF, endpoint, body). The seam
  standardizes _orchestration_ (when/dedup/replay), not the _call_. Acceptable:
  those parts are genuinely product-specific.
- "Recovery request must bypass its own transport" is a footgun; mitigated by
  doc + a re-entrancy guard, and by recommending a bare fetch (invoice's shape).
- Two-condition promotion gate spans repos (nene2-js + nene-invoice backend);
  needs tracking so the gate is actually revisited.

## Alternatives considered

- **Bake refresh into the transport** (config: endpoint + CSRF names + body
  path). Rejected: pushes product/contract specifics into the generic transport
  (against ADR 0005 / `headers.ts` choke-point principle) and still can't fix
  `#38`.
- **Make silent-refresh the default now.** Rejected: regresses path-mode
  multi-tenant consumers until `#38` is fixed server-side (the whole reason for
  the gate).
- **Token-getter that returns a Promise** (transport awaits a refreshing token
  provider). Rejected: hides the 401→refresh causality and the single-replay
  bound; harder to reason about rotation reuse.

## Open questions (for review)

1. ~~**App-start probe** app-side vs shared single-flight?~~ **Resolved
   (2026-07-16, invoice consumer review):** the probe **must** share the
   transport's single-flight → expose `transport.recover()` (see §1b). Driven by
   reuse-defense correctness, not preference. `recoverAuth` stays app-owned.
2. ~~**Retry statuses.**~~ **Resolved (hub, 2026-07-16): 401 only.** 401 is the
   sole authentication-failure signal; replaying other statuses risks
   misfire. `recoverAuthOnStatuses` is not added in v1 — revisit on real need.
3. ~~**Naming.**~~ **Resolved (hub, 2026-07-16): keep `recoverAuth`** (board term).
4. ~~**Interaction with #105/#106.**~~ **Resolved (hub, 2026-07-16): independent** —
   the seam does not touch URL building; no ordering dependency.
5. ~~**Production `invoice.ayane.co.jp` tenancy mode.**~~ **Resolved from code
   (hub, 2026-07-16): `path`.** `.env.example:12` defaults to `single`, but
   `:20` documents that the disposable-org **demo** requires
   `TENANT_RESOLUTION=path` (else `soleOrgFallback` collapses all users into one
   org), and `invoice.ayane.co.jp` **is** that demo
   (`invoice.ayane.co.jp/demo/{template}`). So the current production deploy runs
   **path** → `recoverAuth` activation waits for `#38` (gated), exactly as
   designed. **Note for adopters:** the gate absorbs both tenancy modes —
   _current deploy = demo = path = under the gate_; a _future single-tenant
   production_ domain would be `#38`-independent (single mode has no path-mode
   rotation bug) and could enable `recoverAuth` without waiting on `#38`. The
   absolute server-`.env` value is a deploy-time fact, but it is **not** an ADR
   blocker — the gate covers either mode.
