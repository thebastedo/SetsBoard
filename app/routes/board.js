var express			= require('express');
var app 				= express();

// routes and such
var boardRouter = express.Router();

boardRouter.get('/', function(req, res) {
	res.send("Sets Board View!");
});

module.exports = boardRouter;
