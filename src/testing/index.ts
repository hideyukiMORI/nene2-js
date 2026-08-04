/**
 * `@hideyukimori/nene2-client/testing` — the fleet transport contract (issue #123).
 *
 * The package's own unit tests prove that **the package** is not broken. They
 * say nothing about whether a product's *wiring* is correct, and they never
 * reached the products anyway: they live in `tests/`, outside `files` (fleet
 * #232 measured 0 test files in every ship's `node_modules`).
 *
 * This subpath ships the other half — a contract a product runs against its own
 * transport config, token store and hooks:
 *
 * - **L-b** {@link runTransportContract} registers the whole contract as
 *   `describe`/`it`. Start here.
 * - **L-a** `expect*` helpers run one case each, for products that need finer
 *   control (same shape as `nene2-i18n`'s `expectCatalogParity`).
 *
 * See `docs/howto/transport-contract.md` for the product-side setup, including
 * how to ask for the check to become required.
 */
export {
  runTransportContract,
  SEAM_DEPENDENT_CASE_IDS,
  type TransportContractResult,
} from './contract.js';
export {
  expectAuthHeaderMirror,
  expectAuthHeadersUnoverridable,
  expectClearTokenSignsOut,
  expectConcurrentRecoveryCollapses,
  expectCredentialsUnauthorizedIsQuiet,
  expectForbiddenKeepsToken,
  expectNoAuthHeadersWhenSignedOut,
  expectNoTokenInUrl,
  expectRecoveryFailsClosed,
  expectStorageFailureFailsClosed,
  expectTokenInSessionStorageOnly,
  expectTokenReadPerRequest,
  expectTransportContractCase,
  expectUnauthorizedClearsAndNotifies,
} from './assertions.js';
export { CONTRACT_CASES, REQUIRED_CASE_IDS, type ContractCase } from './cases.js';
export { TransportContractError } from './errors.js';
export { NENE2_CLIENT_VERSION } from './version.js';
export { createHostileStorage, createMemoryStorage, type RecordedCall } from './harness.js';
export type {
  ContractCaseId,
  ContractSurface,
  ContractExemption,
  ContractGroup,
  ContractRunner,
  ContractWiring,
  ContractWiringOptions,
  TransportContractDeps,
} from './deps.js';
