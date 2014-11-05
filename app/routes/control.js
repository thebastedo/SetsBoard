var express			= require('express');
var app 				= express();

// routes and such
var controlRouter = express.Router();

controlRouter.get('/', function(req, res) {
	res.send("Sets Board Control View!");
});

module.exports = controlRouter;
