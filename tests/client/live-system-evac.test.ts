import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;
const apiKey = process.env.NENE2_MACHINE_API_KEY?.trim();

describe.skipIf(!baseUrl)('live system (evac)', () => {
  it('frameworkSmoke on live NENE2', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });
    const body = await client.frameworkSmoke();
    expect(body.status).toBe('ok');
    expect(body.name).toBe('NENE2');
  });

  it('smoke() on live NENE2', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });
    const { health, ping } = await client.smoke();
    expect(health.service).toBe('NENE2');
    expect(ping.message).toBe('pong');
  });

  describe.skipIf(!apiKey)('machine health', () => {
    it('machineHealth with API key', async () => {
      const client = createNene2Client({ baseUrl: baseUrl!, apiKey: apiKey! });
      const body = await client.machineHealth();
      expect(body.credential_type).toBe('api_key');
    });
  });
});
