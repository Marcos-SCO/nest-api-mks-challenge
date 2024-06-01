FROM node:20.14.0

WORKDIR /api

COPY ./api/package*.json ./

# RUN rm -rf node_modules
RUN npm install

CMD ["npm", "run", "start:dev"]

EXPOSE 5002