var song = require('../models/song'),
    set = require('../models/set');

var SetDB = function() {
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

        delete: function(set, cb) {
            var error = null;
            cb(error);
        },

        findAll: function() {
            return [];
        },

        findById: function(id) {
            return set.create({_id: id, name: 'name', duration: 229, status: 'learning'});
        },

        _create: function(s, cb) { cb(null); },
        _update: function(s, cb) { cb(null); }
    };
};

module.exports = SetDB;
