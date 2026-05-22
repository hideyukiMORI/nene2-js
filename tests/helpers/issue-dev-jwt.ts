import { createHmac } from 'node:crypto';

/** Mint HS256 JWT compatible with NENE2 LocalBearerTokenVerifier (local FT only). */
export function issueDevJwt(secret: string, claims: Record<string, unknown>): string {
  function base64UrlEncode(data: string | Buffer): string {
    const buf = typeof data === 'string' ? Buffer.from(data, 'utf8') : data;
    return buf.toString('base64url');
  }

  const headerB64 = base64UrlEncode(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
  const payloadB64 = base64UrlEncode(JSON.stringify(claims));
  const sigB64 = base64UrlEncode(
    createHmac('sha256', secret).update(`${headerB64}.${payloadB64}`).digest(),
  );

  return `${headerB64}.${payloadB64}.${sigB64}`;
}
