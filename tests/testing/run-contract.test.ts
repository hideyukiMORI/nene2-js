/**
 * `runTransportContract` is layer L-b: it must register real `describe`/`it`s
 * (so the run is visible and countable), guard itself against shrinking to
 * nothing, and refuse an exemption that does not say why (issue #123).
 */
import { describe, expect, it, vi } from 'vitest';
import {
  runTransportContract,
  TransportContractError,
  NENE2_CLIENT_VERSION,
} from '../../src/testing/index.js';
import { assertContractCoverage } from '../../src/testing/contract.js';
import type { ContractExemption, ContractRunner } from '../../src/testing/deps.js';
import { createFixtureDeps } from './fixtures.js';

interface Recorded {
  readonly suites: string[];
  readonly cases: Array<{ name: string; fn: () => void | Promise<void> }>;
  readonly runner: ContractRunner;
}

function recordingRunner(): Recorded {
  const suites: string[] = [];
  const cases: Array<{ name: string; fn: () => void | Promise<void> }> = [];
  return {
    suites,
    cases,
    runner: {
      describe(name, fn) {
        suites.push(name);
        fn();
      },
      it(name, fn) {
        cases.push({ name, fn });
      },
    },
  };
}

const RECORDS_EXEMPTION: ContractExemption = {
  caseId: 'C2-5',
  reason: 'cookie-based session (recognised fleet difference)',
  ref: 'nene-records#1031',
};

describe('runTransportContract — registration', () => {
  it('registers the 12 required cases plus the guard, and stamps the version', () => {
    const recorded = recordingRunner();
    const result = runTransportContract({
      ...createFixtureDeps(),
      runner: recorded.runner,
      product: 'fixture-product',
    });

    expect(result.registered).toHaveLength(12);
    expect(result.version).toBe(NENE2_CLIENT_VERSION);
    expect(result.exemptedCount).toBe(0);
    expect(recorded.suites).toStrictEqual([
      `NENE2 transport contract v${NENE2_CLIENT_VERSION} · fixture-product`,
    ]);
    expect(recorded.cases).toHaveLength(13);
    expect(recorded.cases[12]?.name).toContain('empty-run guard');
  });

  it('adds C5-13 only when it is opted into', () => {
    const recorded = recordingRunner();
    const result = runTransportContract({
      ...createFixtureDeps(),
      runner: recorded.runner,
      optional: ['C5-13'],
    });
    expect(result.registered).toContain('C5-13');
    expect(result.registered).toHaveLength(13);
  });

  it('actually executes every registered case against the product', async () => {
    const recorded = recordingRunner();
    runTransportContract({ ...createFixtureDeps(), runner: recorded.runner });
    for (const registered of recorded.cases) {
      await expect(
        Promise.resolve(registered.fn()),
        `${registered.name} failed`,
      ).resolves.not.toThrow();
    }
  });

  it('reports the contract version on stdout so a probe can spot a stale pin', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    try {
      runTransportContract({ ...createFixtureDeps(), runner: recordingRunner().runner });
      expect(info).toHaveBeenCalledWith(
        expect.stringContaining(`transport contract v${NENE2_CLIENT_VERSION}`),
      );
    } finally {
      info.mockRestore();
    }
  });

  it('falls back to the ambient describe/it when no runner is passed', () => {
    const recorded = recordingRunner();
    const ambient = globalThis as { describe?: unknown; it?: unknown };
    const previous = { describe: ambient.describe, it: ambient.it };
    ambient.describe = recorded.runner.describe.bind(recorded.runner);
    ambient.it = recorded.runner.it.bind(recorded.runner);
    try {
      const result = runTransportContract(createFixtureDeps());
      expect(result.registered).toHaveLength(12);
    } finally {
      ambient.describe = previous.describe;
      ambient.it = previous.it;
    }
  });

  it('explains itself when no runner can be found', () => {
    const ambient = globalThis as { describe?: unknown; it?: unknown };
    const previous = { describe: ambient.describe, it: ambient.it };
    ambient.describe = undefined;
    ambient.it = undefined;
    try {
      expect(() => runTransportContract(createFixtureDeps())).toThrow(/no test runner found/);
    } finally {
      ambient.describe = previous.describe;
      ambient.it = previous.it;
    }
  });
});

describe('runTransportContract — exemptions are declarations, not skips', () => {
  it('subtracts a declared exemption and keeps it visible in the run', () => {
    const recorded = recordingRunner();
    const result = runTransportContract({
      ...createFixtureDeps(),
      runner: recorded.runner,
      exemptions: [RECORDS_EXEMPTION],
    });

    expect(result.registered).not.toContain('C2-5');
    expect(result.registered).toHaveLength(11);
    expect(result.exemptedCount).toBe(1);
    expect(recorded.cases.map((entry) => entry.name)).toContainEqual(
      expect.stringContaining('C2-5 exempted — cookie-based session'),
    );
    // The guard still passes: the subtraction was accounted for, not silent.
    expect(() => recorded.cases[recorded.cases.length - 1]?.fn()).not.toThrow();
  });

  it('rejects an exemption with no reason', () => {
    expect(() =>
      runTransportContract({
        ...createFixtureDeps(),
        runner: recordingRunner().runner,
        exemptions: [{ caseId: 'C2-5', reason: '   ', ref: 'nene-records#1031' }],
      }),
    ).toThrow(/no reason/);
  });

  it('rejects an exemption with no ref', () => {
    expect(() =>
      runTransportContract({
        ...createFixtureDeps(),
        runner: recordingRunner().runner,
        exemptions: [{ caseId: 'C2-5', reason: 'cookie session', ref: '' }],
      }),
    ).toThrow(/no ref/);
  });

  it('rejects an unknown case id', () => {
    expect(() =>
      runTransportContract({
        ...createFixtureDeps(),
        runner: recordingRunner().runner,
        exemptions: [{ caseId: 'C9-99' as ContractExemption['caseId'], reason: 'x', ref: 'y' }],
      }),
    ).toThrow(/unknown case id/);
  });

  it('rejects a duplicate exemption', () => {
    expect(() =>
      runTransportContract({
        ...createFixtureDeps(),
        runner: recordingRunner().runner,
        exemptions: [RECORDS_EXEMPTION, RECORDS_EXEMPTION],
      }),
    ).toThrow(/duplicate exemption/);
  });

  it('does not miscount an exemption for a case that was never in scope', () => {
    const recorded = recordingRunner();
    const result = runTransportContract({
      ...createFixtureDeps(),
      runner: recorded.runner,
      // C5-13 is optional and not opted into — exempting it must not shrink the
      // expected count and trip the guard.
      exemptions: [{ caseId: 'C5-13', reason: 'not applicable', ref: '#123' }],
    });
    expect(result.registered).toHaveLength(12);
    expect(() => recorded.cases[recorded.cases.length - 1]?.fn()).not.toThrow();
  });
});

describe('empty-run guard', () => {
  it('fails when every case was exempted away', () => {
    const recorded = recordingRunner();
    const everything: ContractExemption[] = (
      [
        'C1-1',
        'C1-2',
        'C1-3',
        'C1-4',
        'C2-5',
        'C2-6',
        'C2-7',
        'C3-8',
        'C3-9',
        'C3-10',
        'C4-11',
        'C4-12',
      ] as const
    ).map((caseId) => ({ caseId, reason: 'exempt everything', ref: '#123' }));

    const result = runTransportContract({
      ...createFixtureDeps(),
      runner: recorded.runner,
      exemptions: everything,
    });
    expect(result.registered).toHaveLength(0);

    const guard = recorded.cases[recorded.cases.length - 1];
    expect(() => guard?.fn()).toThrow(/registered zero cases/);
  });

  it('fails when the suite shrinks without an exemption', () => {
    expect(() =>
      assertContractCoverage(11, 12, { required: 12, optional: 0, exempted: 0 }),
    ).toThrow(TransportContractError);
    expect(() =>
      assertContractCoverage(11, 12, { required: 12, optional: 0, exempted: 0 }),
    ).toThrow(/registered 11 cases but expected 12/);
  });

  it('passes when the counts line up', () => {
    expect(() =>
      assertContractCoverage(11, 11, { required: 12, optional: 0, exempted: 1 }),
    ).not.toThrow();
  });
});
