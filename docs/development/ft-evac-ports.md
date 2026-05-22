# Field trial port evacuation

When other agents occupy default ports, use **alternate URLs** via env vars only — the client does not hardcode ports.

## Suggested evacuation map

| Backend      | Default | Evac (example) | Env variable               |
| ------------ | ------- | -------------- | -------------------------- |
| NENE2 (PHP)  | 8080    | **18080**      | `NENE2_JS_API_BASE_URL`    |
| nene2-python | 8000    | **18000**      | `NENE2_JS_PYTHON_BASE_URL` |
| nene2-node   | 3000    | **13000**      | `NENE2_JS_NODE_BASE_URL`   |

Env for machine health (evac default in compose):

```bash
export NENE2_MACHINE_API_KEY=ft-evac-local-machine-api-key-32ch!!
```

MySQL for NENE2 Docker evac: host port **13307** (see `tools/compose-ft-evac.yaml`).

## NENE2 Docker (evac)

From sibling `../NENE2` (do **not** use `compose.override.yaml` if it still publishes `:8080`):

```bash
cd ../NENE2
docker compose -f compose.yaml -f ../nene2-js/tools/compose-ft-evac.yaml up -d
curl -sS http://localhost:18080/health | jq .
```

## nene2-python (evac)

```bash
cd ../nene2-python
uv run uvicorn src.example.app:app --host 127.0.0.1 --port 18000
```

## JWT / `getProtected` (evac Docker)

`tools/compose-ft-evac.yaml` sets a **local-only** `NENE2_LOCAL_JWT_SECRET` so `/examples/protected` is registered (without it, the route returns 404).

```bash
cd ../NENE2
docker compose -f compose.yaml -f ../nene2-js/tools/compose-ft-evac.yaml up -d --force-recreate app

cd ../nene2-js
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_LOCAL_JWT_SECRET=ft-evac-local-jwt-secret-min-32-chars!!
# optional: export NENE2_JS_BEARER_TOKEN=$(node tools/issue-dev-jwt.mjs)
./scripts/run-live-smoke-evac.sh
```

## Live smoke (all configured backends)

```bash
cd nene2-js
export NENE2_JS_API_BASE_URL=http://localhost:18080
export NENE2_JS_PYTHON_BASE_URL=http://localhost:18000
npm test -- tests/client/live-smoke-matrix.test.ts
```

Unset vars are skipped. Restore defaults when ports are free.
