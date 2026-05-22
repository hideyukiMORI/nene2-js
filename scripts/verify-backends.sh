#!/usr/bin/env bash
# Quick multi-backend probe for local evac ports (no secrets).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

probe() {
  local name="$1" url="$2"
  echo "== $name ($url) =="
  curl -fsS "$url/" | head -c 120
  echo
  curl -fsS "$url/health" | head -c 200
  echo
  curl -fsS "$url/examples/ping" | head -c 80
  echo
  curl -fsS "$url/examples/notes?limit=1" | head -c 120
  echo
  if [[ -n "${NENE2_MACHINE_API_KEY:-}" ]]; then
    curl -fsS -H "X-NENE2-API-Key: ${NENE2_MACHINE_API_KEY}" "$url/machine/health" | head -c 120
    echo
  fi
}

export NENE2_MACHINE_API_KEY="${NENE2_MACHINE_API_KEY:-ft-evac-local-machine-api-key-32ch!!}"
probe "NENE2 evac" "${NENE2_JS_API_BASE_URL:-http://localhost:18080}"
if curl -fsS --max-time 2 "${NENE2_JS_PYTHON_BASE_URL:-http://localhost:18000}/health" >/dev/null 2>&1; then
  probe "nene2-python" "${NENE2_JS_PYTHON_BASE_URL:-http://localhost:18000}"
else
  echo "== nene2-python: skip (not running on :18000) =="
fi
echo "verify-backends: ok"
