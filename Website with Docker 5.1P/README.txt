Here's the updated `README.md` for your Node.js website project using Docker:

```markdown
# Website with Docker

This project demonstrates how to containerize a simple Node.js website using Docker. 

Before you begin, ensure that you have the following installed:

- [Docker](https://www.docker.com/get-started) (Docker Engine and Docker Compose)
- [Node.js](https://nodejs.org/) and `npm`

### 1. Clone the Repository

Clone the repository containing your Node.js website 
```bash
git clone <https://github.com/pmcoghlan/sit323-2025-prac2p>
cd Website with Docker 5.1P
```

### 2. Create the Dockerfile

In the root of your project directory, create a `Dockerfile` (with no extension) containing the following content:

```Dockerfile
# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
```

### Explanation:
- **FROM node:14**: Uses the official Node.js version 14 image as the base image for the container.
- **WORKDIR**: Sets the working directory inside the container to `/usr/src/app`.
- **COPY**: Copies the `package.json` and `package-lock.json` to the container, installs the dependencies, and then copies the rest of the application code.
- **EXPOSE 3000**: Exposes port 3000, which is the port the app listens to.
- **CMD**: Starts the application using `npm start`.

### 3. Create the Docker Compose File

Create a `docker-compose.yml` file in the root of your project directory:

```yaml
version: '3'
services:
  website:
    build: .
    ports:
      - "3000:3000" # Map port 3000 of the container to port 3000 on your machine
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Explanation:
- **version**: Defines the Docker Compose file version.
- **services**: Defines the application services. In this case, it’s `website`.
- **build**: Indicates that Docker Compose should build the Docker image from the current directory.
- **ports**: Maps the container's port 3000 to port 3000 on your local machine so you can access the application.
- **networks**: Configures a custom bridge network for communication between containers (default behavior in Docker Compose).

### 4. Build the Docker Image

Run the following command to build the Docker image for the website:

```bash
docker build -t website .
```

### 5. Start the Docker Compose Environment

Now, you can start your environment by running:

```bash
docker-compose up --build
```

This command will:
- Build the image (if not already built).
- Start the container running your website.

### 6. Testing the Application

Once the container is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see your Node.js website responding.

### Conclusion

In this exercise, we containerized using Docker and Docker Compose. We built the Docker image and started the service with Docker Compose. By containerizing the application, we ensured that it can be run in a consistent environment across different machines.

If you encounter any issues or need further assistance, feel free to contact me at pmcoghlan@deakin.edu.au