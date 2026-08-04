/**
 * The contract is a device whose job is to be green, so "it passed" proves
 * nothing on its own. Every case therefore gets both directions: it passes
 * against a conforming product, and it **fails** against a product that breaks
 * exactly that one thing (issue #123, work order item 5 — no case is accepted on
 * reasoning alone).
 */
import { describe, expect, it } from 'vitest';
import { CONTRACT_CASES, TransportContractError } from '../../src/testing/index.js';
import type { ContractCaseId } from '../../src/testing/deps.js';
import { createFixtureDeps, type FixtureKnobs } from './fixtures.js';

const REQUIRED_IDS: readonly ContractCaseId[] = CONTRACT_CASES.filter((c) => c.required).map(
  (c) => c.id,
);

function runCase(id: ContractCaseId, knobs: FixtureKnobs = {}): Promise<void> {
  const contractCase = CONTRACT_CASES.find((candidate) => candidate.id === id);
  if (contractCase === undefined) {
    throw new Error(`no such case: ${id}`);
  }
  return contractCase.run(createFixtureDeps(knobs));
}

describe('transport contract — the shape of the contract itself', () => {
  it('is 12 required cases across C1–C4, plus optional C5', () => {
    expect(REQUIRED_IDS).toStrictEqual([
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
    ]);
    expect(CONTRACT_CASES.filter((c) => !c.required).map((c) => c.id)).toStrictEqual(['C5-13']);
  });
});

describe('transport contract — passes against a conforming product', () => {
  for (const contractCase of CONTRACT_CASES) {
    it(`${contractCase.id} passes`, async () => {
      await expect(runCase(contractCase.id)).resolves.toBeUndefined();
    });
  }
});

/**
 * One deliberately broken wiring per case. Each knob models a mistake a product
 * has actually made or could plausibly make — not a synthetic tripwire.
 */
const BREAKS: ReadonlyArray<{
  readonly id: ContractCaseId;
  readonly what: string;
  readonly knobs: FixtureKnobs;
  readonly messageIncludes: string;
}> = [
  {
    id: 'C1-1',
    what: 'the product opts out of the X-Authorization mirror',
    knobs: { dropMirror: true },
    messageIncludes: 'X-Authorization mirror',
  },
  {
    id: 'C1-2',
    what: 'an adapter merges caller headers after the auth headers',
    knobs: { forgeAuthPerRequest: true },
    messageIncludes: 'overwrote',
  },
  {
    id: 'C1-3',
    what: 'clearToken() is a no-op, so a signed-out app keeps sending the bearer',
    knobs: { ignoreClearToken: true, preseed: true },
    messageIncludes: 'while signed out',
  },
  {
    id: 'C1-4',
    what: 'the store caches its first read and never sees a rotated token',
    knobs: { cacheToken: true },
    messageIncludes: 'stale token',
  },
  {
    id: 'C2-5',
    what: 'a localStorage copy of the token is left behind',
    knobs: { alsoWriteLocalStorage: true },
    messageIncludes: 'written to localStorage',
  },
  {
    id: 'C2-6',
    what: 'storage exceptions escape instead of failing closed',
    knobs: { propagateStorageErrors: true },
    messageIncludes: 'storage was unavailable',
  },
  {
    id: 'C2-7',
    what: 'clearToken() leaves the token readable',
    knobs: { ignoreClearToken: true },
    messageIncludes: 'clearToken()',
  },
  {
    id: 'C3-8',
    what: 'clearTokenOnStatuses is empty, so a 401 leaves the dead token in place',
    knobs: { clearTokenOnStatuses: [] },
    messageIncludes: 'survived a 401',
  },
  {
    id: 'C3-9',
    what: 'an adapter treats every 401 as a session expiry',
    knobs: { notifyOnAnyUnauthorized: true },
    messageIncludes: 'unauthenticated request',
  },
  {
    id: 'C3-10',
    what: '403 is added to clearTokenOnStatuses, signing users out on any forbidden panel',
    knobs: { clearTokenOnStatuses: [401, 403] },
    messageIncludes: '403 cleared the token',
  },
  {
    id: 'C4-11',
    what: 'an adapter adds its own retry-on-401 on top of the recovery seam',
    knobs: { retryOn401: true },
    messageIncludes: 'replayed',
  },
  {
    id: 'C4-12',
    what: 'a fresh transport is built per call, so nothing shares the single-flight',
    knobs: { transportPerRequest: true },
    messageIncludes: 'concurrent 401s',
  },
  {
    id: 'C5-13',
    what: 'the bearer is appended to the request URL',
    knobs: { tokenInUrl: true },
    messageIncludes: 'request URL',
  },
];

describe('transport contract — fails when the product breaks that case', () => {
  for (const broken of BREAKS) {
    it(`${broken.id} goes red when ${broken.what}`, async () => {
      const error = await runCase(broken.id, broken.knobs).then(
        () => null,
        (caught: unknown) => caught,
      );
      expect(error, `${broken.id} stayed green against a broken product`).toBeInstanceOf(
        TransportContractError,
      );
      expect((error as TransportContractError).caseId).toBe(broken.id);
      expect((error as TransportContractError).message).toContain(broken.messageIncludes);
    });
  }

  it('covers every case with at least one negative', () => {
    expect(BREAKS.map((broken) => broken.id).sort()).toStrictEqual(
      CONTRACT_CASES.map((contractCase) => contractCase.id).sort(),
    );
  });
});

describe('transport contract — missing wiring is reported, not skipped', () => {
  it('C2-5 fails when the token lives in localStorage only', async () => {
    await expect(runCase('C2-5', { useLocalStorage: true })).rejects.toThrow(
      /not written to sessionStorage/,
    );
  });

  it('C2-5 fails loudly when no sessionStorage exists, instead of passing vacuously', async () => {
    const deps = createFixtureDeps();
    const withoutStorage = { ...deps, sessionStorage: undefined, localStorage: undefined };
    const contractCase = CONTRACT_CASES.find((candidate) => candidate.id === 'C2-5');
    await expect(contractCase?.run(withoutStorage)).rejects.toThrow(
      /no sessionStorage is available/,
    );
  });

  it('C3-8 fails when the product never wired onUnauthorized', async () => {
    await expect(runCase('C3-8', { omitOnUnauthorized: true })).rejects.toThrow(
      /did not wire `onUnauthorized`/,
    );
  });

  for (const id of ['C4-11', 'C4-12'] as const) {
    it(`${id} fails (and points at exemptions) when recoverAuth is absent`, async () => {
      await expect(runCase(id, { omitRecoverAuth: true })).rejects.toThrow(/exemption/i);
    });
  }
});
