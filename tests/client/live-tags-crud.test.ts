import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;

describe.skipIf(!baseUrl)('live tags CRUD (NENE2)', () => {
  it('createTag → updateTag → deleteTag on live API', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });
    const suffix = String(Date.now());

    const created = await client.createTag({ name: `ft9-${suffix}` });
    expect(created.id).toBeGreaterThan(0);

    const updated = await client.updateTag(created.id, { name: `ft9-upd-${suffix}` });
    expect(updated.name).toContain('upd');

    await client.deleteTag(created.id);
    await expect(client.getTag(created.id)).rejects.toMatchObject({ status: 404 });
  });
});
