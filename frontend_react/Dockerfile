FROM node:13
LABEL maintainer="pedro.cerqueira@medicina.ulisboa.pt"

WORKDIR /react_app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /react_app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /react_app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.0.0 -g --silent

# start app
CMD ["npm", "start"]
