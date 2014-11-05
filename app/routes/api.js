var express			= require('express');
var app 				= express();

var Song 				= require('../models/song');

// routes and such
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
	res.json({ message: "sets board rest api."});
});

// song routes
apiRouter.route('/song')
	.post(function(req, res) {
		song = Song.create(req.body);
		console.log("/song - POST -- " + song.name() + " - " + song.duration() + " - " + song.validate());
		song.validate().then(function() {
			if (song.isValid) {
				console.log("Saving new song....");
				res.json({ message: 'Song Created', song: song.toJSON() });
			} else {
				res.json({ message: 'Song Create Failed', errors: song.errors });
			}
		});
	})
	.get(function(req, res) {
		console.log("/song - GET -- get all songs");
		res.json({ message: 'Getting all songs...' });
	});

apiRouter.route('/song/:song_id')
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
apiRouter.route('/set')
	.post(function(req, res) {
		console.log("/set - POST -- " + req.body.name);
		res.json({ message: 'Set Created' });
	})
	.get(function(req, res) {
		console.log('/set - GET -- get all set lists');
		res.json({ message: 'Getting all sets...' });
	});

apiRouter.route('/set/:set_id')
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

module.exports = apiRouter
