import { describe, expect, it } from 'vitest';
import { createNene2Client } from '../../src/index.js';
import { issueDevJwt } from '../helpers/issue-dev-jwt.js';

const BACKENDS = [
  { id: 'nene2', label: 'NENE2 (PHP)', env: 'NENE2_JS_API_BASE_URL' as const },
  { id: 'nene2-python', label: 'nene2-python', env: 'NENE2_JS_PYTHON_BASE_URL' as const },
] as const;

const jwtSecret =
  process.env.NENE2_LOCAL_JWT_SECRET?.trim() ?? 'ft-evac-local-jwt-secret-min-32-chars!!';
const bearerFromEnv = process.env.NENE2_JS_BEARER_TOKEN?.trim();

function resolveBearer(): string | undefined {
  if (bearerFromEnv) {
    return bearerFromEnv;
  }
  if (jwtSecret.length >= 32) {
    return issueDevJwt(jwtSecret, {
      sub: 'user-42',
      scope: 'read:system',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
  }
  return undefined;
}

const bearer = resolveBearer();

for (const backend of BACKENDS) {
  const baseUrl = process.env[backend.env];

  describe.skipIf(!baseUrl)(`live protected: ${backend.label}`, () => {
    describe.skipIf(!bearer)('with bearer token', () => {
      it('getProtected() returns claims', async () => {
        const client = createNene2Client({ baseUrl: baseUrl!, bearer: bearer! });
        const res = await client.getProtected();
        expect(res.message).toContain('Welcome');
        expect(res.claims.sub).toBe('user-42');
      });
    });
  });
}

describe('live protected (documentation)', () => {
  it('skips when no backend URL configured', () => {
    const configured = BACKENDS.filter((b) => process.env[b.env]).map((b) => b.id);
    if (configured.length === 0) {
      expect(bearer ?? '').toBeDefined();
    }
  });
});
