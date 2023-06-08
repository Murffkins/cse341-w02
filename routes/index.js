// List all of the routes

const routes = require('express').Router();

// Import the functions from the Controller
const myController = require('../controllers/index.js');


// Calling the function:
routes.get('/', myController.imLearningFunction);


// exports the routes
module.exports = routes;


// GET request for routes. 
// '/' is reference to home page url. 
// This is an anonymous function
// res.json() outputs a json response on the homepage
        // routes.get('/', (req, res, next) => {
        //     res.json('No entiendo');
        // })