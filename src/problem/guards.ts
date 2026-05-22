import { NENE2_PROBLEM_TYPE_VALIDATION_FAILED } from './constants.js';
import type {
  ProblemDetails,
  ProblemDetailsDocument,
  ValidationError,
  ValidationProblemDetails,
  ValidationProblemDetailsDocument,
} from './types.js';

const RESERVED_KEYS = new Set(['type', 'title', 'status', 'detail', 'instance', 'errors']);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHttpStatus(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 400 && value <= 599;
}

/**
 * Type guard for NENE2 {@link ProblemDetails} (RFC 9457 subset).
 */
export function isProblemDetails(value: unknown): value is ProblemDetailsDocument {
  if (!isPlainObject(value)) {
    return false;
  }

  const { type, title, status, detail, instance } = value;

  if (typeof type !== 'string' || typeof title !== 'string' || !isHttpStatus(status)) {
    return false;
  }

  if (detail !== undefined && typeof detail !== 'string') {
    return false;
  }

  if (instance !== undefined && typeof instance !== 'string') {
    return false;
  }

  return true;
}

/**
 * Type guard for a single NENE2 {@link ValidationError}.
 */
export function isValidationError(value: unknown): value is ValidationError {
  if (!isPlainObject(value)) {
    return false;
  }

  const keys = Object.keys(value);
  if (
    keys.length !== 3 ||
    !keys.includes('field') ||
    !keys.includes('message') ||
    !keys.includes('code')
  ) {
    return false;
  }

  const { field, message, code } = value;
  return typeof field === 'string' && typeof message === 'string' && typeof code === 'string';
}

/**
 * Type guard for NENE2 {@link ValidationProblemDetails} (`errors` array, min 1 item).
 */
export function isValidationProblemDetails(
  value: unknown,
): value is ValidationProblemDetailsDocument {
  if (!isProblemDetails(value)) {
    return false;
  }

  const { errors } = value;
  if (!Array.isArray(errors) || errors.length < 1) {
    return false;
  }

  return errors.every(isValidationError);
}

/**
 * Returns true when `type` is NENE2 `validation-failed`.
 */
export function isNene2ValidationFailedType(type: string): boolean {
  return type === NENE2_PROBLEM_TYPE_VALIDATION_FAILED;
}

/**
 * Narrows {@link ProblemDetails} to {@link ValidationProblemDetails} when validation-failed.
 */
export function isNene2ValidationFailedProblem(
  problem: ProblemDetails,
): problem is ValidationProblemDetails {
  return isNene2ValidationFailedType(problem.type) && isValidationProblemDetails(problem);
}

/**
 * Parse JSON (already decoded) into Problem Details when shape matches.
 */
export function parseProblemDetails(value: unknown): ProblemDetailsDocument | undefined {
  return isProblemDetails(value) ? value : undefined;
}

/**
 * Parse JSON into Validation Problem Details when shape matches.
 */
export function parseValidationProblemDetails(
  value: unknown,
): ValidationProblemDetailsDocument | undefined {
  return isValidationProblemDetails(value) ? value : undefined;
}

/**
 * Parse a `application/problem+json` (or JSON) response body.
 */
export async function parseProblemDetailsResponse(
  response: Response,
): Promise<ProblemDetailsDocument | undefined> {
  const contentType = response.headers.get('content-type') ?? '';
  if (
    !contentType.includes('application/problem+json') &&
    !contentType.includes('application/json')
  ) {
    return undefined;
  }

  try {
    const body: unknown = await response.json();
    return parseProblemDetails(body);
  } catch {
    return undefined;
  }
}

/**
 * List extension members (non-reserved top-level fields).
 */
export function problemDetailsExtensions(problem: ProblemDetailsDocument): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(problem)) {
    if (!RESERVED_KEYS.has(key)) {
      out[key] = value;
    }
  }
  return out;
}
