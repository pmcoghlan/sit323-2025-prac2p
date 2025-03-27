# Dockerizing a Node.js Web Application

This document provides a step-by-step guide to containerizing a Node.js web application using Docker and Docker Compose. The application is set up to run in a containerized environment and can be deployed easily.

---

## **Prerequisites**
Ensure you have the following installed on your system:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)
- Node.js (for local development, not needed inside the container)

---

## **Step 1: Install Docker**
If you haven't installed Docker yet, download and install it from [here](https://www.docker.com/products/docker-desktop).

Check if Docker is installed by running:
```sh
docker --version
```

---

## **Step 2: Clone the Repository**
Navigate to your desired directory and clone your project:
```sh
git clone <https://github.com/pmcoghlan/sit323-2025-prac2p>
cd Website
```

---

## **Step 3: Create a Dockerfile**
Inside the project root, create a `Dockerfile` with the following content:

```dockerfile
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

# Expose the application's port
EXPOSE 3000

# Command to start the application
CMD ["node", "server.js"]
```

---

## **Step 4: Build the Docker Image**
Run the following command inside the `Website` directory to build the Docker image:
```sh
docker build -t my-node-app .
```
This command creates a Docker image named `my-node-app`.

To verify that the image was built successfully, run:
```sh
docker images
```

---

## **Step 5: Create a Docker Compose File**
Create a `docker-compose.yml` file inside the project directory with the following content:

```yaml
version: '3.8'

services:
  web:
    image: my-node-app
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=production
```

---

## **Step 6: Start the Docker Compose Environment**
Run the following command to start the application in a container:
```sh
docker-compose up -d
```
This will start the container in detached mode (`-d`).

To check if the container is running:
```sh
docker ps
```
To view logs:
```sh
docker-compose logs -f
```

---

## **Step 7: Test the Application**
Open a web browser and go to:
```
http://localhost:3000
```
If the application runs successfully, the setup is complete.

To stop the containers:
```sh
docker-compose down
```

---

## **Step 8: Push the Docker Image to a Registry**
1. Log in to Docker Hub (or another registry like AWS ECR, Azure, etc.):
   ```sh
   docker login
   ```
2. Tag your Docker image:
   ```sh
   docker tag my-node-app your-dockerhub-username/my-node-app:v1
   ```
3. Push the image:
   ```sh
   docker push your-dockerhub-username/my-node-app:v1
   ```
