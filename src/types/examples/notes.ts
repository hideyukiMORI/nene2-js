/**
 * Example notes types and guards (OpenAPI-aligned).
 */
import type { CreateNoteRequest, ExampleNote, ExampleNoteListResponse } from '../schemas.js';

export type { CreateNoteRequest, ExampleNote, ExampleNoteListResponse } from '../schemas.js';

/** Query params for GET /examples/notes (not a named OpenAPI schema). */
export type ListNotesParams = {
  readonly limit?: number;
  readonly offset?: number;
};

function isExampleNote(value: unknown): value is ExampleNote {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { id, title, body } = value as Record<string, unknown>;
  return (
    typeof id === 'number' &&
    Number.isInteger(id) &&
    typeof title === 'string' &&
    typeof body === 'string'
  );
}

/** Type guard for {@link ExampleNote}. */
export function isExampleNoteResponse(value: unknown): value is ExampleNote {
  return isExampleNote(value);
}

/** Type guard for {@link ExampleNoteListResponse}. */
export function isExampleNoteListResponse(value: unknown): value is ExampleNoteListResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { items, limit, offset } = value as Record<string, unknown>;
  if (!Array.isArray(items) || !items.every(isExampleNote)) {
    return false;
  }
  return typeof limit === 'number' && typeof offset === 'number';
}

/** Type guard for create-note request body (client-side validation before POST). */
export function isCreateNoteRequest(value: unknown): value is CreateNoteRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { title, body } = value as Record<string, unknown>;
  return (
    typeof title === 'string' && title.length > 0 && typeof body === 'string' && body.length > 0
  );
}
