import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';
import { issueDevJwt } from '../helpers/issue-dev-jwt.js';

const baseUrl = process.env.NENE2_JS_API_BASE_URL;
const jwtSecret = process.env.NENE2_LOCAL_JWT_SECRET?.trim();
const bearerFromEnv = process.env.NENE2_JS_BEARER_TOKEN?.trim();

function resolveBearer(): string | undefined {
  if (bearerFromEnv) {
    return bearerFromEnv;
  }
  if (jwtSecret && jwtSecret.length >= 32) {
    return issueDevJwt(jwtSecret, {
      sub: 'user-42',
      scope: 'read:system',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
  }
  return undefined;
}

describe.skipIf(!baseUrl)('live protected (NENE2 JWT)', () => {
  const bearer = resolveBearer();

  describe.skipIf(!bearer)('with bearer token', () => {
    it('getProtected() returns claims on evac/canonical URL', async () => {
      const client = createNene2Client({ baseUrl: baseUrl!, bearer: bearer! });
      const res = await client.getProtected();
      expect(res.message).toContain('Welcome');
      expect(res.claims.sub).toBe('user-42');
    });
  });

  it('documents skip when no bearer/JWT secret', () => {
    if (bearer) {
      expect(bearer.length).toBeGreaterThan(10);
      return;
    }
    expect(process.env.NENE2_JS_BEARER_TOKEN ?? process.env.NENE2_LOCAL_JWT_SECRET).toBeUndefined();
  });
});
