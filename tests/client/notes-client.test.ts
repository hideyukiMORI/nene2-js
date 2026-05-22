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

describe('createNene2Client notes', () => {
  it('listNotes() returns paginated list', async () => {
    const body = loadFixture('notes-list-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    const list = await client.listNotes({ limit: 10, offset: 0 });
    expect(list.items).toHaveLength(1);
    expect(list.items[0]?.title).toBe('Example Note');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/examples/notes?limit=10&offset=0',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('getNote(id) returns a single note', async () => {
    const body = loadFixture('note-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    const note = await client.getNote(1);
    expect(note.id).toBe(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/examples/notes/1',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createNote() POSTs JSON body', async () => {
    const body = loadFixture('note-ok.json');
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(body, 201));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    const created = await client.createNote({
      title: 'New',
      body: 'Body text',
    });
    expect(created.id).toBe(1);
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ title: 'New', body: 'Body text' }));
  });

  it('updateNote() PUTs JSON body', async () => {
    const updated = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content.',
    };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(updated));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    const note = await client.updateNote(1, { title: 'Updated Title', body: 'Updated body' });
    expect(note.title).toBe('Updated Title');
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe('PUT');
  });

  it('deleteNote() sends DELETE and expects 204', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));

    const client = createNene2Client({
      baseUrl: 'http://localhost:8080',
      fetch: fetchMock,
    });

    await client.deleteNote(1);
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe('DELETE');
  });
});
