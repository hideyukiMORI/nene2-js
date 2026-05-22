import { describe, expect, it } from 'vitest';
import { FT_CATALOG } from '../../tools/ft-marathon/catalog.mjs';
import { runFtHandler } from './runners.js';

const liveEnabled = Boolean(process.env.NENE2_JS_API_BASE_URL);

describe('FT marathon catalog', () => {
  it('has 100 entries FT30–FT129', () => {
    expect(FT_CATALOG.length).toBe(100);
    expect(FT_CATALOG[0]?.ft).toBe(30);
    expect(FT_CATALOG[99]?.ft).toBe(129);
  });
});

describe.each(FT_CATALOG)('FT$ft: $theme', (entry) => {
  const skipLive = entry.mode === 'live' && !liveEnabled;

  it.skipIf(skipLive)(`[${entry.category}] ${entry.handler}`, async () => {
    await runFtHandler(entry.handler);
  });
});
