#!/usr/bin/env bash
# Live smoke against evacuation ports (see docs/development/ft-evac-ports.md).
set -euo pipefail
cd "$(dirname "$0")/.."

export NENE2_JS_API_BASE_URL="${NENE2_JS_API_BASE_URL:-http://localhost:18080}"
# Optional parity — expect failures until nene2-python #553:
# export NENE2_JS_PYTHON_BASE_URL="${NENE2_JS_PYTHON_BASE_URL:-http://localhost:18000}"

echo "NENE2_JS_API_BASE_URL=$NENE2_JS_API_BASE_URL"
npm test -- tests/client/live-smoke-matrix.test.ts
