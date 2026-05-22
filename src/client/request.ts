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

/**
 * GET JSON and validate the body with a type guard. Throws {@link Nene2ClientError} on failure.
 */
export async function getJson<T>(
  config: ResolvedNene2ClientConfig,
  path: string,
  isValid: (value: unknown) => value is T,
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const response = await config.fetch(url, {
    method: 'GET',
    headers: buildAuthHeaders(config),
  });

  if (!response.ok) {
    const problem: ProblemDetailsDocument | undefined = await parseProblemDetailsResponse(response);
    const detail = problem?.detail ?? problem?.title ?? response.statusText;
    throw new Nene2ClientError(`NENE2 request failed: ${detail}`, {
      status: response.status,
      url,
      problem,
    });
  }

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
