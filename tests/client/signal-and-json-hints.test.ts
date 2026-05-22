import { describe, expect, it, vi } from 'vitest';
import { createNene2Client, Nene2ClientError } from '../../src/index.js';

describe('fetch signal and JSON hints', () => {
  it('forwards AbortSignal to fetch', async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
      expect(init?.signal).toBe(controller.signal);
      return Promise.resolve(
        new Response(JSON.stringify({ status: 'ok', service: 'NENE2' }), {
          headers: { 'content-type': 'application/json' },
        }),
      );
    });
    const client = createNene2Client({
      baseUrl: 'http://localhost:18080',
      signal: controller.signal,
      fetch: fetchMock,
    });
    await client.health();
  });

  it('hints when response is HTML instead of JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('<html>not api</html>', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    );
    const client = createNene2Client({ baseUrl: 'http://wrong-host', fetch: fetchMock });
    await expect(client.health()).rejects.toSatisfy((err: unknown) => {
      return err instanceof Nene2ClientError && err.message.includes('HTML');
    });
  });
});
