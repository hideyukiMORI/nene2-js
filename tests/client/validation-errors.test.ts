import { describe, expect, it } from 'vitest';
import {
  Nene2ClientError,
  validationErrorsByField,
  validationErrorsFromClientError,
} from '../../src/index.js';

describe('validationErrorsFromClientError', () => {
  it('extracts errors from validation-failed problem', () => {
    const err = new Nene2ClientError('failed', {
      status: 422,
      url: 'http://localhost/examples/notes',
      problem: {
        type: 'https://nene2.dev/problems/validation-failed',
        title: 'Validation Failed',
        status: 422,
        errors: [{ field: 'title', message: 'Required', code: 'required' }],
      },
    });
    const errors = validationErrorsFromClientError(err);
    expect(errors).toHaveLength(1);
    expect(validationErrorsByField(errors!)).toEqual({ title: 'Required' });
  });

  it('returns undefined for non-validation errors', () => {
    const err = new Nene2ClientError('failed', {
      status: 404,
      url: 'http://localhost/x',
      problem: {
        type: 'https://nene2.dev/problems/not-found',
        title: 'Not Found',
        status: 404,
      },
    });
    expect(validationErrorsFromClientError(err)).toBeUndefined();
  });
});
