var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/bandsetlist.db');

var song = require('../models/Song');

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
            db.run(
                'DELETE FROM setlist WHERE(id=?)',
                [id],
                function(error, rows) { cb(error, rows); }
            );
        },

        findAll: function(cb) {
            db.run(
                'SELECT * FROM songs',
                function(error, rows) { cb(error, rows); }
            );
        },

        findById: function(id, cb) {
            db.run(
                'SELECT * FROM songs WHERE(songid=?)'
                [id],
                function(error, rows) { cb(error, rows); }
            );
        },

        _create: function(s, cb) { 
            db.run(
                'INSERT INTO songs (id, name, duration, status) VALUES (NULL, ?, ?, ?)',
                [s.name(), s.duration(), s.state()],
                function(error, rows) { cb(error, rows); }
            );
        },
        _update: function(s, cb) { 
            db.run(
                'UPDATE songs SET name=?, duration=?, status=? where id=?',
                [s.name(), s.duration(), s.state(), s.id()],
                function(error, rows) { cb(error, rows); }
            );   
        }

    };
};


module.exports = SongDB;
