# Simple Calculator Microservice

## Overview
This microservice is a lightweight **Node.js** and **Express.js** application that provides basic calculator functionality. It allows users to perform:
- Addition
- Subtraction
- Multiplication
- Division

The microservice is designed to handle errors gracefully and return meaningful responses.

---

## Prerequisites
Make sure you have the following installed on your system:
- **Node.js** ([Download here](https://nodejs.org/en/download/))
- **Git** ([Download here](https://git-scm.com/))
- **Visual Studio Code (VS Code)** ([Download here](https://code.visualstudio.com/))

---

## Installation and Setup
### Step 1: Clone the Repository
If you are using Git, you can clone the repository:
```sh
 git clone <https://github.com/pmcoghlan/sit323-2025-prac2p>
 cd calculator-microservice
```

Or, manually create a project folder:
```sh
mkdir calculator-microservice
cd calculator-microservice
```

### Step 2: Initialize a Node.js Project
Run the following command to create a `package.json` file:
```sh
npm init -y
```

### Step 3: Install Dependencies
Install the **Express.js** framework:
```sh
npm install express
```

---

## Running the Microservice
### Step 4: Create and Configure the Server
Create a file named `index.js` and add the provided code from the repo.

To start the microservice, run:
```sh
node index.js
```

The server should now be running on:
```
http://localhost:3000
```

---

## API Endpoints
This microservice provides the following endpoints:

### **Addition**
- **Endpoint:** `/add`
- **Example Request:**
  ```
  GET http://localhost:3000/add?num1=5&num2=3
  ```
- **Response:**
  ```json
  { "result": 8 }
  ```

### **Subtraction**
- **Endpoint:** `/subtract`
- **Example Request:**
  ```
  GET http://localhost:3000/subtract?num1=10&num2=4
  ```
- **Response:**
  ```json
  { "result": 6 }
  ```

### **Multiplication**
- **Endpoint:** `/multiply`
- **Example Request:**
  ```
  GET http://localhost:3000/multiply?num1=3&num2=7
  ```
- **Response:**
  ```json
  { "result": 21 }
  ```

### **Division**
- **Endpoint:** `/divide`
- **Example Request:**
  ```
  GET http://localhost:3000/divide?num1=8&num2=2
  ```
- **Response:**
  ```json
  { "result": 4 }
  ```
- **Error Handling:** If division by zero is attempted, the response will be:
  ```json
  { "error": "Cannot divide by zero." }
  ```

### **Invalid Input Handling**
If a user provides invalid input (e.g., non-numeric values), they will receive:
```json
{ "error": "Invalid input. Please provide two valid numbers." }
```

### **Handling Undefined Routes**
If a user accesses an unknown endpoint, they will receive:
```json
{ "error": "Route not found" }
```
For any issues contact me at pmcoghlan@deakin.edu.au !

