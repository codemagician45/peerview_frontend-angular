### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:9-alpine as builder

ARG npmConfigProduction
ARG nodeEnv
ARG peersviewApi
ENV NPM_CONFIG_PRODUCTION=${npmConfigProduction}
ENV NODE_ENV=${nodeEnv}
ENV PEERSVIEW_API=${peersviewApi}

COPY package*.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install && mkdir /app && mv ./node_modules ./app

## Move to /app (eq: cd /app)
WORKDIR /app

# Copy everything from host to /app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build-prod

### STAGE 2: Setup ###

FROM nginx:1.15-alpine

## Copy our default nginx config
COPY nginx /etc/nginx/conf.d

## Copy our default ssl
COPY ssl ~/ssl

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]