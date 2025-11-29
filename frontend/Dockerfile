# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Accept build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_NASA_API_KEY

# Set environment variables for the build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_NASA_API_KEY=$VITE_NASA_API_KEY

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production (this creates the 'dist' folder)
RUN npm run build

# Stage 2: Serve the application using a lightweight web server (Nginx)
FROM nginx:alpine

# Copy the built files from the build stage to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration to handle client-side routing
# If you run into "404 Not Found" when refreshing pages like /admin,
# you will need a custom nginx.conf to redirect all requests to index.html.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default HTTP port
EXPOSE 80

# The default command runs Nginx
CMD ["nginx", "-g", "daemon off;"]