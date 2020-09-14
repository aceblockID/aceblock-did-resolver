FROM node:12-stretch
LABEL maintainer="Gregor Sajovic"

#RUN export NODE_ENV="dev"

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8083

CMD [ "npm", "start"]