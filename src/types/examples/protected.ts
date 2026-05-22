/**
 * Protected example response (OpenAPI-aligned).
 */
import { validateProtectedResponse } from '../../generated/guards.js';
import type { ProtectedResponse } from '../schemas.js';

export type { ProtectedResponse } from '../schemas.js';

/** Type guard for {@link ProtectedResponse}. */
export function isProtectedResponse(value: unknown): value is ProtectedResponse {
  return validateProtectedResponse(value);
}
