/**
 * Which cases need the product's adapter to be reachable (issue #125).
 *
 * fleet asked the right follow-up question after C1-2: *is C1-2 the only case
 * whose real failure mode lives in adapter code?* It is not. This file is the
 * measurement, kept permanently so the answer cannot drift.
 *
 * Method: run each case's negative fixture with **no `createTransport` seam**,
 * so the contract builds its own clean transport. A case that still goes red is
 * breakable from config or the token store alone. A case that goes **green**
 * against a deliberately broken adapter is measuring the package, not the
 * product — green for free, the exact failure this contract exists to stop.
 *
 * If someone later removes the seam as a "simplification", these assertions
 * flip and the hole is found again instead of shipping silently.
 */
import { describe, expect, it } from 'vitest';
import { CONTRACT_CASES, SEAM_DEPENDENT_CASE_IDS } from '../../src/testing/index.js';
import { assertSurfaceMatchesWiring } from '../../src/testing/contract.js';
import type { ContractCaseId } from '../../src/testing/deps.js';
import { createFixtureDeps, type FixtureKnobs } from './fixtures.js';

/** Same breaks as `contract.test.ts`, re-run without the adapter seam. */
const BREAKS: ReadonlyArray<readonly [ContractCaseId, FixtureKnobs]> = [
  ['C1-1', { dropMirror: true }],
  ['C1-2', { forgeAuthPerRequest: true }],
  ['C1-3', { ignoreClearToken: true, preseed: true }],
  ['C1-4', { cacheToken: true }],
  ['C2-5', { alsoWriteLocalStorage: true }],
  ['C2-6', { propagateStorageErrors: true }],
  ['C2-7', { ignoreClearToken: true }],
  ['C3-8', { clearTokenOnStatuses: [] }],
  ['C3-9', { notifyOnAnyUnauthorized: true }],
  ['C3-10', { clearTokenOnStatuses: [401, 403] }],
  ['C4-11', { retryOn401: true }],
  ['C4-12', { transportPerRequest: true }],
  ['C5-13', { tokenInUrl: true }],
];

async function detectsBreakWithoutSeam(id: ContractCaseId, knobs: FixtureKnobs): Promise<boolean> {
  const contractCase = CONTRACT_CASES.find((candidate) => candidate.id === id);
  if (contractCase === undefined) {
    throw new Error(`no such case: ${id}`);
  }
  return contractCase.run(createFixtureDeps({ ...knobs, omitCreateTransport: true })).then(
    () => false,
    () => true,
  );
}

describe('seam dependence — measured, one case at a time', () => {
  for (const [id, knobs] of BREAKS) {
    const seamDependent = SEAM_DEPENDENT_CASE_IDS.includes(id);
    const expectation = seamDependent
      ? 'goes green without the adapter seam (its failure mode lives in adapter code)'
      : 'still goes red without the adapter seam (breakable from config or the store)';

    it(`${id} ${expectation}`, async () => {
      expect(await detectsBreakWithoutSeam(id, knobs)).toBe(!seamDependent);
    });
  }

  it('four of the five seam-dependent cases are required, not optional', () => {
    const required = SEAM_DEPENDENT_CASE_IDS.filter((id) =>
      CONTRACT_CASES.some((contractCase) => contractCase.id === id && contractCase.required),
    );
    expect(required).toStrictEqual(['C1-2', 'C3-9', 'C4-11', 'C4-12']);
  });
});

describe('the surface declaration closes the hole', () => {
  it('refuses to run when the surface is not declared', () => {
    expect(() => assertSurfaceMatchesWiring(undefined, true)).toThrow(/needs `surface`/);
    expect(() => assertSurfaceMatchesWiring(undefined, false)).toThrow(
      /C1-2, C3-9, C4-11, C4-12, C5-13/,
    );
  });

  it("refuses 'adapter' without a createTransport builder", () => {
    expect(() => assertSurfaceMatchesWiring('adapter', false)).toThrow(
      /would pass without measuring anything/,
    );
  });

  it("refuses 'transport' when a createTransport builder is supplied", () => {
    expect(() => assertSurfaceMatchesWiring('transport', true)).toThrow(
      /Pick the one that is true/,
    );
  });

  it('accepts the two honest combinations', () => {
    expect(() => assertSurfaceMatchesWiring('adapter', true)).not.toThrow();
    expect(() => assertSurfaceMatchesWiring('transport', false)).not.toThrow();
  });
});
