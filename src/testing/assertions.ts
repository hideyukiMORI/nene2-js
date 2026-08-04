/**
 * Layer L-a — assertion parts (issue #123).
 *
 * Each helper runs exactly one contract case against a product's wiring and
 * throws {@link TransportContractError} on violation. Same shape as
 * `nene2-i18n`'s `expectCatalogParity`: call it inside your own `it()` when you
 * need finer control than the full suite.
 *
 * Prefer {@link runTransportContract} (layer L-b). It registers all of these as
 * real `it()`s, which is what makes "the contract actually ran, and nothing was
 * skipped" visible in the runner's output — an assertion helper called from
 * nowhere is indistinguishable from one that passes.
 */
import { CONTRACT_CASES, type ContractCase } from './cases.js';
import type { ContractCaseId, TransportContractDeps } from './deps.js';
import { TransportContractError } from './errors.js';

function caseById(id: ContractCaseId): ContractCase {
  const found = CONTRACT_CASES.find((contractCase) => contractCase.id === id);
  if (found === undefined) {
    throw new TransportContractError(`unknown contract case: ${id}`);
  }
  return found;
}

/**
 * Run a single contract case by id. The named helpers below are thin wrappers —
 * use this one when a product drives cases from data.
 */
export function expectTransportContractCase(
  id: ContractCaseId,
  deps: TransportContractDeps,
): Promise<void> {
  return caseById(id).run(deps);
}

/** C1-1 — every transport path sends `Authorization` and the `X-Authorization` mirror. */
export const expectAuthHeaderMirror = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C1-1', deps);

/** C1-2 — per-request headers cannot drop or overwrite the auth headers. */
export const expectAuthHeadersUnoverridable = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C1-2', deps);

/** C1-3 — a signed-out transport sends no auth headers. */
export const expectNoAuthHeadersWhenSignedOut = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C1-3', deps);

/** C1-4 — the token store is read on every request, so rotation is picked up. */
export const expectTokenReadPerRequest = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C1-4', deps);

/** C2-5 — the token lands in `sessionStorage` only, never in `localStorage`. */
export const expectTokenInSessionStorageOnly = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C2-5', deps);

/** C2-6 — the store fails closed when storage throws (privacy mode, blocked cookies). */
export const expectStorageFailureFailsClosed = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C2-6', deps);

/** C2-7 — `clearToken()` really signs the user out. */
export const expectClearTokenSignsOut = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C2-7', deps);

/** C3-8 — a 401 on an authenticated request clears the token and calls `onUnauthorized`. */
export const expectUnauthorizedClearsAndNotifies = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C3-8', deps);

/** C3-9 — a 401 without a token (wrong credentials) neither clears nor notifies. */
export const expectCredentialsUnauthorizedIsQuiet = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C3-9', deps);

/** C3-10 — a 403 keeps the token: still authenticated, merely not permitted. */
export const expectForbiddenKeepsToken = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C3-10', deps);

/** C4-11 — `recoverAuth` fails closed on `false`/throw and never loops. */
export const expectRecoveryFailsClosed = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C4-11', deps);

/** C4-12 — concurrent 401s collapse into a single recovery (rotation reuse-defense). */
export const expectConcurrentRecoveryCollapses = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C4-12', deps);

/** C5-13 (optional) — the bearer token never appears in a request URL. */
export const expectNoTokenInUrl = (deps: TransportContractDeps): Promise<void> =>
  expectTransportContractCase('C5-13', deps);
