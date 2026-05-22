export type {
  ExamplePingResponse,
  FrameworkSmokeResponse,
  HealthResponse,
  HealthStatus,
  MachineHealthResponse,
  SmokeCheckResult,
} from './system.js';
export {
  isExamplePingResponse,
  isFrameworkSmokeResponse,
  isHealthResponse,
  isMachineHealthResponse,
} from './system.js';
export type {
  CreateNoteRequest,
  ExampleNote,
  ExampleNoteListResponse,
  ListNotesParams,
} from './examples/index.js';
export {
  isCreateNoteRequest,
  isExampleNoteListResponse,
  isExampleNoteResponse,
  isProtectedResponse,
} from './examples/index.js';
export type { ProtectedResponse } from './examples/index.js';
export type {
  CreateTagRequest,
  ExampleTag,
  ExampleTagListResponse,
  ListTagsParams,
} from './examples/index.js';
export {
  isCreateTagRequest,
  isExampleTagListResponse,
  isExampleTagResponse,
} from './examples/index.js';
