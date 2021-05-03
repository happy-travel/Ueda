FROM node:16.0.0-alpine as builder

RUN apk update && \
    apk add --no-cache git python alpine-sdk

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG IDENTITY_URL
ARG EDO_URL
ARG SENTRY_DSN
ARG BUILD_VERSION

ENV BUILD_VERSION=$BUILD_VERSION
ENV REACT_APP_IDENTITY_URL=$IDENTITY_URL
ENV REACT_APP_EDO_URL=$EDO_URL
ENV REACT_APP_SENTRY_DSN=$SENTRY_DSN

WORKDIR /usr/src/app/public

RUN npm run build

FROM nginx:1.20.0-alpine

RUN apk update && \
    apk add --no-cache curl

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://127.0.0.1/health || exit 1
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]