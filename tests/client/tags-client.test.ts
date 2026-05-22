import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const fixturesDir = resolve(process.cwd(), 'tests/fixtures/examples');

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf8')) as unknown;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('createNene2Client tags', () => {
  it('listTags() returns paginated list', async () => {
    const body = loadFixture('tags-list-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));

    const client = createNene2Client({
      baseUrl: 'http://localhost:18080',
      fetch: fetchMock,
    });

    const list = await client.listTags({ limit: 5 });
    expect(list.items[0]?.name).toBe('php');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:18080/examples/tags?limit=5',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createTag() and deleteTag()', async () => {
    const created = loadFixture('tag-ok.json');
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(created, 201))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    const client = createNene2Client({
      baseUrl: 'http://localhost:18080',
      fetch: fetchMock,
    });

    const tag = await client.createTag({ name: 'php' });
    expect(tag.name).toBe('php');
    await client.deleteTag(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
