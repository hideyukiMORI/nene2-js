import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createNene2Client, Nene2ClientError } from '../../src/index.js';

const fixturesDir = resolve(process.cwd(), 'tests/fixtures/examples');

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf8')) as unknown;
}

describe('createNene2Client getProtected', () => {
  it('getProtected() sends bearer and returns claims', async () => {
    const body = loadFixture('protected-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      bearer: 'test-jwt',
      fetch: fetchMock,
    });

    const res = await client.getProtected();
    expect(res.message).toContain('Welcome');
    expect(res.claims.sub).toBe('user-42');
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer test-jwt');
  });

  it('getProtected() surfaces 401 as Nene2ClientError', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          type: 'https://nene2.dev/problems/unauthorized',
          title: 'Unauthorized',
          status: 401,
        }),
        { status: 401, headers: { 'content-type': 'application/problem+json' } },
      ),
    );

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    await expect(client.getProtected()).rejects.toBeInstanceOf(Nene2ClientError);
  });
});
