/**
 * System endpoint types (OpenAPI-aligned) and runtime guards.
 */
import {
  validateExamplePingResponse,
  validateFrameworkSmokeResponse,
  validateHealthResponse,
  validateMachineHealthResponse,
} from '../generated/guards.js';
import type {
  ExamplePingResponse,
  FrameworkSmokeResponse,
  HealthResponse,
  MachineHealthResponse,
} from './schemas.js';

export type {
  ExamplePingResponse,
  FrameworkSmokeResponse,
  HealthResponse,
  HealthStatus,
  MachineHealthResponse,
} from './schemas.js';

/** Composite result of {@link createNene2Client#smoke} (not an OpenAPI schema). */
export interface SmokeCheckResult {
  readonly health: HealthResponse;
  readonly ping: ExamplePingResponse;
}

/** Type guard for {@link HealthResponse}. */
export function isHealthResponse(value: unknown): value is HealthResponse {
  return validateHealthResponse(value);
}

/** Type guard for {@link ExamplePingResponse}. */
export function isExamplePingResponse(value: unknown): value is ExamplePingResponse {
  return validateExamplePingResponse(value);
}

/** Type guard for {@link FrameworkSmokeResponse}. */
export function isFrameworkSmokeResponse(value: unknown): value is FrameworkSmokeResponse {
  return validateFrameworkSmokeResponse(value);
}

/** Type guard for {@link MachineHealthResponse}. */
export function isMachineHealthResponse(value: unknown): value is MachineHealthResponse {
  return validateMachineHealthResponse(value);
}
