FROM node:14.17.5-alpine

WORKDIR /var/www/se_atm

COPY package.json yarn.lock ./ 

RUN yarn --pure-lockfile

RUN yarn install

RUN yarn build

COPY . .

# COPY /usr/src/app/dist ./dist

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]