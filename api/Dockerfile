# Use the official Node.js image from the Docker Hub
FROM node:lts-alpine

# Set environment variable
ENV NODE_ENV=production

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Set ownership of the working directory
RUN chown -R node:node /usr/src/app

# Switch to the 'node' user
USER node

# Start the application
CMD ["npm", "start"]
