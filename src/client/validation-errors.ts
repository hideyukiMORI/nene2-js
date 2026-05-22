import { isNene2ValidationFailedProblem } from '../problem/guards.js';
import type { ValidationError } from '../problem/types.js';
import { Nene2ClientError } from './errors.js';

/**
 * Extract RFC 9457 validation `errors` from a {@link Nene2ClientError} when present.
 * Useful for mapping API validation failures to form fields (Persona A DX).
 */
export function validationErrorsFromClientError(
  error: unknown,
): readonly ValidationError[] | undefined {
  if (!(error instanceof Nene2ClientError) || error.problem === undefined) {
    return undefined;
  }
  if (!isNene2ValidationFailedProblem(error.problem)) {
    return undefined;
  }
  return error.problem.errors;
}

/**
 * Map validation errors to a plain object keyed by field name (first error per field).
 */
export function validationErrorsByField(
  errors: readonly ValidationError[],
): Readonly<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const item of errors) {
    if (out[item.field] === undefined) {
      out[item.field] = item.message;
    }
  }
  return out;
}
