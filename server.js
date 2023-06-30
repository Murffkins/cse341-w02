// Node server
// nodemon watches for changes

const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient; Do I need this? Erase
const mongodb = require('./db/connect');
// const indexRoutes = require('./routes'); Do I need this? Erase

const port = process.env.PORT || 8080
const app = express();

// Use the routes
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}));
// app.use('/index', indexRoutes); Do I need this? Erase
   // localhost:3000/index

app.use('/', require('./routes'));
// localhost:8080/

// Added Errorhandling for L06 -- logs to a file so you can see what the errors (if any) are
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on port ${port}`)
    }
}); 