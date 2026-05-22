import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const fixturesDir = resolve(process.cwd(), 'tests/fixtures/system');

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf8')) as unknown;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('system endpoints', () => {
  it('frameworkSmoke() hits GET /', async () => {
    const body = loadFixture('framework-smoke-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));
    const client = createNene2Client({ baseUrl: 'http://localhost:18080', fetch: fetchMock });
    const smoke = await client.frameworkSmoke();
    expect(smoke.name).toBe('NENE2');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:18080/',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('machineHealth() sends X-NENE2-API-Key', async () => {
    const body = loadFixture('machine-health-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));
    const client = createNene2Client({
      baseUrl: 'http://localhost:18080',
      apiKey: 'machine-key',
      fetch: fetchMock,
    });
    const health = await client.machineHealth();
    expect(health.credential_type).toBe('api_key');
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(new Headers(init.headers).get('X-NENE2-API-Key')).toBe('machine-key');
  });

  it('smoke() runs health and ping in parallel', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(loadFixture('health-ok.json')))
      .mockResolvedValueOnce(jsonResponse(loadFixture('ping-ok.json')));
    const client = createNene2Client({ baseUrl: 'http://localhost:18080', fetch: fetchMock });
    const result = await client.smoke();
    expect(result.health.service).toBe('NENE2');
    expect(result.ping.message).toBe('pong');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
