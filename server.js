// Node server
// nodemon watches for changes

var express = require('express');
var app = express();
const port = process.env.PORT || 8080

// Use the routes
app.use('/', require('./routes/index.js'))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})