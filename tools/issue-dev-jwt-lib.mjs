/** CLI wrapper — logic mirrored in tests/helpers/issue-dev-jwt.ts */
import { createHmac } from 'node:crypto';

/**
 * @param {string} secret
 * @param {Record<string, unknown>} claims
 * @returns {string}
 */
export function issueDevJwt(secret, claims) {
  const base64UrlEncode = (data) =>
    (typeof data === 'string' ? Buffer.from(data, 'utf8') : data).toString('base64url');
  const headerB64 = base64UrlEncode(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
  const payloadB64 = base64UrlEncode(JSON.stringify(claims));
  const sigB64 = base64UrlEncode(
    createHmac('sha256', secret).update(`${headerB64}.${payloadB64}`).digest(),
  );
  return `${headerB64}.${payloadB64}.${sigB64}`;
}
