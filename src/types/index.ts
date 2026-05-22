export type { ExamplePingResponse, HealthResponse, HealthStatus } from './system.js';
export { isExamplePingResponse, isHealthResponse } from './system.js';
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
