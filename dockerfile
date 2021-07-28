FROM node:14

COPY [".", "node-app"]

WORKDIR /node-app

RUN npm ci --only=prod


ARG port=1313
ARG build=no-build
ARG version=no-hash
ARG repo=no-repo
ARG tag=api-payments-gateway

ENV APP_PORT=${port} \
    APP_BUILD=${build} \
    APP_COMMIT=${version} \
    APP_REPO=${repo} \
    APP_TAG=${tag}

EXPOSE ${APP_PORT}

CMD ["node", "src/index.js"]