import { parseProblemDetailsResponse } from '../problem/guards.js';
import type { ProblemDetailsDocument } from '../problem/types.js';
import type { ResolvedNene2ClientConfig } from './config.js';
import { Nene2ClientError } from './errors.js';
import { parseRateLimitHeaders } from './rate-limit.js';
import { mergeRequestSignal } from './signal.js';

function errorFromResponse(
  message: string,
  response: Response,
  url: string,
  problem?: ProblemDetailsDocument,
): Nene2ClientError {
  return new Nene2ClientError(message, {
    status: response.status,
    url,
    problem,
    rateLimit: parseRateLimitHeaders(response.headers),
  });
}

function withSignal(config: ResolvedNene2ClientConfig, init: RequestInit): RequestInit {
  const signal = mergeRequestSignal(config.signal, config.timeoutMs);
  if (signal === undefined) {
    return init;
  }
  return { ...init, signal };
}

/** @internal Wrap fetch failures so consumers can use isNene2ClientError uniformly. */
export function wrapFetchError(error: unknown, url: string): Nene2ClientError {
  if (error instanceof Nene2ClientError) {
    return error;
  }
  if (error instanceof Error) {
    const prefix =
      error.name === 'AbortError' || error.name === 'TimeoutError'
        ? 'NENE2 request aborted or timed out'
        : 'NENE2 network request failed';
    return new Nene2ClientError(`${prefix}: ${error.message}`, { status: 0, url });
  }
  return new Nene2ClientError('NENE2 network request failed', { status: 0, url });
}

async function fetchRequest(
  config: ResolvedNene2ClientConfig,
  url: string,
  init: RequestInit,
): Promise<Response> {
  try {
    return await config.fetch(url, withSignal(config, init));
  } catch (error) {
    throw wrapFetchError(error, url);
  }
}

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
  const contentType = response.headers.get('content-type') ?? '';
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    const hint =
      contentType.includes('text/html') || contentType.includes('text/plain')
        ? ' — response looks like HTML/text; check baseUrl points at NENE2 JSON API'
        : '';
    throw errorFromResponse(`NENE2 response is not valid JSON${hint}`, response, url);
  }

  if (!isValid(body)) {
    throw errorFromResponse('NENE2 response body does not match expected shape', response, url);
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
  throw errorFromResponse(`NENE2 request failed: ${detail}`, response, url, problem);
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
  const response = await fetchRequest(config, url, {
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
  const response = await fetchRequest(config, url, {
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
  const response = await fetchRequest(config, url, {
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
  const response = await fetchRequest(config, url, {
    method: 'DELETE',
    headers: buildAuthHeaders(config),
  });

  await throwOnErrorResponse(response, url, options);
}
