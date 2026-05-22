import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  NENE2_PROBLEM_TYPE_VALIDATION_FAILED,
  isNene2ValidationFailedProblem,
  isProblemDetails,
  isValidationError,
  isValidationProblemDetails,
  parseProblemDetails,
  parseProblemDetailsResponse,
  parseValidationProblemDetails,
  problemDetailsExtensions,
} from '../../src/problem/index.js';

const fixturesDir = resolve(process.cwd(), 'tests/fixtures/problem');

function loadFixture(name: string): unknown {
  const text = readFileSync(resolve(fixturesDir, name), 'utf8');
  return JSON.parse(text) as unknown;
}

describe('Problem Details guards', () => {
  it('accepts OpenAPI not-found fixture', () => {
    const body = loadFixture('not-found.json');
    expect(isProblemDetails(body)).toBe(true);
    expect(parseProblemDetails(body)?.status).toBe(404);
  });

  it('accepts OpenAPI validation-failed fixture', () => {
    const body = loadFixture('validation-failed.json');
    expect(isValidationProblemDetails(body)).toBe(true);
    const parsed = parseProblemDetails(body);
    expect(parsed).toBeDefined();
    expect(parsed && isNene2ValidationFailedProblem(parsed)).toBe(true);
    expect(parseValidationProblemDetails(body)?.errors).toHaveLength(1);
  });

  it('exposes extension members via problemDetailsExtensions', () => {
    const body = loadFixture('payload-too-large.json');
    expect(isProblemDetails(body)).toBe(true);
    const parsed = parseProblemDetails(body);
    expect(parsed).toBeDefined();
    const extensions = problemDetailsExtensions(parsed!);
    expect(extensions).toEqual({ max_body_bytes: 1048576 });
  });

  it('rejects non-objects and invalid status', () => {
    expect(isProblemDetails(null)).toBe(false);
    expect(isProblemDetails([])).toBe(false);
    expect(isProblemDetails({ type: 'x', title: 'y', status: 200 })).toBe(false);
    expect(isProblemDetails({ type: 'x', title: 'y', status: '404' })).toBe(false);
  });

  it('rejects ValidationError with extra keys', () => {
    expect(
      isValidationError({
        field: 'a',
        message: 'b',
        code: 'c',
        extra: true,
      }),
    ).toBe(false);
  });

  it('rejects validation problem without errors array', () => {
    expect(
      isValidationProblemDetails({
        type: NENE2_PROBLEM_TYPE_VALIDATION_FAILED,
        title: 'Validation Failed',
        status: 422,
      }),
    ).toBe(false);
  });

  it('parses application/problem+json Response', async () => {
    const payload = loadFixture('not-found.json');
    const response = new Response(JSON.stringify(payload), {
      status: 404,
      headers: { 'content-type': 'application/problem+json' },
    });
    const parsed = await parseProblemDetailsResponse(response);
    expect(parsed?.title).toBe('Not Found');
  });

  it('returns undefined for non-problem content-type', async () => {
    const response = new Response('not json', {
      status: 500,
      headers: { 'content-type': 'text/plain' },
    });
    expect(await parseProblemDetailsResponse(response)).toBeUndefined();
  });
});
