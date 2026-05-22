import { describe, expect, it } from 'vitest';
import { Nene2ClientError } from '../../src/client/errors.js';
import { finalizeHealthResponse, NENE2_HEALTH_SERVICE } from '../../src/client/health.js';

describe('finalizeHealthResponse', () => {
  const url = 'http://localhost:8080/health';

  it('returns body when strictService is false', () => {
    const body = { status: 'ok' as const, service: 'OTHER' };
    expect(finalizeHealthResponse(body, url, false)).toBe(body);
  });

  it('returns body when strictService is true and service is NENE2', () => {
    const body = { status: 'ok' as const, service: NENE2_HEALTH_SERVICE };
    expect(finalizeHealthResponse(body, url, true)).toBe(body);
  });

  it('throws Nene2ClientError when strictService is true and service mismatches', () => {
    expect(() => finalizeHealthResponse({ status: 'ok', service: 'OTHER' }, url, true)).toThrow(
      Nene2ClientError,
    );
  });

  it('throws with status 200 when service mismatches (wrong port / stack)', () => {
    try {
      finalizeHealthResponse({ status: 'ok', service: 'OTHER' }, url, true);
      expect.fail('expected throw');
    } catch (error) {
      expect(error).toBeInstanceOf(Nene2ClientError);
      expect((error as Nene2ClientError).status).toBe(200);
      expect((error as Nene2ClientError).message).toMatch(/health\.service/);
    }
  });
});
