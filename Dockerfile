FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "./"]

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
        then npm install; \
        else npm install --production; \
    fi

COPY . ./
EXPOSE ${PORT}
RUN chown -R node /app
USER node
CMD ["npm", "run", "start-dev"]
