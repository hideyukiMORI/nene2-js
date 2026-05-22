/**
 * RFC 9457 Problem Details types aligned with NENE2 OpenAPI schemas.
 */
import type {
  ProblemDetails,
  ValidationError,
  ValidationProblemDetails,
} from '../types/schemas.js';

export type { ProblemDetails, ValidationError, ValidationProblemDetails };

/** Parsed body may include RFC 9457 extension members at the top level. */
export type ProblemDetailsDocument = ProblemDetails & Record<string, unknown>;

export type ValidationProblemDetailsDocument = ValidationProblemDetails & Record<string, unknown>;
