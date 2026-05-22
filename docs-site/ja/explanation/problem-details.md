# Problem Details (RFC 9457)

```ts
import {
  parseProblemDetailsResponse,
  isNene2ValidationFailedProblem,
} from '@hideyukimori/nene2-client';

const problem = await parseProblemDetailsResponse(response);
```

`Nene2ClientError` は `status` / `url` / `problem` を保持します。`validationErrorsFromClientError` でフィールド単位のエラーを取り出せます。型ガードでワイヤ上の JSON を盲信しません。
