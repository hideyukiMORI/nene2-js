import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createNene2Client, Nene2ClientError } from '../../src/index.js';

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

describe('createNene2Client', () => {
  it('health() returns typed HealthResponse', async () => {
    const body = loadFixture('health-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080/',
      fetch: fetchMock,
    });

    const health = await client.health();
    expect(health).toEqual({ status: 'ok', service: 'NENE2' });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/health',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('ping() returns typed ExamplePingResponse', async () => {
    const body = loadFixture('ping-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    const pong = await client.ping();
    expect(pong).toEqual({ message: 'pong', status: 'ok' });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/examples/ping',
      expect.any(Object),
    );
  });

  it('forwards apiKey and bearer headers', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(loadFixture('health-ok.json')));

    const client = createNene2Client({
      baseUrl: 'http://api.example',
      apiKey: 'test-key',
      bearer: 'jwt-token',
      fetch: fetchMock,
    });

    await client.health();
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = new Headers(init.headers);
    expect(headers.get('X-NENE2-API-Key')).toBe('test-key');
    expect(headers.get('Authorization')).toBe('Bearer jwt-token');
  });

  it('health({ strictService: true }) rejects non-NENE2 service', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ status: 'ok', service: 'OTHER' }));
    const client = createNene2Client({ baseUrl: 'http://localhost:8080', fetch: fetchMock });

    expect((await client.health()).service).toBe('OTHER');
    await expect(client.health({ strictService: true })).rejects.toMatchObject({
      message: /health\.service/,
      status: 200,
    });
  });

  it('health() throws on 503 degraded unless allowDegraded', async () => {
    const body = loadFixture('health-degraded.json');
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(body, 503))
      .mockResolvedValueOnce(jsonResponse(body, 503));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    await expect(client.health()).rejects.toBeInstanceOf(Nene2ClientError);
    const degraded = await client.health({ allowDegraded: true });
    expect(degraded.status).toBe('degraded');
    expect(degraded.service).toBe('NENE2');
  });

  it('throws Nene2ClientError with problem details on error response', async () => {
    const problem = {
      type: 'https://nene2.dev/problems/not-found',
      title: 'Not Found',
      status: 404,
      detail: 'missing',
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(problem), {
        status: 404,
        headers: { 'content-type': 'application/problem+json' },
      }),
    );

    const client = createNene2Client({ baseUrl: 'http://localhost:8080', fetch: fetchMock });

    await expect(client.ping()).rejects.toMatchObject({
      name: 'Nene2ClientError',
      status: 404,
      problem,
      rateLimit: undefined,
    } satisfies Partial<Nene2ClientError>);
  });

  it('throws Nene2ClientError with rateLimit on 429 response', async () => {
    const problem = {
      type: 'https://nene2.dev/problems/too-many-requests',
      title: 'Too Many Requests',
      status: 429,
      detail: 'Rate limit exceeded.',
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(problem), {
        status: 429,
        headers: {
          'content-type': 'application/problem+json',
          'Retry-After': '60',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': '1716048060',
        },
      }),
    );

    const client = createNene2Client({ baseUrl: 'http://localhost:8080', fetch: fetchMock });

    await expect(client.listNotes()).rejects.toMatchObject({
      status: 429,
      rateLimit: {
        retryAfterSeconds: 60,
        limit: 100,
        remaining: 0,
        reset: 1716048060,
      },
    } satisfies Partial<Nene2ClientError>);
  });
});
