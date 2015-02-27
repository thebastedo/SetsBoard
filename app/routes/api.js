var express			= require('express');
var app 				= express();

var Song 				= require('../models/song');
var sngdb			= require('../db/SongDB');

var songdb = new sngdb();

// routes and such
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
	res.redirect('/docs');
});

apiRouter.route('/songs')
    /**
     * @api {get} /songs Get Songs
     * @apiName GetSongs
     * @apiGroup Song
     * @apiDescription Get a list of all the songs
     * @apiVersion 0.1.0
     *
     * @apiSuccess (200) {String} status Success status
     * @apiSuccess (200) {Number} total Total Number of songs
     * @apiSuccess (200) {Array} songs An array of song objects for the songs
     *
     * @apiSuccessExample {json} Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "status": "success",
     *      "total": 1
     *      "songs": [
     *          {
     *              "name": "Down With the Night",
     *              "duration": "3:29",
     *              "state": "learning"
     *          }
     *      ]
     *  }
     *
     * @apiError (404) SongsNotFound No songs were found
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 404 
     *  {
     *      "error": "No songs found"
     *  }
     *
     */
	.get(function(req, res) {
		console.log("/song - GET -- get all songs");
		res.json({ message: 'Getting all songs...' });
	});


// song routes
apiRouter.route('/song')
    /**
     * @api {post} /song Create Song
     * @apiName CreateSong
     * @apiGroup Song
     * @apiDescription Create a new song for use in set lists
     * @apiVersion 0.1.0
     *
     * @apiUse SongBody
     *
     * @apiUse SongSuccess
     *
     * @apiError (500) CreateFailed The song could not be created
     *  
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Create Song Failed"
     *  }
     *
     */
	.post(function(req, res) {
		song = Song.create(req.body);
		console.log("/song - POST -- " + song.name() + " - " + song.duration() + " - " + song.validate());
		song.validate().then(function() {
			if (song.isValid) {
				console.log("Saving new song....");
				songdb.save(song, function(error) { 
					if (error !== null) {
						console.log("Error: " + error);
					}
					res.json({ message: 'Song Created', song: song.toJSON() });
				});
			} else {
				res.json({ message: 'Song Create Failed', errors: song.errors });
			}
		});
	});

apiRouter.route('/song/:song_id')
    /**
     * @api {get} /song/:id Get song
     * @apiName GetSong
     * @apiGroup Song
     * @apiDescription Get a song by id
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The song's unique ID
     *
     * @apiUse SongSuccess
     *
     * @apiUse SongNotFound
     *
     */
	.get(function(req, res) {
		console.log("/song/" + req.params.song_id + " - GET -- get song by id");
		res.json({ message: 'Song...'});
	})

    /**
     * @api {put} /song/:id Update Song
     * @apiName UpdateSong
     * @apiGroup Song
     * @apiDescription Updates the song with the provided data
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The song's unique ID
     *
     * @apiUse SongBody
     *
     * @apiUse SongSuccess
     *
     * @apiUse SongNotFound
     *
     */
	.put(function(req, res) {
		console.log("/song/" + req.params.song_id + " - PUT -- update song");
		res.json({ message: 'Song Updated' });
	})

    /**
     * @api {delete} /song/:id Delete Song
     * @apiName DeleteSong
     * @apiGroup Song
     * @apiDescription Delete a song by ID
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The song's unique ID
     *
     * @apiUse SongSuccess
     *
     * @apiUse SongNotFound
     *
     */
	.delete(function(req, res) {
		console.log("/song/" + req.params.song_id + " - DELETE -- delete song");
		res.json({ message: 'Song Deleted' });
	});

// set routes
apiRouter.route('/sets')
    /**
     * @api {get} /sets Get Sets
     * @apiName GetSets
     * @apiGroup Sets
     * @apiDescription Get a list of all of the sets
     * @apiVersion 0.1.0
     *
     * @apiUse SetSuccess
     *
     * @apiError (404) {String} error No sets found
     * 
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 404 Not Found
     *  {
     *      "error": "No sets found"
     *  }
     *
     */
	.get(function(req, res) {
		console.log('/set - GET -- get all set lists');
		res.json({ message: 'Getting all sets...' });
	});

apiRouter.route('/set')
    /**
     * @api {post} /set Create Set
     * @apiName CreateSet
     * @apiGroup Sets
     * @apiDescription Create a new set
     * @apiVersion 0.1.0
     *
     * @apiUse SetBody
     *
     * @apiUse SetSuccess
     *
     * @apiError (500) {String} error Create set failed
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Failed to create set"
     *  }
     *
     */
	.post(function(req, res) {
		console.log("/set - POST -- " + req.body.name);
		res.json({ message: 'Set Created' });
	});

apiRouter.route('/set/:set_id')
    /**
     * @api {get} /set/:id Get Set
     * @apiName GetSet
     * @apiGroup Sets
     * @apiDescription Get a set by ID
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The id of the set to get
     *
     * @apiUse SetSuccess
     *
     * @apiUse SetNotFound
     *
     */
	.get(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- GET - get set id: '+ req.params.set_id);
		res.json({ message: 'get set', id: req.params.set_id });
	})
    /**
     * @api {put} /set/:id Update Set
     * @apiName UpdateSet
     * @apiGroup Sets
     * @apiDescription Update the set with the provided data
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The id of the set to get
     *
     * @apiUse SetBody
     *
     * @apiUse SetSuccess
     *
     * @apiUse SetNotFound
     *
     */
	.put(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- PUT - update set id: ' + req.params.set_id);
		res.json({ message: 'updated set', id: req.params.set_id });
	})
    /**
     * @api {delete} /set/:id Delete Set
     * @apiName DeleteSet
     * @apiGroup Sets
     * @apiDescription Delete a set by ID
     * @apiVersion 0.1.0
     *
     * @apiParam {Number} id The id of the set to get
     *
     * @apiUse SetSuccess
     *
     * @apiUse SetNotFound
     *
     */
	.delete(function(req, res) {
		console.log('/set/' + req.params.set_id + ' -- DELETE - delete set id: ' + req.params.set_id);
		res.json({ message: 'delete set', id: req.params.set_id });
	});

module.exports = apiRouter;

/**
 * @apiDefine SongSuccess
 *
 * @apiSuccess {String} status Success Status
 * @apiSuccess {Object} song Song object
 * @apiSuccess {String} song.name Song name
 * @apiSuccess {String} song.duration Song duration
 * @apiSuccess {String} song.status Song status (ready/learning)
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": "success",
 *      "song": {
 *          "name": "Down With the Night",
 *          "duration":" "3:29",
 *          "state": "learning"
 *      }
 *  }
 *
 */

/**
 * @apiDefine SongBody
 *
 * @apiParam {String{3..5}} name Name of the song
 * @apiParam {String} duration Duration of the song (0:00)
 * @apiParam {String} state  State of the song, ready/learning
 *
 * @apiParamExample {json} Post Body Eample:
 *  {
 *      "name": "Down With the Night",
 *      "duration": "3:29",
 *      "state": "learning"
 *  }
 *
 */

/**
 * @apiDefine SongNotFound
 *
 * @apiError (404) SongNotFound The Song was not found
 *
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "error": "Song not found"
 *  }
 *
 */

/**
 * @apiDefine SetSuccess
 *
 * @apiSuccess {String} status Success Status
 * @apiSuccess {Object} set Set object
 * @apiSuccess {String} set.name Name of the set
 * @apiSuccess {Array} set.songs Array of songs
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": "success",
 *      "set": {
 *          "name": "Caravan 2/29/2016"
 *          "songs": [
 *              123,
 *              124,
 *              125
 *          ]
 *      }
 *  }
 *
 */

/**
 * @apiDefine SetNotFound
 *
 * @apiError (404) SetNotFound The set was not found
 *
 * @apiErrorExample {json} Error-Request:
 *  HTTP/1.1 404 NOT FOUND
 *  {
 *      "error": "Set not found"
 *  }
 *
 */

/**
 * @apiDefine SetBody
 *
 * @apiParam {String{3..5}} name Name of the set 
 * @apiParam {Array} songs List of song IDs
 *
 * @apiParamExample {json} Post Body Eample:
 *  {
 *      "name": "Down With the Night",
 *      "songs": [
 *          1234,
 *          1235,
 *          1236
 *      ]
 *  }
 *
 */
