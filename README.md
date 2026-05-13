# AEMS - One-command setup

## Quickest way (auto setup)
From repo root:

```bash
pnpm run bootstrap
pnpm run start:all
```

This automatically:
- installs dependencies
- creates `.env` files from examples
- starts PostgreSQL via Docker (if available)
- runs Prisma generate + migrate
- installs AI Python dependencies
- pulls Ollama models (if Ollama installed)
- starts API, Web, and AI services

## App URLs
- Web: http://localhost:5173
- API: http://localhost:4000/health
- AI: http://localhost:8000/health

## Download links
Your current local repo has **no git remote configured**, so no GitHub link exists yet.

To create download links:
1. Create a GitHub repository.
2. Add remote:
```bash
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin <your-branch>
```
3. Then your links are:
- Repo: `https://github.com/<username>/<repo>`
- Clone: `https://github.com/<username>/<repo>.git`
- ZIP: `https://github.com/<username>/<repo>/archive/refs/heads/<branch>.zip`
