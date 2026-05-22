import type { ProblemDetailsDocument } from '../problem/types.js';

/**
 * Error thrown when the NENE2 API returns a non-success HTTP status or an unexpected body.
 */
export class Nene2ClientError extends Error {
  readonly status: number;
  readonly problem: ProblemDetailsDocument | undefined;
  readonly url: string;

  constructor(
    message: string,
    options: { status: number; url: string; problem?: ProblemDetailsDocument | undefined },
  ) {
    super(message);
    this.name = 'Nene2ClientError';
    this.status = options.status;
    this.url = options.url;
    this.problem = options.problem;
  }
}

/** Type guard for {@link Nene2ClientError}. */
export function isNene2ClientError(error: unknown): error is Nene2ClientError {
  return error instanceof Nene2ClientError;
}
