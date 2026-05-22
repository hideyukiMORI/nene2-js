#!/usr/bin/env bash
# Live smoke against evacuation ports (see docs/development/ft-evac-ports.md).
set -euo pipefail
cd "$(dirname "$0")/.."

export NENE2_JS_API_BASE_URL="${NENE2_JS_API_BASE_URL:-http://localhost:18080}"
# Optional parity — expect failures until nene2-python #553:
# export NENE2_JS_PYTHON_BASE_URL="${NENE2_JS_PYTHON_BASE_URL:-http://localhost:18000}"

export NENE2_LOCAL_JWT_SECRET="${NENE2_LOCAL_JWT_SECRET:-ft-evac-local-jwt-secret-min-32-chars!!}"

echo "NENE2_JS_API_BASE_URL=$NENE2_JS_API_BASE_URL"
echo "NENE2_LOCAL_JWT_SECRET=(set, ${#NENE2_LOCAL_JWT_SECRET} chars)"
npm test -- tests/client/live-smoke-matrix.test.ts tests/client/live-protected.test.ts tests/client/live-notes-crud.test.ts tests/client/live-tags-crud.test.ts
