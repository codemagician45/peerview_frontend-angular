FROM node:8
WORKDIR /usr/src/app
#ENV NPM_CONFIG_LOG_LEVEL warn
COPY package.json package-lock.json ./

RUN npm install --loglevel=warn

COPY . .
#EXPOSE 5000
CMD [ "npm", "start" ]