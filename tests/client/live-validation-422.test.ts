import { describe, expect, it } from 'vitest';
import {
  createNene2Client,
  Nene2ClientError,
  validationErrorsFromClientError,
} from '../../src/index.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;

describe.skipIf(!baseUrl)('live validation 422', () => {
  it('createNote with empty title returns validation errors', async () => {
    const client = createNene2Client({ baseUrl: baseUrl! });
    try {
      await client.createNote({ title: '', body: 'x' });
      expect.fail('expected 422');
    } catch (err) {
      expect(err).toBeInstanceOf(Nene2ClientError);
      const ve = validationErrorsFromClientError(err);
      expect(ve?.length).toBeGreaterThan(0);
      expect(ve?.some((e) => e.field === 'title')).toBe(true);
    }
  });
});
