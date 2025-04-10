

# SIT323/SIT737 - Cloud Native Application Development: Kubernetes Deployment


### Required Tools
- **Git**: Version control for code.
  - [Git Installation](https://github.com)
  
- **Visual Studio Code**: Code editor for working with the project.
  - [Download Visual Studio Code](https://code.visualstudio.com/)
  
- **Node.js**: JavaScript runtime for building the application.
  - [Download Node.js](https://nodejs.org/en/download/)
  
- **Docker**: Tool for creating, managing, and running containers.
  - [Download Docker](https://www.docker.com/products/docker-desktop)
  
- **Kubernetes**: Computing platform for hosting and managing microservices.
  - Kubernetes is used to orchestrate containerized applications across a cluster of machines.
  
- **Kubernetes CLI (kubectl)**: Command-line interface to interact with Kubernetes.
  
- **Docker CLI**: Command-line tool for building, tagging, and pushing Docker images to registries.


### Step 1: Setup Kubernetes Cluster
1. **Install Docker Desktop**: Ensure that Docker Desktop is installed on your machine. This comes with an integrated Kubernetes cluster.
   
2. **Enable Kubernetes in Docker Desktop**: Open Docker Desktop, go to **Settings**, and under the **Kubernetes** tab, enable the Kubernetes feature. Click **Apply & Restart**.

3. **Verify Kubernetes Cluster**: Open a terminal and run the following command to verify the cluster:
   ```bash
   kubectl cluster-info
   ```
   You should see information about the Kubernetes cluster, confirming it's running.

---

### Step 2: Create the Docker Image

1. **Write Dockerfile**: In the project folder, create a `Dockerfile` to define the container image. Below is the example Dockerfile to serve the `index.html` file from the project:

   ```Dockerfile
   # Use official Node.js image
   FROM node:14

   # Set the working directory inside the container
   WORKDIR /usr/src/app

   # Copy the package.json and package-lock.json files
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code, including index.html
   COPY . .

   # Expose port 3000 for the app to be accessible
   EXPOSE 3000

   # Start the app
   CMD ["node", "app.js"]
   ```

2. **Build Docker Image**: 
   Run the following command in the terminal to build the Docker image:
   ```bash
   docker build -t node-k8s-app .
   ```

---

### Step 3: Create the Kubernetes Deployment

1. **Create Deployment YAML**: Create a file named `deployment.yaml` with the following content:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: node-k8s-app
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: node-k8s-app
     template:
       metadata:
         labels:
           app: node-k8s-app
       spec:
         containers:
         - name: node-k8s-app
           image: node-k8s-app:latest
           ports:
           - containerPort: 3000
   ```

2. **Apply Deployment**:
   Run the following command to deploy the container to the Kubernetes cluster:
   ```bash
   kubectl apply -f deployment.yaml
   ```

---

### Step 4: Create the Kubernetes Service

1. **Create Service YAML**: Create a file named `service.yaml` with the following content to expose the app via a LoadBalancer:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: node-k8s-app-service
   spec:
     selector:
       app: node-k8s-app
     ports:
       - protocol: TCP
         port: 80
         targetPort: 3000
     type: LoadBalancer
   ```

2. **Apply Service**:
   Run the following command to expose the service:
   ```bash
   kubectl apply -f service.yaml
   ```

3. **Verify Service**:
   Use the following command to check the service status:
   ```bash
   kubectl get services
   ```
   You should see an external IP assigned to the service, allowing you to access the app.

---

### Step 5: Access the Application

Once the service is created and the external IP is assigned, open a web browser and visit the external IP of the service.

- If using **Docker Desktop** (which might show `localhost`), you can visit:
  ```
  http://localhost
  ```

Alternatively, if you need to access via port forwarding, use:
  ```
  http://localhost:8080
  ```

---

### Step 6: Push the Docker Image

1. **Login to Docker Hub**:
   ```bash
   docker login
   ```

2. **Tag the Image**:
   ```bash
   docker tag node-k8s-app your-dockerhub-username/node-k8s-app:latest
   ```

3. **Push the Image**:
   ```bash
   docker push your-dockerhub-username/node-k8s-app:latest
   ```

