#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v node >/dev/null || { echo "Node.js is required"; exit 1; }
command -v pnpm >/dev/null || npm install -g pnpm

cp -n apps/api/.env.example apps/api/.env || true
cp -n apps/web/.env.example apps/web/.env || true
cp -n apps/ai-service/.env.example apps/ai-service/.env || true

pnpm install

if command -v docker >/dev/null; then
  docker rm -f aems-postgres >/dev/null 2>&1 || true
  docker run --name aems-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aems -p 5432:5432 -d postgres:15 >/dev/null
fi

pnpm --filter @aems/api prisma:generate || true
pnpm --filter @aems/api prisma:migrate || true

if command -v ollama >/dev/null; then
  (ollama serve >/tmp/aems-ollama.log 2>&1 &) || true
  sleep 2
  ollama pull nomic-embed-text || true
  ollama pull llama3.1 || true
fi

cd apps/ai-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd "$ROOT_DIR"

echo "Bootstrap complete. Run: ./scripts/run-all.sh"
