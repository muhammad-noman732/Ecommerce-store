FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "index.js"]