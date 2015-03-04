var Song = require('../models/Song'),
    SetList = require('../models/SetList');

var SetListDB = function() {
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

        delete: function(s, cb) {
            db.run(
                'DELETE FROM setlist WHERE(id=?)',
                [s.id()],
                function(error, rows) { cb(error, rows); }
            );
        },

        findAll: function(cb) {
            db.run(
                'SELECT * FROM setlist',
                function(error, rows) { cb(error, rows); }
            );
        },

        findById: function(id, cb) {
            db.run(
                'SELECT * FROM setlist WHERE(id=?)',
                [id],
                function(error, rows) { cb(error, rows); }
            );
        },

        _create: function(s, cb) { 
            db.run(
                'INSERT INTO setlist (?, ?, ?) VALUES (NULL, ?, NULL, NULL)',
                [s.id(), s.name(), s.songid],
                function(error, rows) { cb(error, rows); }
            );
        },
        _update: function(s, cb) {
            db.run(
                'UPDATE setlist SET name=?',
                [s.name()],
                function(error, rows) { cb(error, rows); }
            );
        }
    };
};

module.exports = SetListDB;
