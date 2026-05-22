import { describe, expect, it, vi } from 'vitest';
import { wrapFetchError } from '../../src/client/request.js';
import { Nene2ClientError } from '../../src/index.js';

describe('wrapFetchError', () => {
  const url = 'http://localhost:8080/health';

  it('wraps TypeError from fetch in Nene2ClientError with status 0', () => {
    const err = wrapFetchError(new TypeError('fetch failed'), url);
    expect(err).toBeInstanceOf(Nene2ClientError);
    expect(err.status).toBe(0);
    expect(err.url).toBe(url);
    expect(err.message).toMatch(/network request failed/);
  });

  it('wraps AbortError as aborted or timed out', () => {
    const err = wrapFetchError(new DOMException('Aborted', 'AbortError'), url);
    expect(err.status).toBe(0);
    expect(err.message).toMatch(/aborted or timed out/);
  });

  it('passes through existing Nene2ClientError', () => {
    const original = new Nene2ClientError('already', { status: 404, url });
    expect(wrapFetchError(original, url)).toBe(original);
  });
});

describe('network errors via createNene2Client', () => {
  it('health() wraps fetch rejection in Nene2ClientError', async () => {
    const { createNene2Client } = await import('../../src/index.js');
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('ECONNREFUSED'));
    const client = createNene2Client({ baseUrl: 'http://localhost:8080', fetch: fetchMock });

    await expect(client.health()).rejects.toMatchObject({
      name: 'Nene2ClientError',
      status: 0,
      url: 'http://localhost:8080/health',
    });
  });
});

describe('timeoutMs', () => {
  it('health() wraps timeout abort in Nene2ClientError with status 0', async () => {
    const { createNene2Client } = await import('../../src/index.js');
    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'));
        });
      });
    });
    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
      timeoutMs: 50,
    });

    await expect(client.health()).rejects.toMatchObject({
      name: 'Nene2ClientError',
      status: 0,
    });
  }, 5_000);
});
