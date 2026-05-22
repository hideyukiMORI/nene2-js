# Problem Details (RFC 9457)

NENE2 APIs return structured errors as `application/problem+json`. The client and standalone helpers parse and narrow them safely.

## Parse from a Response

```ts
import {
  parseProblemDetailsResponse,
  isNene2ValidationFailedProblem,
} from '@hideyukimori/nene2-client';

const problem = await parseProblemDetailsResponse(response);
if (problem && isNene2ValidationFailedProblem(problem)) {
  for (const err of problem.errors) {
    console.log(err.field, err.message);
  }
}
```

## Client errors

`Nene2ClientError` carries `status`, `url`, and optional `problem`:

```ts
import { Nene2ClientError, validationErrorsFromClientError } from '@hideyukimori/nene2-client';

try {
  await client.createNote({ title: '' });
} catch (e) {
  if (e instanceof Nene2ClientError) {
    const fields = validationErrorsFromClientError(e);
  }
}
```

Type guards avoid trusting arbitrary JSON from the wire — important for security reviews and stable DX.
