FROM node:16.14.0-alpine AS base

ENV NODE_ENV "development"

EXPOSE $API_PORT

WORKDIR /usr/src/app

RUN npm install -g npm

COPY ./api/package*.json ./

RUN npm install

COPY ./api ./

RUN npm run build

# prod image
FROM base

ENV NODE_ENV "production"

RUN \
apk --no-cache --update add curl && \
rm -rf /var/cache/apk/*

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install --production

COPY --from=base /usr/src/app/dist ./dist

CMD npm run start:prod
