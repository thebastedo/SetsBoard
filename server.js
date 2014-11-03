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

// song routes
router.route('/song')
	.post(function(req, res) {
		console.log("/song - POST -- " + req.body.name + " - " + req.body.duration);
		res.json({ message: 'Song Created' });
	})
	.get(function(req, res) {
		console.log("/song - GET -- get all songs");
		res.json({ message: 'Getting all songs...' });
	});

router.route('/song/:song_id')
	.get(function(req, res) {
		console.log("/song/" + req.params.song_id + " - GET -- get song by id");
		res.json({ message: 'Song...'});
	})
	.put(function(req, res) {
		console.log("/song/" + req.params.song_id + " - PUT -- update song");
		res.json({ message: 'Song Updated' });
	})
	.delete(function(req, res) {
		console.log("/song/" + req.params.song_id + " - DELETE -- delete song");
		res.json({ message: 'Song Deleted' });
	});

// set routes
router.route('/set')
	.post(function(req, res) {
		console.log("/set - POST -- " + req.body.name);
		res.json({ message: 'Set Created' });
	})
	.get(function(req, res) {
		console.log('/set - GET -- get all set lists');
		res.json({ message: 'Getting all sets...' });
	});

router.route('/set/:set_id')
	.get(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- GET - get set id: '+ req.params.set_id);
		res.json({ message: 'get set', id: req.params.set_id });
	})
	.put(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- PUT - update set id: ' + req.params.set_id);
		res.json({ message: 'updated set', id: req.params.set_id });
	})
	.delete(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- DELETE - delete set id: ' + req.params.set_id);
		res.json({ message: 'delete set', id: req.params.set_id });
	});

app.use('/api', router);

// start it all up
app.listen(port);
console.log("Sets Board REST API Listening on " + port);
