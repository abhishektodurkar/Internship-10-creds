import { existsSync, copyFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const envPairs = [
  ['apps/api/.env.example', 'apps/api/.env'],
  ['apps/web/.env.example', 'apps/web/.env'],
  ['apps/ai-service/.env.example', 'apps/ai-service/.env']
];

for (const [src, dest] of envPairs) {
  if (!existsSync(dest)) copyFileSync(src, dest);
}

execSync('pnpm --filter @aems/api prisma:generate', { stdio: 'inherit' });
execSync('pnpm --filter @aems/api exec prisma db push', { stdio: 'inherit' });
console.log('Local environment prepared.');
