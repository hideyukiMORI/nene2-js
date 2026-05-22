import { Nene2ClientError } from './errors.js';
import type { HealthResponse } from '../types/system.js';

/** Expected `service` value on NENE2 `GET /health` (OpenAPI). */
export const NENE2_HEALTH_SERVICE = 'NENE2' as const;

/**
 * When `strictService` is true, reject bodies whose `service` is not {@link NENE2_HEALTH_SERVICE}.
 * @internal
 */
export function finalizeHealthResponse(
  body: HealthResponse,
  url: string,
  strictService: boolean | undefined,
): HealthResponse {
  if (strictService && body.service !== NENE2_HEALTH_SERVICE) {
    throw new Nene2ClientError(
      `NENE2 health.service is "${body.service}", expected "${NENE2_HEALTH_SERVICE}" — check baseUrl / port (wrong stack on :8080?)`,
      { status: 200, url },
    );
  }
  return body;
}
