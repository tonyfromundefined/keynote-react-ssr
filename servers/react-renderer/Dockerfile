FROM node:10

WORKDIR /usr/src/app

COPY package.json yarn.lock  /usr/src/app/
RUN yarn install --production

COPY ecosystem.config.js  /usr/src/app/
COPY src/  /usr/src/app/src/
COPY dist/  /usr/src/app/dist/

ENV NODE_ENV production

EXPOSE 80

CMD ["yarn", "start"]
