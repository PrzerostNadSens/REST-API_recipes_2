FROM node:14-slim

RUN mkdir -p /src/index

WORKDIR /src/index

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "./dist/index.js"]