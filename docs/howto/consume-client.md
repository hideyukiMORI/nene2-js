# How to consume `@hideyukimori/nene2-client`

Quick reference for TypeScript consumers (FT19 / Persona A).

## Install

In **your consumer app** (frontend, script, etc.) — not by cloning this repo:

```bash
cd your-app
npm install @hideyukimori/nene2-client@^1.0.0
```

**This repo (contributors only):**

```bash
cd nene2-js && npm install && npm run build
```

## Minimal smoke

```ts
import { createNene2Client } from '@hideyukimori/nene2-client';

const client = createNene2Client({ baseUrl: 'http://localhost:18080' });

const { health, ping } = await client.smoke();
console.log(health.service, ping.message);
```

## Validation errors → form fields

```ts
import {
  createNene2Client,
  Nene2ClientError,
  validationErrorsByField,
  validationErrorsFromClientError,
} from '@hideyukimori/nene2-client';

try {
  await client.createNote({ title: '', body: 'x' });
} catch (err) {
  if (err instanceof Nene2ClientError) {
    const fieldErrors = validationErrorsByField(validationErrorsFromClientError(err) ?? []);
    // { title: '...' }
  }
}
```

## Auth

| Need                      | Config        |
| ------------------------- | ------------- |
| JWT `/examples/protected` | `bearer: '…'` |
| Machine `/machine/health` | `apiKey: '…'` |

Evac ports and secrets: [ft-evac-ports.md](../development/ft-evac-ports.md).
