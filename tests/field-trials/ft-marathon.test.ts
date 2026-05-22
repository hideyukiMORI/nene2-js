import { describe, expect, it } from 'vitest';
import { FT_CATALOG, FT_RANGE, MARATHON_SIZE } from '../../tools/ft-marathon/catalog.mjs';
import { runFtHandler } from './runners.js';

const liveEnabled = Boolean(process.env.NENE2_JS_API_BASE_URL);

describe('FT marathon catalog', () => {
  it(`has ${MARATHON_SIZE} entries FT${FT_RANGE.start}–FT${FT_RANGE.end}`, () => {
    expect(FT_CATALOG.length).toBe(MARATHON_SIZE);
    expect(FT_CATALOG[0]?.ft).toBe(FT_RANGE.start);
    expect(FT_CATALOG[MARATHON_SIZE - 1]?.ft).toBe(FT_RANGE.end);
  });
});

describe.each(FT_CATALOG)('FT$ft: $theme', (entry) => {
  const skipLive = entry.mode === 'live' && !liveEnabled;

  it.skipIf(skipLive)(`[${entry.category}] ${entry.handler}`, async () => {
    await runFtHandler(entry.handler);
  });
});
