# Getting started

Install the published client and call a running NENE2 JSON API.

## Install

```bash
npm install @hideyukimori/nene2-client
```

Requires **Node 22+** (native `fetch`) or a modern browser. TypeScript consumers get `.d.ts` from the package.

## Minimal example

```ts
import { createNene2Client, Nene2ClientError } from '@hideyukimori/nene2-client';

const client = createNene2Client({
  baseUrl: 'http://localhost:8080',
});

const { health, ping } = await client.smoke();
console.log(health.status, ping.message);
```

## Authentication (optional)

```ts
const client = createNene2Client({
  baseUrl: process.env.NENE2_JS_API_BASE_URL!,
  apiKey: process.env.NENE2_MACHINE_API_KEY,
  bearer: process.env.NENE2_BEARER_TOKEN,
});

const protectedRoute = await client.getProtected();
```

Never commit API keys or JWT secrets. Use environment variables in apps; see [Configuration](/reference/configuration).

## Verify the API origin

Port `8080` is not always NENE2. Confirm the health shape before live smoke:

```bash
curl -sS http://localhost:8080/health | jq .
# expect: { "status": "ok", "service": "NENE2" }
```

Wrong JSON (HTML, another framework) triggers a clear client error with an HTML hint.

If `service` is not `NENE2`, another process may own the port:

```ts
await client.health({ strictService: true });
```

## Degraded health

Load balancers may return **503** with `status: "degraded"`:

```ts
const health = await client.health({ allowDegraded: true });
```

Without the option, 503 is treated as `Nene2ClientError` like any other non-success status.

## Next steps

- [Live smoke against NENE2](/howto/live-smoke)
- [OpenAPI sync & codegen](/howto/openapi-codegen)
- [createNene2Client API](/reference/client-api)
