import { parseProblemDetailsResponse } from '../problem/guards.js';
import type { ProblemDetailsDocument } from '../problem/types.js';
import { Nene2ClientError } from './errors.js';
import type { ResolvedNene2ClientConfig } from './config.js';

export function buildAuthHeaders(config: ResolvedNene2ClientConfig): Headers {
  const headers = new Headers({ Accept: 'application/json' });
  if (config.apiKey !== undefined) {
    headers.set('X-NENE2-API-Key', config.apiKey);
  }
  if (config.bearer !== undefined) {
    headers.set('Authorization', `Bearer ${config.bearer}`);
  }
  return headers;
}

export type JsonRequestOptions = {
  /** HTTP status codes to treat as success (e.g. 503 degraded health). */
  readonly alsoOkStatuses?: readonly number[];
};

function isSuccessStatus(response: Response, options?: JsonRequestOptions): boolean {
  if (response.ok) {
    return true;
  }
  return options?.alsoOkStatuses?.includes(response.status) ?? false;
}

async function parseJsonBody<T>(
  response: Response,
  url: string,
  isValid: (value: unknown) => value is T,
): Promise<T> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Nene2ClientError('NENE2 response is not valid JSON', {
      status: response.status,
      url,
    });
  }

  if (!isValid(body)) {
    throw new Nene2ClientError('NENE2 response body does not match expected shape', {
      status: response.status,
      url,
    });
  }

  return body;
}

async function throwOnErrorResponse(
  response: Response,
  url: string,
  options?: JsonRequestOptions,
): Promise<void> {
  if (isSuccessStatus(response, options)) {
    return;
  }
  const problem: ProblemDetailsDocument | undefined = await parseProblemDetailsResponse(response);
  const detail = problem?.detail ?? problem?.title ?? response.statusText;
  throw new Nene2ClientError(`NENE2 request failed: ${detail}`, {
    status: response.status,
    url,
    problem,
  });
}

/**
 * GET JSON and validate the body with a type guard. Throws {@link Nene2ClientError} on failure.
 */
export async function getJson<T>(
  config: ResolvedNene2ClientConfig,
  path: string,
  isValid: (value: unknown) => value is T,
  options?: JsonRequestOptions,
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const response = await config.fetch(url, {
    method: 'GET',
    headers: buildAuthHeaders(config),
  });

  await throwOnErrorResponse(response, url, options);
  return parseJsonBody(response, url, isValid);
}

/**
 * POST JSON and validate the response body. Throws {@link Nene2ClientError} on failure.
 */
export async function postJson<T>(
  config: ResolvedNene2ClientConfig,
  path: string,
  payload: unknown,
  isValid: (value: unknown) => value is T,
  options?: JsonRequestOptions,
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const headers = buildAuthHeaders(config);
  headers.set('Content-Type', 'application/json');
  const response = await config.fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  await throwOnErrorResponse(response, url, options);
  return parseJsonBody(response, url, isValid);
}

/**
 * PUT JSON and validate the response body. Throws {@link Nene2ClientError} on failure.
 */
export async function putJson<T>(
  config: ResolvedNene2ClientConfig,
  path: string,
  payload: unknown,
  isValid: (value: unknown) => value is T,
  options?: JsonRequestOptions,
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const headers = buildAuthHeaders(config);
  headers.set('Content-Type', 'application/json');
  const response = await config.fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });

  await throwOnErrorResponse(response, url, options);
  return parseJsonBody(response, url, isValid);
}

/**
 * DELETE with no response body (204). Throws {@link Nene2ClientError} on failure.
 */
export async function deleteNoContent(
  config: ResolvedNene2ClientConfig,
  path: string,
  options?: JsonRequestOptions,
): Promise<void> {
  const url = `${config.baseUrl}${path}`;
  const response = await config.fetch(url, {
    method: 'DELETE',
    headers: buildAuthHeaders(config),
  });

  await throwOnErrorResponse(response, url, options);
}
