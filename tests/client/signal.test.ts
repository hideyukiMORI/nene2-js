import { describe, expect, it } from 'vitest';
import { mergeRequestSignal } from '../../src/client/signal.js';

describe('mergeRequestSignal', () => {
  it('returns undefined when no signal and no timeout', () => {
    expect(mergeRequestSignal(undefined, undefined)).toBeUndefined();
  });

  it('returns user signal when timeoutMs is undefined', () => {
    const ac = new AbortController();
    expect(mergeRequestSignal(ac.signal, undefined)).toBe(ac.signal);
  });

  it('creates a timeout signal when timeoutMs is set', () => {
    const signal = mergeRequestSignal(undefined, 5000);
    expect(signal).toBeDefined();
    expect(signal?.aborted).toBe(false);
  });

  it('throws when timeoutMs is not positive', () => {
    expect(() => mergeRequestSignal(undefined, 0)).toThrow(/timeoutMs/);
  });
});
