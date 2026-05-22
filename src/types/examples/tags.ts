/**
 * Example tags types (OpenAPI `ExampleTag*` schemas).
 */

export interface ExampleTag {
  readonly id: number;
  readonly name: string;
}

export interface ExampleTagListResponse {
  readonly items: readonly ExampleTag[];
  readonly limit: number;
  readonly offset: number;
}

export interface CreateTagRequest {
  readonly name: string;
}

export type ListTagsParams = {
  readonly limit?: number;
  readonly offset?: number;
};

function isExampleTag(value: unknown): value is ExampleTag {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { id, name } = value as Record<string, unknown>;
  return typeof id === 'number' && Number.isInteger(id) && typeof name === 'string';
}

export function isExampleTagResponse(value: unknown): value is ExampleTag {
  return isExampleTag(value);
}

export function isExampleTagListResponse(value: unknown): value is ExampleTagListResponse {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { items, limit, offset } = value as Record<string, unknown>;
  if (!Array.isArray(items) || !items.every(isExampleTag)) {
    return false;
  }
  return typeof limit === 'number' && typeof offset === 'number';
}

export function isCreateTagRequest(value: unknown): value is CreateTagRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const { name } = value as Record<string, unknown>;
  return typeof name === 'string' && name.length > 0;
}
