FROM node:22.6-alpine

WORKDIR /app

ENV NODE_ENV production

COPY /apps/jobs/dist .

COPY node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node /.prisma/client/

CMD node --enable-source-maps index.js
