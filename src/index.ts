/**
 * @hideyukimori/nene2-client — TypeScript client for NENE2 JSON APIs.
 * @see docs/roadmap.md
 */
export const NENE2_CLIENT_PACKAGE = '@hideyukimori/nene2-client' as const;

export {
  NENE2_PROBLEM_TYPE_VALIDATION_FAILED,
  isNene2ValidationFailedProblem,
  isNene2ValidationFailedType,
  isProblemDetails,
  isValidationError,
  isValidationProblemDetails,
  parseProblemDetails,
  parseProblemDetailsResponse,
  parseValidationProblemDetails,
  problemDetailsExtensions,
} from './problem/index.js';
export type {
  ProblemDetails,
  ProblemDetailsDocument,
  ValidationError,
  ValidationProblemDetails,
  ValidationProblemDetailsDocument,
} from './problem/index.js';

export {
  createNene2Client,
  Nene2ClientError,
  type Nene2Client,
  type Nene2ClientConfig,
} from './client/index.js';
export type { ExamplePingResponse, HealthResponse, HealthStatus } from './types/index.js';
export { isExamplePingResponse, isHealthResponse } from './types/index.js';
