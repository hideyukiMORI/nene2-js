/**
 * System endpoint response types (OpenAPI-aligned).
 */

export type HealthStatus = 'ok' | 'degraded';

export interface HealthResponse {
  readonly status: HealthStatus;
  readonly service: string;
  readonly checks?: Readonly<Record<string, 'ok' | 'error'>>;
}

export interface ExamplePingResponse {
  readonly message: 'pong';
  readonly status: 'ok';
}

export interface FrameworkSmokeResponse {
  readonly name: string;
  readonly description: string;
  readonly status: 'ok';
}

export interface MachineHealthResponse {
  readonly status: 'ok';
  readonly service: string;
  readonly credential_type: string;
}

export interface SmokeCheckResult {
  readonly health: HealthResponse;
  readonly ping: ExamplePingResponse;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.values(value).every((v) => typeof v === 'string');
}

/** Type guard for {@link HealthResponse}. */
export function isHealthResponse(value: unknown): value is HealthResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { status, service, checks } = value as Record<string, unknown>;
  if (status !== 'ok' && status !== 'degraded') {
    return false;
  }
  if (typeof service !== 'string') {
    return false;
  }
  if (checks === undefined) {
    return true;
  }
  if (!isStringRecord(checks)) {
    return false;
  }
  return Object.values(checks).every((v) => v === 'ok' || v === 'error');
}

/** Type guard for {@link ExamplePingResponse}. */
export function isExamplePingResponse(value: unknown): value is ExamplePingResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { message, status } = value as Record<string, unknown>;
  return message === 'pong' && status === 'ok';
}

/** Type guard for {@link FrameworkSmokeResponse}. */
export function isFrameworkSmokeResponse(value: unknown): value is FrameworkSmokeResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { name, description, status } = value as Record<string, unknown>;
  return typeof name === 'string' && typeof description === 'string' && status === 'ok';
}

/** Type guard for {@link MachineHealthResponse}. */
export function isMachineHealthResponse(value: unknown): value is MachineHealthResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { status, service, credential_type } = value as Record<string, unknown>;
  return status === 'ok' && typeof service === 'string' && typeof credential_type === 'string';
}
