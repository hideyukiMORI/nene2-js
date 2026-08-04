# How to run the transport contract in a product

`@hideyukimori/nene2-client/testing` ships a **contract test**: a suite you run
in your own repository, against your own transport wiring, from your own
`npm run check`.

It exists because this package's unit tests answer the wrong question. They
prove _the package_ is not broken. They say nothing about whether **your**
`apiClient`, token store and hooks are wired the way the fleet assumes — and
they never reached you anyway: they live in `tests/`, outside `files`. A fleet
audit read every product's `node_modules/@hideyukimori/nene2-client/` and found
**zero** test files in all of them ([fleet #232](https://github.com/hideyukiMORI/nene2-fleet-tooling/issues/232)).

## What it checks — 5 groups, 12 required cases

Selected from this package's 44 internal tests by one rule: _can a value the
**product** supplies break it?_ Checks of package internals (JSON parsing,
baseUrl normalisation) are deliberately not shipped — nothing you do can break
them, so they would be green forever and measure nothing.

| Case      | What must hold                                                                     |
| --------- | ---------------------------------------------------------------------------------- |
| **C1-1**  | Every transport path sends `Authorization` **and** the `X-Authorization` mirror    |
| **C1-2**  | Per-request headers cannot drop or overwrite the auth headers                      |
| **C1-3**  | A signed-out transport sends no auth headers at all                                |
| **C1-4**  | The token store is read on **every** request, so a rotated token is picked up      |
| **C2-5**  | The token lands in `sessionStorage` only — never `localStorage`                    |
| **C2-6**  | The store fails closed when storage throws (privacy mode, blocked cookies)         |
| **C2-7**  | `clearToken()` really signs the user out                                           |
| **C3-8**  | A 401 on an authenticated request clears the token **and** calls `onUnauthorized`  |
| **C3-9**  | A 401 _without_ a token (wrong credentials) neither clears nor notifies            |
| **C3-10** | A 403 keeps the token — still authenticated, merely not permitted                  |
| **C4-11** | `recoverAuth` fails closed on `false`/throw, and a replay never re-enters recovery |
| **C4-12** | Concurrent 401s collapse into a **single** recovery (rotation reuse-defense)       |
| C5-13     | _(optional)_ the bearer never appears in a request URL                             |

Each of the twelve has been proven to go **red** against a wiring that breaks
exactly that one thing — the cases are not accepted on reasoning alone.

## Setup — one file

```ts
// frontend/src/shared/api/transport.contract.test.ts
import { describe, it } from 'vitest';
import { createSessionTokenStore } from '@hideyukimori/nene2-client';
import { runTransportContract } from '@hideyukimori/nene2-client/testing';
import { buildTransportConfig } from './client'; // your own config factory

runTransportContract({
  product: 'nene-payout',
  runner: { describe, it },
  createWiring: ({ storage }) => {
    // `storage` is present only when the contract is forcing a storage failure.
    // Forward it — a store that ignores it cannot be checked for C2-6.
    const tokenStore = createSessionTokenStore({ key: 'nene_payout_token', storage });
    return {
      config: buildTransportConfig(tokenStore),
      seedToken: (token) => tokenStore.setToken(token),
    };
  },
});
```

That is the whole integration. The suite registers as ordinary `describe`/`it`,
so it runs under your existing `npm test` and shows up in the job log.

### If your `apiClient` is a thin adapter

Pass `createTransport` as well, and the contract exercises **the surface your
features actually call**:

```ts
createWiring: ({ storage }) => ({
  config: buildTransportConfig(tokenStore),
  seedToken: (token) => tokenStore.setToken(token),
  createTransport: (config) => makeApiClient(config), // your adapter
}),
```

This is the only way an adapter that bypasses the transport on one path — the
failure mode a package-internal test can never see — becomes visible.

### C2-5 needs a browser-like environment

`sessionStorage` / `localStorage` must exist. Use `environment: 'jsdom'` for the
contract file, or pass `sessionStorage` / `localStorage` in the deps. If neither
is available the case **fails loudly** rather than passing vacuously.

## Exemptions are declarations, not skips

A case that does not apply must be declared, with a reason and a reference:

```ts
runTransportContract({
  // …
  exemptions: [
    {
      caseId: 'C2-5',
      reason: 'cookie-based session (recognised fleet difference)',
      ref: 'nene-records#1031',
    },
  ],
});
```

- An exemption without a `reason` or a `ref` is **rejected** — that is the AU-2
  shape, and a silent skip is exactly what this whole exercise is about.
- The exempted case is still registered in the run output, so it is visible
  rather than a hole in the numbering.
- The count is subtracted explicitly, and the **empty-run guard** fails if the
  suite registers zero cases or fewer than expected. A contract that quietly
  shrinks keeps reporting success for work it stopped doing.

🔴 **Use the same exemption set as the L1 `localStorage` ban.** Do not write the
same difference in two places. The one known fleet exemption today is
nene-records' cookie session (C2-5).

## Which contract version ran

Every run prints one line:

```
[nene2-client/testing] transport contract v1.2.0 · nene-payout — 12 registered, 0 exempted
```

A contract test is a device whose job is to be green, so an **old** contract and
a **current** one look identical from the outside. A fleet measurement found 10
of 11 products still resolving 1.1.0 while 1.2.0 was published — caret ranges
allow an upgrade, but nothing happens until a lockfile moves. The version line is
what makes a stale pin visible; `runTransportContract` also returns it as
`result.version`.

## Rollout — three layers, and where each one ends

The point of a check is that something changes when it fails. That takes three
steps, and the middle one is a real state, not a formality:

1. **Ship it as report-only.** Add the contract file and let it run without
   blocking merges (the `reportOnly` posture from
   [#195](https://github.com/hideyukiMORI/nene-payout/issues/195)). You see your
   own violations; nobody is stopped mid-flight.
2. **Fix what it found, until your own branch is green.**
3. **Ask for it to become required.** ← this is the step that is easy to skip

### Requesting a required check

Branch protection is a hub seam — a product repository cannot promote its own
check. **Trigger on a state you can observe yourself: the moment the contract is
green on your default branch, send the request.** Do not wait for a fleet-wide
event; a fleet-wide trigger is one nobody is responsible for noticing.

Send hub a relay message (or open an issue in the fleet tooling repo) with:

- repository and workflow name;
- the exact **job name** to add to required checks;
- a link to a run where the contract is green, with the registered/exempted
  counts from the version line;
- any exemptions you declared, with their refs.

Until the check is required, a failure is information. After it, a failure blocks
the merge — which is the only state where the contract actually holds.

## Using a single case on its own (layer L-a)

Every case is also exported as an assertion helper, the same shape as
`nene2-i18n`'s `expectCatalogParity`:

```ts
import { expectAuthHeaderMirror } from '@hideyukimori/nene2-client/testing';

it('mirrors the bearer on every path', async () => {
  await expectAuthHeaderMirror(deps);
});
```

Use these when you need finer control. Prefer `runTransportContract` otherwise:
a helper nobody calls looks exactly like one that passes, whereas a registered
`it()` can be counted — and "ran, skip 0" is the thing the fleet is measuring.

## See also

- [`migrate-product-client`](./migrate-product-client.md) — getting onto the
  transport seam in the first place
- [ADR 0008](../adr/0008-recover-auth-seam.md) — the `recoverAuth` seam the C4
  cases cover
- README **Transport headers** — the `X-Authorization` mirror and its opt-out
