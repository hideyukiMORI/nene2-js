#!/usr/bin/env node
/**
 * Mint HS256 JWT compatible with NENE2 LocalBearerTokenVerifier (local FT only).
 * Usage: NENE2_LOCAL_JWT_SECRET=... node tools/issue-dev-jwt.mjs
 */
import { issueDevJwt } from './issue-dev-jwt-lib.mjs';

const secret = process.env.NENE2_LOCAL_JWT_SECRET?.trim();
if (!secret || secret.length < 32) {
  console.error('Set NENE2_LOCAL_JWT_SECRET (>= 32 chars) to issue a dev token.');
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);
const token = issueDevJwt(secret, {
  sub: process.env.NENE2_JS_JWT_SUB ?? 'user-42',
  scope: process.env.NENE2_JS_JWT_SCOPE ?? 'read:system',
  iat: now,
  exp: now + Number(process.env.NENE2_JS_JWT_TTL_SEC ?? 3600),
});

process.stdout.write(token);
