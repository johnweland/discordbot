FROM node:14.9.0-stretch

WORKDIR /usr/discordbot

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]