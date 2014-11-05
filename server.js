// Base app setup
var express			= require('express');
var app 				= express();
var bodyParser	= require('body-parser');

// Models
var Song 				= require('./app/models/song');

// Routers
var apiroutes		= require('./app/routes/api');
var controlroutes = require('./app/routes/control');
var boardroutes = require('./app/routes/board');

// Setup body parser in express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// API Routes
app.use('/api', apiroutes);

// Control View Routes
app.use('/control', controlroutes);

// Set Board Routes
app.use('/board', boardroutes);

// Board View Routes

// start it all up
app.listen(port);
console.log("Sets Board REST API Listening on " + port);
