FROM node:20-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile=false
CMD ["pnpm","--filter","@aems/web","dev","--host"]
