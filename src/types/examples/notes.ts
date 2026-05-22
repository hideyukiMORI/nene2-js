/**
 * Example notes types and guards (OpenAPI-aligned).
 */
import {
  validateCreateNoteRequest,
  validateExampleNoteListResponse,
  validateExampleNoteResponse,
} from '../../generated/guards.js';
import type { CreateNoteRequest, ExampleNote, ExampleNoteListResponse } from '../schemas.js';

export type { CreateNoteRequest, ExampleNote, ExampleNoteListResponse } from '../schemas.js';

/** Query params for GET /examples/notes (not a named OpenAPI schema). */
export type ListNotesParams = {
  readonly limit?: number;
  readonly offset?: number;
};

/** Type guard for {@link ExampleNote}. */
export function isExampleNoteResponse(value: unknown): value is ExampleNote {
  return validateExampleNoteResponse(value);
}

/** Type guard for {@link ExampleNoteListResponse}. */
export function isExampleNoteListResponse(value: unknown): value is ExampleNoteListResponse {
  return validateExampleNoteListResponse(value);
}

/** Type guard for create-note request body (client-side validation before POST). */
export function isCreateNoteRequest(value: unknown): value is CreateNoteRequest {
  return validateCreateNoteRequest(value);
}
