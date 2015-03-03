var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/bandsetlist.db');

var song = require('../models/song');

var SongDB = function() {
    return {
        save: function(s, cb) {
            s.validate().then(function() {
                if (s.isValid) {
                    if (s._id !== null) {
                        this._update(s, cb);
                    } else {
                        this._create(s, cb);
                    }
                } else {
                    cb(s.errors);
                }
            });
        },

        delete: function(id, cb) {
            var error = null;
            cb(error);
        },

        findAll: function(cb) {
            return [];
        },

        findById: function(id, cb) {
            return song.create({_id: id, name: 'name', duration: 229, status: 'learning'});
        },

        _create: function(s, cb) { 
            db.run(
                'INSERT INTO songs (id, name, duration, status) VALUES (NULL, ?, ?, ?)',
                [s.name(), s.duration(), s.state()],
                function(error) { cb(error); }
            );
        },
        _update: function(s, cb) { cb(null); },

    };
};

module.exports = SongDB;
