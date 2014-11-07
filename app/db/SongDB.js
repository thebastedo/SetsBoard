var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/bandsetlist.db');

var song = require('../models/song');

function SongDB() {

	this.save = function(s, cb) {
		console.log("SongDB - Save - Validating Song");
		s.validate().then(function() {
			if (s.isValid) {
				console.log("Inserting song...");
				db.run(
					'INSERT INTO songs (name, duration, status) VALUES (?, ?, ?)',
					[s.name(), s.duration(), s.state()],
					function(error) { cb(error); console.log("insert complete..."); }
				);
			} else {
				console.log("SongDB - Save - ERROR :: song invalid");
			}
		});
	}
}

module.exports = SongDB
