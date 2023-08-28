# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install a compatible version of React
RUN npm install react@18.2.0

# Copy the rest of the application code to the container
COPY . .


# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "run","dev"]
