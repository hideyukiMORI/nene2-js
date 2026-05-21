import { describe, expect, it } from 'vitest';
import { NENE2_CLIENT_PACKAGE } from '../src/index.js';

describe('bootstrap', () => {
  it('exposes package identifier constant', () => {
    expect(NENE2_CLIENT_PACKAGE).toBe('@hideyukimori/nene2-client');
  });
});
