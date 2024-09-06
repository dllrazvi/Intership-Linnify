FROM node:22.6-alpine AS base

### Runner
WORKDIR /app

ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY /apps/web/next.config.js .
COPY /apps/web/package.json .

COPY --chown=nextjs:nodejs /apps/web/.next/standalone ./
COPY --chown=nextjs:nodejs /apps/web/.next/static ./apps/web/.next/static
COPY --chown=nextjs:nodejs /apps/web/public ./apps/web/public

CMD node apps/web/server.js
