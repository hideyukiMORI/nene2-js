# Smoke test en direct

```bash
export NENE2_JS_API_BASE_URL=http://localhost:8080
npm test -- tests/client/live-smoke-matrix.test.ts
```

CI utilise uniquement des fixtures. URLs non définies sont ignorées.
