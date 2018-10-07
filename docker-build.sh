#!/bin/bash

# Globals
BUILD_SCRIPT_DIR=
REPO_DIR=
NODE_PACKAGE_FILE_CONTENTS=
NODE_PACKAGE_NAME=
NODE_PACKAGE_VERSION=
CONTAINER_NAME=
IMAGE_NAME=
IMAGE_VERSION=

init()
{
  BUILD_SCRIPT_DIR=$(cd "$(dirname "$0")" ; pwd -P)
  REPO_DIR=${BUILD_SCRIPT_DIR}

  setNodePackageFileContents
  setNodePackageName
  setNodePackageVersion

  CONTAINER_NAME=${NODE_PACKAGE_NAME}
  IMAGE_NAME="caninojories/${NODE_PACKAGE_NAME}"
  IMAGE_VERSION="${NODE_PACKAGE_VERSION}"
}

setNodePackageName()
{
  NODE_PACKAGE_NAME=$(echo "${NODE_PACKAGE_FILE_CONTENTS}" | grep '^  "name": ' | sed -e 's/^.*: "\(.*\)",$/\1/')
  echo ${NODE_PACKAGE_NAME}
}

setNodePackageVersion()
{
  NODE_PACKAGE_VERSION=$(echo "${NODE_PACKAGE_FILE_CONTENTS}" | grep '^  "version": ' | sed -e 's/^.*"\([0-9]*\.[0-9]*\.[0-9]*\)",$/\1/')

  echo ${NODE_PACKAGE_VERSION}
}

setNodePackageFileContents()
{
  NODE_PACKAGE_FILE_CONTENTS="$(cat ${REPO_DIR}/package.json)"

  if [[ "${NODE_PACKAGE_FILE_CONTENTS}" = "" ]] ; then
    echo "Exiting due to unexpected file contents"
    exit 1
  fi
}

buildImage()
{
  docker build \
    --tag ${IMAGE_NAME}:v${IMAGE_VERSION} \
    --build-arg npmConfigProduction=false \
    --build-arg nodeEnv=production \
    --build-arg peersviewApi=http://peersview.us-east-2.elasticbeanstalk.com/api/v1/ \
    --file Dockerfile \
    .
}

pushImage()
{
  docker push ${IMAGE_NAME}:v${IMAGE_VERSION}

}

runDevContainer()
{
echo -n "
INTRIBE_API_LISTEN_TCP_PORT=${INTRIBE_API_LISTEN_TCP_PORT}
INTRIBE_API_LISTEN_DOMAIN_NAME=${INTRIBE_API_LISTEN_DOMAIN_NAME}
INTRIBE_MONGO_DB_ADMIN_URL="mongodb://intribe-db:27017/admin?authSource=admin"
INTRIBE_MONGO_DB_URL="mongodb://intribe-db:27017/intribe-api?authSource=admin"
INTRIBE_MONGO_DB_ADMIN_PW=${INTRIBE_MONGO_DB_ADMIN_PW}
INTRIBE_MONGO_DB_API_USER=${INTRIBE_MONGO_DB_API_USER}
INTRIBE_MONGO_DB_API_USER_PW=${INTRIBE_MONGO_DB_API_USER}
INTRIBE_AUTH0_API_CLIENT_ID=${INTRIBE_AUTH0_API_CLIENT_ID}
INTRIBE_AUTH0_API_CLIENT_SECRET=${INTRIBE_AUTH0_API_CLIENT_SECRET}
INTRIBE_AUTH0_API_PASSWORD=${INTRIBE_AUTH0_API_PASSWORD}
INTRIBE_HASH_SECRET=${INTRIBE_HASH_SECRET}
INTRIBE_SENDGRID_API_KEY=${INTRIBE_SENDGRID_API_KEY}
INTRIBE_DB_INIT_CREATE_ADMIN_USER=${INTRIBE_DB_INIT_CREATE_ADMIN_USER}
INTRIBE_DB_INIT_CREATE_API_USER=${INTRIBE_DB_INIT_CREATE_API_USER}
INTRIBE_DB_INIT_INSERT_DEFAULT_CONFIG=${INTRIBE_DB_INIT_INSERT_DEFAULT_CONFIG}
INTRIBE_INIT_DONT_RUN_APP=${INTRIBE_INIT_DONT_RUN_APP}
INTRIBE_DEBUG_LEVEL=${INTRIBE_DEBUG_LEVEL}" > docker-run-env.list

  docker run --rm --name ${CONTAINER_NAME} \
    --publish ${INTRIBE_API_LISTEN_TCP_PORT}:${INTRIBE_API_LISTEN_TCP_PORT}  \
    --network intribe-dev \
    --rm \
    --detach \
    --env-file docker-run-env.list \
    \
    ${IMAGE_NAME}:v${IMAGE_VERSION}
}

runMongoDbContainer() {
  docker run --name intribe-db --publish 27017:27017 --network intribe-dev -d mongo:3.6
}

killContainer()
{
  docker container kill ${CONTAINER_NAME}
}

removeContainer()
{
  # docker container rm ${CONTAINER_NAME}
  docker rmi $(docker images | grep ${IMAGE_NAME} | awk '{print $3}')
}

rebuildImage()
{
  killContainer
  removeContainer
  buildImage
  sleep 1
  runContainer
}

enterContainer() {
  docker exec-it ${CONTAINER_NAME} /bin/bash
}


run() {
  local COMMAND=$1

  case ${COMMAND} in
    build)
      buildImage
      ;;
    push)
      pushImage
      ;;
    rebuild)
      rebuildImage
      ;;
    runDev)
      runDevContainer
      ;;
    runMongo)
      runMongoDbContainer
      ;;
    kill)
      killContainer
      ;;
    remove)
      removeContainer
      ;;
    ssh)
      enterContainer
      ;;
    *)
      echo "Usage: $0 [ build | rebuild | runDev | runMongo | kill | remove | ssh ]"
      ;;
  esac
}

init
run $1
