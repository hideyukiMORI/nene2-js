/**
 * Example tags types and guards (OpenAPI-aligned).
 */
import {
  validateCreateTagRequest,
  validateExampleTagListResponse,
  validateExampleTagResponse,
} from '../../generated/guards.js';
import type { CreateTagRequest, ExampleTag, ExampleTagListResponse } from '../schemas.js';

export type { CreateTagRequest, ExampleTag, ExampleTagListResponse } from '../schemas.js';

/** Query params for GET /examples/tags (not a named OpenAPI schema). */
export type ListTagsParams = {
  readonly limit?: number;
  readonly offset?: number;
};

export function isExampleTagResponse(value: unknown): value is ExampleTag {
  return validateExampleTagResponse(value);
}

export function isExampleTagListResponse(value: unknown): value is ExampleTagListResponse {
  return validateExampleTagListResponse(value);
}

export function isCreateTagRequest(value: unknown): value is CreateTagRequest {
  return validateCreateTagRequest(value);
}
