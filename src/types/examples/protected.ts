/**
 * Protected example response (OpenAPI `ProtectedResponse`).
 */

export interface ProtectedResponse {
  readonly message: string;
  readonly claims: Readonly<Record<string, unknown>>;
}

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
