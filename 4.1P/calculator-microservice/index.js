/**
 * Simple Calculator Microservice
 * 
 * This is a lightweight Express.js app that acts as a basic calculator. It supports addition, 
 * subtraction, multiplication, and division through simple HTTP GET requests. Just pass in two numbers 
 * as query parameters, and you'll get the result in JSON format.
 *
 * Features:
 * - Checks if the input values are valid numbers
 * - Handles errors, including division by zero
 * - Uses middleware to keep the code clean and reusable
 * - Returns a 404 error for any undefined routes
 */

const express = require('express');
const app = express();
const port = 3000;

/**
 * Middleware to validate input numbers.
 * This extracts 'num1' and 'num2' from the query parameters, converts them to numbers,
 * and ensures they're valid before passing them along.
 */
function validateNumbers(req, res, next) {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid input. Please provide two valid numbers.' });
    }

    req.num1 = num1;
    req.num2 = num2;
    next(); // Move to the next middleware or route handler
}

/**
 * Addition Route
 * Example: GET /add?num1=5&num2=3 -> { "result": 8 }
 */
app.get('/add', validateNumbers, (req, res) => {
    res.json({ result: req.num1 + req.num2 });
});

/**
 * Subtraction Route
 * Example: GET /subtract?num1=10&num2=4 -> { "result": 6 }
 */
app.get('/subtract', validateNumbers, (req, res) => {
    res.json({ result: req.num1 - req.num2 });
});

/**
 * Multiplication Route
 * Example: GET /multiply?num1=3&num2=7 -> { "result": 21 }
 */
app.get('/multiply', validateNumbers, (req, res) => {
    res.json({ result: req.num1 * req.num2 });
});

/**
 * Division Route
 * Example: GET /divide?num1=8&num2=2 -> { "result": 4 }
 * - Returns an error if division by zero is attempted.
 */
app.get('/divide', validateNumbers, (req, res) => {
    if (req.num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
    }
    res.json({ result: req.num1 / req.num2 });
});

/**
 * Handles undefined routes and returns a 404 error.
 */
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

/**
 * Starts the server and listens on the specified port.
 */
app.listen(port, () => {
    console.log(`Calculator microservice is running at http://localhost:${port}`);
});
