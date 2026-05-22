# Live smoke against NENE2

Optional integration tests hit a real NENE2 (or parity) base URL. CI uses fixtures only.

## Environment

```bash
cp .env.example .env
export NENE2_JS_API_BASE_URL=http://localhost:8080
# optional machine + JWT for protected routes:
# export NENE2_MACHINE_API_KEY=...
# export NENE2_LOCAL_JWT_SECRET=...
```

## Multi-backend matrix

Same client, different origins (ADR 0003):

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
export NENE2_JS_PYTHON_BASE_URL=http://localhost:8000
# export NENE2_JS_NODE_BASE_URL=http://localhost:3000

npm test -- tests/client/live-smoke-matrix.test.ts
```

Unset URLs are skipped automatically.

## Field-trial evac ports

Evac compose often binds **:18080**:

```bash
export NENE2_JS_API_BASE_URL=http://localhost:18080
npm run test:ft-marathon   # includes live evac subset when env is set
```

## Troubleshooting

| Symptom                            | Likely cause                                     |
| ---------------------------------- | ------------------------------------------------ |
| Body does not match expected shape | Wrong server on `baseUrl`                        |
| HTML hint in error                 | Reverse proxy or SPA on that port                |
| 401 on `getProtected`              | Missing or invalid bearer / JWT secret on server |
