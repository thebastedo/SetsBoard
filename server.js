// Base app setup
var express = require('express'),
    app = express(),
    morgan = require('morgan');
    bodyParser = require('body-parser');

// Routers
var apiroutes = require('./app/routes/api'),
    controlroutes = require('./app/routes/control'),
    boardroutes = require('./app/routes/board');

// Setup body parser in express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// use morgan logging
app.use(morgan('combined'));

// API Routes
app.use('/api', apiroutes);
// API Docs
console.log('API Docs (' + __dirname + '/app/docs) available at /docs');
app.use('/docs', express.static(__dirname + '/app/docs'));

// Control View Routes
app.use('/control', controlroutes);

// Set Board Routes
app.use('/board', boardroutes);

// Root route, redirect to the board
app.get('/', function(req, res) {
	res.redirect('/board');
});

// Board View Routes

// start it all up
app.listen(port);
console.log("Sets Board REST API Listening on " + port);
