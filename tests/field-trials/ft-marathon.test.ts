import { describe, expect, it } from 'vitest';
import {
  FT_CATALOG,
  FT_ONBOARDING_RANGE,
  MARATHON_SIZE,
} from '../../tools/ft-marathon/catalog.mjs';
import { runFtHandler } from './runners.js';

const liveEnabled = Boolean(process.env.NENE2_JS_API_BASE_URL);

describe('FT marathon catalog', () => {
  it(`has ${MARATHON_SIZE} entries FT30–FT529`, () => {
    expect(FT_CATALOG.length).toBe(MARATHON_SIZE);
    expect(FT_CATALOG[0]?.ft).toBe(30);
    expect(FT_CATALOG[MARATHON_SIZE - 1]?.ft).toBe(529);
  });

  it('includes docs onboarding batch FT130–229', () => {
    const onb = FT_CATALOG.filter(
      (e) => e.ft >= FT_ONBOARDING_RANGE.start && e.ft <= FT_ONBOARDING_RANGE.end,
    );
    expect(onb.length).toBe(100);
  });
});

describe.each(FT_CATALOG)('FT$ft: $theme', (entry) => {
  const skipLive =
    entry.mode === 'live' &&
    !liveEnabled &&
    !(entry.handler === 'onb_live_smoke_after_python' && process.env.NENE2_JS_PYTHON_BASE_URL);

  it.skipIf(skipLive)(`[${entry.category}] ${entry.handler}`, async () => {
    await runFtHandler(entry.handler);
  });
});
