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
  isNene2ClientError,
  Nene2ClientError,
  parseRateLimitHeaders,
  validationErrorsByField,
  validationErrorsFromClientError,
  type HealthOptions,
  type Nene2Client,
  type Nene2ClientConfig,
  type RateLimitInfo,
} from './client/index.js';
export {
  createNene2Transport,
  createSessionTokenStore,
  type AuthFailureContext,
  type BlobDownload,
  type Nene2Transport,
  type Nene2TransportConfig,
  type RawBodyRequestOptions,
  type SessionTokenStore,
  type SessionTokenStoreOptions,
  type TokenStore,
  type TransportRequestOptions,
} from './transport/index.js';
export type { OpenApiPaths, OpenApiSchemas } from './types/schemas.js';
export type {
  CreateNoteRequest,
  CreateTagRequest,
  ExampleNote,
  ExampleNoteListResponse,
  ExamplePingResponse,
  ExampleTag,
  ExampleTagListResponse,
  FrameworkSmokeResponse,
  HealthResponse,
  HealthStatus,
  ListNotesParams,
  ListTagsParams,
  MachineHealthResponse,
  ProtectedResponse,
  SmokeCheckResult,
} from './types/index.js';
export {
  isCreateNoteRequest,
  isCreateTagRequest,
  isExampleNoteListResponse,
  isExampleNoteResponse,
  isExamplePingResponse,
  isExampleTagListResponse,
  isExampleTagResponse,
  isFrameworkSmokeResponse,
  isHealthResponse,
  isMachineHealthResponse,
  isProtectedResponse,
} from './types/index.js';
