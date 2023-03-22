# nodeのイメージでビルドをして、nginxのイメージで公開する
# ---ステージ(1/2) ビルド用のNode.jsコンテナ---
FROM node:18-bullseye-slim as builder
WORKDIR /app

# パッケージをインストール
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev

# ソースコードなどをコピー
COPY --chown=node:node . .

# ビルド
RUN npm run build

# ---ステージ(2/2) Nginxコンテナ---
FROM nginx:1.23-alpine-slim

# ビルド用のNode.jsコンテナ(=builder)からビルドファイルをコピーする
COPY --from=builder --chown=nonroot:nonroot /app/build/ /usr/share/nginx/html/

# nginx設定ファイルの配置 (コンテナイメージ内の/etc/nginx/templates/*.templateは起動時、envsubst実行後に /etc/nginx/conf.dに展開される)
# TODO: nginxの設定ファイルを学習して設定する
# COPY ./default.conf.template /etc/nginx/templates/default.conf.template