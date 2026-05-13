import { existsSync, copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const defaults = {
  'apps/api/.env': `NODE_ENV=development\nPORT=4000\nDATABASE_URL=file:./dev.db\nJWT_SECRET=change_me_at_least_16_chars\nJWT_EXPIRES_IN=1d\nJWT_REFRESH_SECRET=change_me_refresh_at_least_16_chars\nJWT_REFRESH_EXPIRES_IN=7d\nCORS_ORIGIN=http://localhost:5173\n`,
  'apps/web/.env': `VITE_API_BASE_URL=http://localhost:4000\nVITE_SOCKET_URL=http://localhost:4000\nVITE_AI_BASE_URL=http://localhost:8000\nVITE_DEV_JWT_TOKEN=\nVITE_DEV_COMPANY_ID=\n`,
  'apps/ai-service/.env': `AI_SERVICE_PORT=8000\nOLLAMA_BASE_URL=http://localhost:11434\nCHROMA_PERSIST_DIR=./chroma_db\nUPLOAD_DIR=./uploads\n`
};

for (const [dest, content] of Object.entries(defaults)) {
  const target = resolve(dest);
  if (existsSync(target)) continue;

  const example = `${target}.example`;
  mkdirSync(dirname(target), { recursive: true });
  if (existsSync(example)) {
    copyFileSync(example, target);
  } else {
    writeFileSync(target, content, 'utf8');
  }
}

execSync('pnpm --filter @aems/api prisma:generate', { stdio: 'inherit' });
execSync('pnpm --filter @aems/api exec prisma db push', { stdio: 'inherit' });
console.log('Local environment prepared.');
