FROM node:20-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile=false
RUN pnpm --filter @aems/api build
CMD ["pnpm","--filter","@aems/api","dev"]
