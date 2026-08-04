/**
 * Failure type raised by every contract assertion (issue #123).
 *
 * The L-a helpers throw rather than depending on a test runner's `expect`, the
 * same posture as `nene2-i18n`'s `expectCatalogParity`. That keeps `./testing`
 * runner-agnostic: the package never imports vitest, and a product can call a
 * single helper inside its own `it()` when it needs finer control.
 */
export class TransportContractError extends Error {
  /** Contract case this failure belongs to, e.g. `C1-1`. */
  readonly caseId: string | undefined;

  constructor(message: string, caseId?: string) {
    super(message);
    this.name = 'TransportContractError';
    this.caseId = caseId;
  }
}

/** @internal Throw a {@link TransportContractError} when `condition` is false. */
export function assertContract(
  condition: boolean,
  message: string,
  caseId?: string,
): asserts condition {
  if (!condition) {
    throw new TransportContractError(message, caseId);
  }
}
