#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

cleanup() { kill 0; }
trap cleanup EXIT

(pnpm --filter @aems/api dev) &
(pnpm --filter @aems/web dev --host) &
(cd apps/ai-service && source .venv/bin/activate && uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload) &

wait
