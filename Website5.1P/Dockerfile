# Use Node.js as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port (ensure your app runs on this port)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
