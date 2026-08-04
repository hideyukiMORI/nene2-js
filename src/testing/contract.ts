/**
 * Layer L-b — the contract suite (issue #123).
 *
 * `runTransportContract(deps)` registers `describe`/`it` for every contract case,
 * so the cases appear in the runner's own output. That is the whole point: an
 * assertion helper that nobody calls looks exactly like one that passes, whereas
 * a registered `it()` can be counted and its skips seen. The fleet completion
 * condition is "ran, skip 0" — only a registered suite can show that.
 *
 * The suite also guards itself: a run that registers zero cases, or fewer than
 * expected, fails. Exemptions are subtracted explicitly, never silently.
 */
import { CONTRACT_CASES, REQUIRED_CASE_IDS, type ContractCase } from './cases.js';
import type {
  ContractCaseId,
  ContractExemption,
  ContractRunner,
  ContractSurface,
  TransportContractDeps,
} from './deps.js';
import { TransportContractError } from './errors.js';
import { NENE2_CLIENT_VERSION } from './version.js';

/** What {@link runTransportContract} reports back to the caller. */
export interface TransportContractResult {
  /**
   * Version of `@hideyukimori/nene2-client` that supplied the contract. A ship
   * pinned to an old lockfile runs an old contract and is green either way, so
   * the version is the only thing that distinguishes them (fleet #232).
   */
  readonly version: string;
  readonly product: string | undefined;
  /** Declared call path. Lets a fleet audit ask whether `'transport'` is true. */
  readonly surface: ContractSurface;
  /** Case ids actually registered as `it()`s. */
  readonly registered: readonly ContractCaseId[];
  /** Declared, reasoned exemptions that removed cases from the run. */
  readonly exempted: readonly ContractExemption[];
  /** How many cases were expected after subtracting exemptions. */
  readonly expectedCount: number;
  /** Convenience mirror of `exempted.length`, the visible subtraction. */
  readonly exemptedCount: number;
}

interface AmbientRunner {
  describe?: unknown;
  it?: unknown;
}

function resolveRunner(runner: ContractRunner | undefined): ContractRunner {
  if (runner !== undefined) {
    return runner;
  }
  const ambient = globalThis as AmbientRunner;
  if (typeof ambient.describe === 'function' && typeof ambient.it === 'function') {
    return ambient as unknown as ContractRunner;
  }
  throw new TransportContractError(
    "no test runner found. Either enable your runner's globals (vitest " +
      '`test.globals: true`) or pass them explicitly: ' +
      'runTransportContract({ ...deps, runner: { describe, it } }).',
  );
}

const KNOWN_CASE_IDS = new Set<string>(CONTRACT_CASES.map((contractCase) => contractCase.id));

/**
 * Validate exemptions in the AU-2 shape: a declared difference carries a reason
 * and a reference, or it is not a difference — it is a hole.
 */
function validateExemptions(exemptions: readonly ContractExemption[]): void {
  const seen = new Set<string>();
  for (const exemption of exemptions) {
    if (!KNOWN_CASE_IDS.has(exemption.caseId)) {
      throw new TransportContractError(
        `exemption references an unknown case id: ${exemption.caseId}. Known ids: ` +
          [...KNOWN_CASE_IDS].join(', '),
      );
    }
    if (exemption.reason.trim() === '') {
      throw new TransportContractError(
        `exemption for ${exemption.caseId} has no reason. An exemption without a reason is a ` +
          'silent skip.',
      );
    }
    if (exemption.ref.trim() === '') {
      throw new TransportContractError(
        `exemption for ${exemption.caseId} has no ref. Point at the issue or ADR that granted ` +
          'it, so the exemption can be revisited.',
      );
    }
    if (seen.has(exemption.caseId)) {
      throw new TransportContractError(`duplicate exemption for ${exemption.caseId}`);
    }
    seen.add(exemption.caseId);
  }
}

/** Cases whose real failure mode lives in adapter code (measured — issue #125). */
export const SEAM_DEPENDENT_CASE_IDS: readonly ContractCaseId[] = [
  'C1-2',
  'C3-9',
  'C4-11',
  'C4-12',
  'C5-13',
];

/**
 * Check the declared surface against what the wiring actually supplies.
 *
 * Without `createTransport` the contract builds its own clean transport, and the
 * five seam-dependent cases then assert against the package rather than the
 * product — green for free, which is the exact failure this whole contract
 * exists to stop. So the product has to say which it is; nobody else can know.
 *
 * @internal
 */
export function assertSurfaceMatchesWiring(
  surface: ContractSurface | undefined,
  hasCreateTransport: boolean,
): void {
  const measured = SEAM_DEPENDENT_CASE_IDS.join(', ');
  if (surface === undefined) {
    throw new TransportContractError(
      'runTransportContract needs `surface`. Declare how your feature code reaches the ' +
        "transport: `surface: 'adapter'` (features call your own apiClient — then also pass " +
        "`createTransport` in the wiring) or `surface: 'transport'` (features call the " +
        'transport directly). This is not paperwork: without the adapter seam, ' +
        `${measured} stay green against a deliberately broken adapter (measured, #125).`,
    );
  }
  if (surface === 'adapter' && !hasCreateTransport) {
    throw new TransportContractError(
      "surface: 'adapter' was declared but the wiring supplies no `createTransport`. The " +
        'contract would build its own transport and never touch your adapter, so ' +
        `${measured} would pass without measuring anything. Return ` +
        '`createTransport: (config) => makeApiClient(config)` from `createWiring`.',
    );
  }
  if (surface === 'transport' && hasCreateTransport) {
    throw new TransportContractError(
      "surface: 'transport' was declared but the wiring supplies a `createTransport` " +
        "builder. Pick the one that is true: declare 'adapter' if features call that " +
        'builder, or drop it if they call the transport directly.',
    );
  }
}

/**
 * The empty-run guard, as a plain function so it can be tested directly — a
 * guard that is only reachable through a passing suite is itself unguarded.
 *
 * Fails on zero (a contract that asserts nothing is green for free) **and** on
 * "fewer than expected" (#222 landing 2: a suite that quietly shrinks keeps
 * reporting success for work it stopped doing).
 *
 * @internal
 */
export function assertContractCoverage(
  registeredCount: number,
  expectedCount: number,
  detail: { readonly required: number; readonly optional: number; readonly exempted: number },
): void {
  if (registeredCount === 0) {
    throw new TransportContractError(
      'the transport contract registered zero cases. Either every case was exempted, or the ' +
        'deps were not wired — a contract that asserts nothing is green for free.',
    );
  }
  if (registeredCount !== expectedCount) {
    throw new TransportContractError(
      `the transport contract registered ${String(registeredCount)} cases but expected ` +
        `${String(expectedCount)} (${String(detail.required)} required + ` +
        `${String(detail.optional)} optional − ${String(detail.exempted)} exempted). ` +
        'Cases must not disappear without an exemption.',
    );
  }
}

/**
 * Register the fleet transport contract against a product's wiring.
 *
 * @example
 * ```ts
 * // frontend/src/shared/api/transport.contract.test.ts
 * import { runTransportContract } from '@hideyukimori/nene2-client/testing';
 * import { describe, it } from 'vitest';
 *
 * runTransportContract({
 *   product: 'nene-payout',
 *   surface: 'adapter', // features call the product's apiClient
 *   runner: { describe, it },
 *   createWiring: ({ storage }) => {
 *     const tokenStore = createSessionTokenStore({ key: 'nene_payout_token', storage });
 *     return {
 *       config: buildTransportConfig(tokenStore), // the product's own config
 *       seedToken: (token) => tokenStore.setToken(token),
 *     };
 *   },
 * });
 * ```
 */
export function runTransportContract(deps: TransportContractDeps): TransportContractResult {
  const runner = resolveRunner(deps.runner);
  assertSurfaceMatchesWiring(deps.surface, deps.createWiring({}).createTransport !== undefined);
  const exemptions = deps.exemptions ?? [];
  validateExemptions(exemptions);

  const exemptIds = new Set<ContractCaseId>(exemptions.map((exemption) => exemption.caseId));
  const optionalIds = new Set<ContractCaseId>(deps.optional ?? []);

  // Cases this product is in scope for, before exemptions.
  const eligible: ContractCase[] = CONTRACT_CASES.filter(
    (contractCase) => contractCase.required || optionalIds.has(contractCase.id),
  );
  const selected = eligible.filter((contractCase) => !exemptIds.has(contractCase.id));

  // Expected count is derived from the contract, not from what we selected —
  // otherwise the guard would happily agree with whatever the run produced. Only
  // exemptions for cases that were actually in scope subtract anything.
  const optionalSelectedCount = eligible.filter((contractCase) => !contractCase.required).length;
  const applicableExemptions = exemptions.filter((exemption) =>
    eligible.some((contractCase) => contractCase.id === exemption.caseId),
  ).length;
  const expectedCount = REQUIRED_CASE_IDS.length + optionalSelectedCount - applicableExemptions;

  const label = deps.product === undefined ? '' : ` · ${deps.product}`;
  const registered: ContractCaseId[] = [];

  runner.describe(`NENE2 transport contract v${NENE2_CLIENT_VERSION}${label}`, () => {
    for (const contractCase of selected) {
      registered.push(contractCase.id);
      runner.it(contractCase.title, async () => {
        await contractCase.run(deps);
      });
    }

    for (const exemption of exemptions) {
      // Registered as a real case so the exemption is visible in the run output
      // rather than being a hole in the numbering.
      runner.it(
        `${exemption.caseId} exempted — ${exemption.reason} (${exemption.ref})`,
        () => undefined,
      );
    }

    runner.it('registers the full contract (empty-run guard)', () => {
      assertContractCoverage(registered.length, expectedCount, {
        required: REQUIRED_CASE_IDS.length,
        optional: optionalSelectedCount,
        exempted: applicableExemptions,
      });
    });
  });

  const result: TransportContractResult = {
    version: NENE2_CLIENT_VERSION,
    product: deps.product,
    surface: deps.surface,
    registered,
    exempted: exemptions,
    expectedCount,
    exemptedCount: exemptions.length,
  };

  // One line, so a probe reading the job log can tell which contract version
  // actually ran. Old contract and new contract are both green; only this differs.
  console.info(
    `[nene2-client/testing] transport contract v${NENE2_CLIENT_VERSION}` +
      `${label} — surface:${deps.surface}, ${String(registered.length)} registered, ` +
      `${String(exemptions.length)} exempted`,
  );

  return result;
}
