var express = require('express'),
    app = express();

var Song = require('../models/song'),
    sngdb = require('../db/SongDB'),
    success = require('../responses/success');

var songdb = new sngdb();

var setdb = {};

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
     *              "duration": 229,
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
        // TODO: get all the songs ...
        if (true) {
            var r = new success({total: 0, sings: []});
            res.status(200).json(JSON.stringify(r));
        } else {
            var e = new error('No songs found');
            res.status(404).json(JSON.stringify(e));
        }
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
		song.validate().then(function() {
			if (song.isValid) {
				songdb.save(song, function(error) { 
					if (error !== null) {
                        res.status(500).json(new error('Create song failed'));
					} else {
                        res.status(200).json(new success({ song: song.toJSON() }));
                    }
				});
			} else {
				res.status(500).json(new error(song.errors));
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
        // TODO: load song
        var song = Song.create({'name':'name','duration':229,'status':'learning'});
        if (true) {
            res.status(200).json(new success({song: song.toJSON()}));
        } else {
            res.status(404).json(new error('Song not found'));
        }
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
     * @apiError (500) CreateFailed The song could not be created
     *  
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "error": "Create Song Failed"
     *  }
     *
     */
	.put(function(req, res) {
        // TODO: figure out update flow
		song = Song.create(req.body);
		song.validate().then(function() {
			if (song.isValid) {
				songdb.update(song, function(error) { 
					if (error !== null) {
                        res.status(500).json(new error('Song update failed'));
					} else {
                        res.status(200).json(new success({ song: song.toJSON() }));
                    }
				});
			} else {
				res.status(500).json(new error(song.errors));
			}
		});
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
        // TODO: figure out delete flow
        songdb.delete(req.params.song_id, function(error) {
            if (error !== null) {
                res.status(404).json(new error('Song not found'));
            } else {
                res.status(200).json(new success({song: { _id: req.params.song_id } }));
            }
        });
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
        // TODO: get the set lists
        if (true) {
            res.status(200).json(new success({total: 0, sets: []}));
        } else {
            res.status(404).json(new error('No sets found'));
        }
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
        var set = Set.create(req.body);
		set.validate().then(function() {
			if (set.isValid) {
                setdb.save(set, function(error) {
                    if (error !== null) {
                        res.status(500).json(new error('set create failed'));
                    } else {
                        res.status(200).json(new success({set: set.toJSON()}));
                    }
                });
            } else {
                res.status(500).json(new error('set create failed'));
            }
        });
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
        // TODO 

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
 * @apiSuccess {String} song.duration Song duration in seconds
 * @apiSuccess {String} song.status Song status (ready/learning)
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": "success",
 *      "song": {
 *          "name": "Down With the Night",
 *          "duration":" 229,
 *          "state": "learning"
 *      }
 *  }
 *
 */

/**
 * @apiDefine SongBody
 *
 * @apiParam {String{3..5}} name Name of the song
 * @apiParam {String} duration Duration of the song in seconds 
 * @apiParam {String} state  State of the song, ready/learning
 *
 * @apiParamExample {json} Post Body Eample:
 *  {
 *      "name": "Down With the Night",
 *      "duration": 229,
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
