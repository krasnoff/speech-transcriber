FROM node:22-alpine AS base

RUN corepack enable
RUN npm install --global turbo@2.9.14


# -------------------------
# PRUNE
# -------------------------

FROM base AS pruner

WORKDIR /app

COPY . .

RUN pnpm turbo prune api --docker


# -------------------------
# INSTALL + BUILD
# -------------------------

FROM base AS builder

WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm turbo run build --filter=api


# -------------------------
# PRODUCTION
# -------------------------

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app ./

EXPOSE 8080

CMD ["pnpm", "--filter", "api", "start"]
