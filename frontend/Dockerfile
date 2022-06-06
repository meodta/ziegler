FROM node:16.14.0-alpine AS base

ARG PORT=3000
ENV PORT $PORT

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL "$REACT_APP_API_URL"

ARG REACT_APP_API_PORT
ENV REACT_APP_API_PORT "$REACT_APP_API_PORT"

ARG REACT_APP_AUTH0_DOMAIN
ENV REACT_APP_AUTH0_DOMAIN "$REACT_APP_AUTH0_DOMAIN"

ARG REACT_APP_AUTH0_CLIENT_ID
ENV REACT_APP_AUTH0_CLIENT_ID "$REACT_APP_AUTH0_CLIENT_ID"

ARG REACT_APP_AUTH0_SCOPES
ENV REACT_APP_AUTH0_SCOPES "$REACT_APP_AUTH0_SCOPES"

WORKDIR /usr/src/app

EXPOSE $PORT

COPY ./frontend/package*.json ./

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

RUN npm install

COPY ./frontend ./

RUN npm run build

### --- Final Image --- ###
FROM base 

ENV NODE_ENV "production"

USER root

RUN \
apk --no-cache --update add dumb-init && \
rm -rf /var/cache/apk/*

RUN npm install -g serve

USER 1000:1000

USER node
WORKDIR /build

COPY --from=base /usr/src/app/build ./

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["serve", "-d", "-l", "tcp://0.0.0.0:${PORT}", "-s", "/build"]
