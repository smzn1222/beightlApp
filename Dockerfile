# nodeのイメージでビルドをして、nginxのイメージで公開する
FROM node:18-bullseye-slim
WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

CMD "npm" "start"