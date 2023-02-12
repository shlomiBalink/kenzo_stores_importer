FROM node:18-alpine As development

WORKDIR /usr/src/app
# ARG NPM_TOKEN

COPY .npmrc .
COPY --chown=node:node package*.json ./


RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc


RUN npm install
RUN rm -f .npmrc
COPY --chown=node:node . .

USER node



