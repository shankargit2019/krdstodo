# Create image based on the official Node 6 image from dockerhub
FROM node:8.9

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

#Install Angular -cli
RUN npm install -g @angular/cli@1.7.0

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY . /usr/src/app

#Install Node Modules
RUN npm install

# Expose the port the app runs in
EXPOSE 4200 49153 9876 4201

# Serve the app
CMD ng serve --host 0.0.0.0 --poll 1000
#CMD ["ng", "serve","--host","0.0.0.0","--poll","1000"]