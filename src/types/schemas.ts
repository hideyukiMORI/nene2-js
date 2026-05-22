/**
 * OpenAPI component schema aliases (ADR 0006). Source: src/generated/openapi.ts
 */
import type { components, paths } from '../generated/openapi.js';

export type OpenApiSchemas = components['schemas'];

/** OpenAPI path map (advanced consumers, ADR 0006). */
export type OpenApiPaths = paths;

export type ProblemDetails = OpenApiSchemas['ProblemDetails'];
export type ValidationError = OpenApiSchemas['ValidationError'];
export type ValidationProblemDetails = OpenApiSchemas['ValidationProblemDetails'];

export type FrameworkSmokeResponse = OpenApiSchemas['FrameworkSmokeResponse'];
export type HealthResponse = OpenApiSchemas['HealthResponse'];
export type HealthStatus = HealthResponse['status'];
export type MachineHealthResponse = OpenApiSchemas['MachineHealthResponse'];
export type ExamplePingResponse = OpenApiSchemas['ExamplePingResponse'];

export type CreateNoteRequest = OpenApiSchemas['CreateNoteRequest'];
export type ExampleNote = OpenApiSchemas['ExampleNoteResponse'];
export type ExampleNoteListResponse = OpenApiSchemas['ExampleNoteListResponse'];

export type CreateTagRequest = OpenApiSchemas['CreateTagRequest'];
export type ExampleTag = OpenApiSchemas['ExampleTagResponse'];
export type ExampleTagListResponse = OpenApiSchemas['ExampleTagListResponse'];

export type ProtectedResponse = OpenApiSchemas['ProtectedResponse'];
