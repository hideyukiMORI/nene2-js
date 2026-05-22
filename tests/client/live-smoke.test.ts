import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;

describe.skipIf(!baseUrl)('live smoke (NENE2_JS_API_BASE_URL)', () => {
  it('health and ping against running NENE2', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });

    const health = await client.health();
    expect(health.status).toBe('ok');
    expect(health.service).toBe('NENE2');

    const pong = await client.ping();
    expect(pong.message).toBe('pong');
  });
});
