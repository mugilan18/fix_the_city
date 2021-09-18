# Dockerfile for React client

# Build react client
FROM node:14.17.0-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# copy local files to app folder
COPY . .
###  Installing dependencies

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
