# Use the official Node.js image from the Docker Hub
FROM node:lts-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set ownership of the working directory
RUN npm run dev


# Start the application
CMD ["npm", "start"]
