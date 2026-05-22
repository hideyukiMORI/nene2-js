/**
 * RFC 9457 Problem Details types aligned with NENE2 OpenAPI schemas.
 * @see contracts/openapi.yaml — ProblemDetails, ValidationProblemDetails, ValidationError
 */

/** NENE2 `ValidationError` schema (additionalProperties: false). */
export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: string;
}

/** NENE2 base Problem Details (required: type, title, status). */
export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail?: string | undefined;
  readonly instance?: string | undefined;
}

/** Problem Details with `errors` (HTTP 422 validation-failed). */
export interface ValidationProblemDetails extends ProblemDetails {
  readonly errors: readonly ValidationError[];
}

/** Parsed body may include RFC 9457 extension members at the top level. */
export type ProblemDetailsDocument = ProblemDetails & Record<string, unknown>;

export type ValidationProblemDetailsDocument = ValidationProblemDetails & Record<string, unknown>;
