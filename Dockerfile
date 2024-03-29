FROM node:10
LABEL maintainer="ozcan.ovunc@smartface.io"
WORKDIR /app
COPY package.json /app
RUN npm config set strict-ssl=false
RUN npm install
COPY . /app
EXPOSE 80
CMD ["node", "index.js"]