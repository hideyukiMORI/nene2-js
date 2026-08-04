/**
 * What a product hands the contract (issue #123).
 *
 * The contract does **not** take a built `apiClient`: the transport binds its
 * `fetch` at construction (see issue #105), so a pre-built client can no longer
 * be observed. It takes the product's *wiring* instead — the same values fleet
 * #232 identified as the ones a product can get wrong: client config, token
 * store, `onUnauthorized`, `recoverAuth`, per-request headers.
 */
import type { Nene2Transport, Nene2TransportConfig } from '../transport/transport.js';

/** Contract case identifiers. Stable — products reference them in exemptions. */
export type ContractCaseId =
  | 'C1-1'
  | 'C1-2'
  | 'C1-3'
  | 'C1-4'
  | 'C2-5'
  | 'C2-6'
  | 'C2-7'
  | 'C3-8'
  | 'C3-9'
  | 'C3-10'
  | 'C4-11'
  | 'C4-12'
  | 'C5-13';

/** Contract groups: mirror, token storage, 401/403, recovery, leakage. */
export type ContractGroup = 'C1' | 'C2' | 'C3' | 'C4' | 'C5';

export interface ContractWiringOptions {
  /**
   * When present, the product **must** build its token store against this
   * `Storage` instead of the ambient one (`createSessionTokenStore({ key,
   * storage })`, or the equivalent seam in an adapted store). Case C2-6 uses it
   * to hand the store a storage that throws on every access; a product that
   * ignores the override fails that case rather than silently skipping it.
   */
  readonly storage?: Storage | undefined;
}

/** One product's transport wiring, built fresh for every contract case. */
export interface ContractWiring {
  /**
   * The product's transport config. The contract overrides exactly one field —
   * `fetch` — and wraps `onUnauthorized` / `onForbidden` / `recoverAuth` so it
   * can observe them; every other value is the product's own.
   */
  readonly config: Nene2TransportConfig;
  /**
   * Seat a bearer token through the product's own sign-in path (whatever
   * `setToken` equivalent its store exposes). The contract never writes to
   * storage directly — that would test the harness, not the product.
   */
  seedToken(token: string): void;
  /**
   * Build the object the product's callers actually use. Defaults to
   * `createNene2Transport(config)`.
   *
   * Pass your own builder when `apiClient` is a **thin adapter** over the
   * transport (the shape the migration guide recommends): the contract then
   * exercises the surface your features call, so an adapter that bypasses the
   * transport on one path — the failure mode a package-internal test can never
   * see — shows up here.
   */
  readonly createTransport?: ((config: Nene2TransportConfig) => Nene2Transport) | undefined;
}

/**
 * Register a contract exemption. Modelled on AU-2 (fleet #69 F group): an
 * exemption is a *declaration with a reason*, never a silent skip, and it is
 * subtracted from the expected case count so the empty-run guard still sees it.
 *
 * 🔴 Use the **same exemption set as the L1 `localStorage` ban** — do not write
 * the same difference in two places. The one known fleet exemption today is
 * nene-records' cookie-based session (C2-5).
 */
export interface ContractExemption {
  /** Case this product is exempt from. */
  readonly caseId: ContractCaseId;
  /** Why the case does not apply. Free text, but it must say something. */
  readonly reason: string;
  /** Where the exemption was granted — issue / ADR reference. */
  readonly ref: string;
}

/** Minimal test-runner surface. Defaults to the ambient globals when omitted. */
export interface ContractRunner {
  describe(name: string, fn: () => void): void;
  it(name: string, fn: () => void | Promise<void>): void;
}

/**
 * How the product's feature code reaches the transport. Only the product knows
 * this, and the answer decides whether five of the cases measure anything.
 *
 * - `'adapter'` — features call your own `apiClient`. You **must** supply
 *   {@link ContractWiring.createTransport}; otherwise the contract builds a
 *   clean transport of its own and your adapter is never exercised.
 * - `'transport'` — features call the transport returned by
 *   `createNene2Transport` directly. There is no adapter to bypass, so the
 *   transport the contract builds *is* your call path.
 *
 * Measured (issue #125): with no `createTransport`, **C1-2, C3-9, C4-11, C4-12**
 * (and optional C5-13) stay green against a deliberately broken adapter. Their
 * real-world failure modes live in adapter code — one path bypassing the
 * transport, every 401 treated as a session expiry, a home-grown retry-on-401, a
 * transport rebuilt per request — none of which a config value can express.
 */
export type ContractSurface = 'transport' | 'adapter';

export interface TransportContractDeps {
  /**
   * Declare how features reach the transport. Required: an undeclared surface
   * would let four required cases pass for free. See {@link ContractSurface}.
   */
  readonly surface: ContractSurface;
  /**
   * Build the product's wiring. Called once per case so token state and hook
   * spies never leak between assertions.
   */
  createWiring(options: ContractWiringOptions): ContractWiring;
  /**
   * `Storage` the product's token store is expected to write to (case C2-5).
   * Defaults to the ambient `sessionStorage` — a browser-like test environment
   * (jsdom / happy-dom) is required unless C2-5 is exempted.
   */
  readonly sessionStorage?: Storage | undefined;
  /**
   * `Storage` the token must **never** appear in (case C2-5). Defaults to the
   * ambient `localStorage`.
   */
  readonly localStorage?: Storage | undefined;
  /** Declared, reasoned differences. See {@link ContractExemption}. */
  readonly exemptions?: readonly ContractExemption[] | undefined;
  /**
   * Optional cases to run in addition to the 12 required ones. `C5-13` (token
   * never appears in a URL) is optional because a product's wiring cannot
   * normally break it — it is cheap to run anyway.
   */
  readonly optional?: readonly ContractCaseId[] | undefined;
  /** Test runner. Defaults to the ambient `describe` / `it`. */
  readonly runner?: ContractRunner | undefined;
  /**
   * Product name used in the suite title and the version line, e.g. `nene-payout`.
   */
  readonly product?: string | undefined;
}
