FROM node:20

WORKDIR /Hatem/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3000

EXPOSE 3000

CMD ["npm", "run", "start:dev"]