// List all of the routes

const routes = require('express').Router();



// GET /feed/posts
// Calling the function: 
routes.use('/contacts', require('./contacts'));
// localhost:8080/professional/


// exports the routes
module.exports = routes;


// GET request for routes. 
// '/' is reference to home page url. 
// This is an anonymous function
// res.json() outputs a json response on the homepage
        // routes.get('/', (req, res, next) => {
        //     res.json('No entiendo');
        // })

