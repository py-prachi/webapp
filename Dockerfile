FROM node:alpine
WORKDIR /webapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "start" ]
