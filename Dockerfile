# pull official base image
FROM node:13.12.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# install react-twitch-embed, a git dependency
WORKDIR /app/node_modules
RUN rm -rf react-twitch-embed
RUN git clone https://github.com/yigitozkavci/react-twitch-embed
WORKDIR /app/node_modules/react-twitch-embed
RUN npm install && npm run-script build
WORKDIR /app

# install the binary for serving the production build
RUN npm install -g serve

# add app
COPY . ./

RUN npm run-script build

# start app
CMD ["serve", "-s", "build"]
