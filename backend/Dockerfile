# Stage 1: Build the production bundle
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port (must match the PORT in your server.js, typically 5000)
EXPOSE 5000

# Command to run the application
CMD [ "node", "server.js" ]