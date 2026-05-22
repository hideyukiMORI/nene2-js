import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;

describe.skipIf(!baseUrl)('live notes CRUD (NENE2)', () => {
  it('createNote → updateNote → deleteNote on live API', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });
    const suffix = String(Date.now());

    const created = await client.createNote({
      title: `FT8 live ${suffix}`,
      body: `Body ${suffix}`,
    });
    expect(created.id).toBeGreaterThan(0);

    const updated = await client.updateNote(created.id, {
      title: `FT8 updated ${suffix}`,
      body: `Updated ${suffix}`,
    });
    expect(updated.title).toContain('updated');

    const fetched = await client.getNote(created.id);
    expect(fetched.title).toBe(updated.title);

    await client.deleteNote(created.id);

    await expect(client.getNote(created.id)).rejects.toMatchObject({
      status: 404,
    });
  });
});
