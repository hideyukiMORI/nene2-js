import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';

const BACKENDS = [
  { id: 'nene2', label: 'NENE2 (PHP)', env: 'NENE2_JS_API_BASE_URL' as const },
  { id: 'nene2-python', label: 'nene2-python', env: 'NENE2_JS_PYTHON_BASE_URL' as const },
] as const;

async function runNotesCrud(baseUrl: string): Promise<void> {
  const client = createNene2Client({ baseUrl });
  const suffix = String(Date.now());

  const created = await client.createNote({
    title: `live-crud ${suffix}`,
    body: `Body ${suffix}`,
  });
  expect(created.id).toBeGreaterThan(0);

  const updated = await client.updateNote(created.id, {
    title: `live-crud updated ${suffix}`,
    body: `Updated ${suffix}`,
  });
  expect(updated.title).toContain('updated');

  const fetched = await client.getNote(created.id);
  expect(fetched.title).toBe(updated.title);

  await client.deleteNote(created.id);

  await expect(client.getNote(created.id)).rejects.toMatchObject({
    status: 404,
  });
}

for (const backend of BACKENDS) {
  const baseUrl = process.env[backend.env];

  describe.skipIf(!baseUrl)(`live notes CRUD: ${backend.label}`, () => {
    it('createNote → updateNote → deleteNote', async () => {
      await runNotesCrud(baseUrl!);
    });
  });
}
