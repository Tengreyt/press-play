FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build:node

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 NUXT_ORDER_DATABASE_PATH=/data/orders.sqlite
COPY --from=build --chown=node:node /app/.output ./.output
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
