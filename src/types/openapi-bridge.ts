/**
 * Re-exports selected schema types from generated OpenAPI (ADR 0006).
 * Hand-written guards in ./system.ts and ./examples/ remain canonical until migrated.
 */
import type { components } from '../generated/openapi.js';

export type OpenApiSchemas = components['schemas'];

export type GeneratedHealthResponse = OpenApiSchemas['HealthResponse'];
export type GeneratedExamplePingResponse = OpenApiSchemas['ExamplePingResponse'];
export type GeneratedMachineHealthResponse = OpenApiSchemas['MachineHealthResponse'];
