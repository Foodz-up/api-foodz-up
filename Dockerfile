FROM node:14-alpine

WORKDIR /home/node

COPY package*.json /home/node/

RUN npm install

RUN npm run build

CMD [ "node", "dist/main" ]