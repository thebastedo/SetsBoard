// Base app setup
var express			= require('express');
var app 				= express();
var bodyParser	= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// routes and such
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: "sets board rest api."});
});

app.use('/api', router);

// start it all up
app.listen(port);
console.log("Sets Board REST API Listening on " + port);
