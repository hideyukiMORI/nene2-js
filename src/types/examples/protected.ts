/**
 * Protected example response (OpenAPI-aligned).
 */
import type { ProtectedResponse } from '../schemas.js';

export type { ProtectedResponse } from '../schemas.js';

/** Type guard for {@link ProtectedResponse}. */
export function isProtectedResponse(value: unknown): value is ProtectedResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { message, claims } = value as Record<string, unknown>;
  return (
    typeof message === 'string' &&
    typeof claims === 'object' &&
    claims !== null &&
    !Array.isArray(claims)
  );
}
