FROM node:10.16.3

# Install Sails globally
RUN npm install -g sails@1.2.3 --silent

ENV HOME=/home/app

COPY package.json $HOME/store-service/

# Change Work directory to app
WORKDIR $HOME/store-service

RUN npm install --silent

# Bundle app source
COPY . $HOME/store-service

# EXPOSE 1337

CMD ["sails", "lift"]