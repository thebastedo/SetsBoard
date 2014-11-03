var model = require('nodejs-model')

var Song = model("Song")
	.attr('name', {
		validations: {
			presence: {
				message: 'Song name is required.'
			},
			length: {
				minimum: 3,
				maximum: 48,
				message: {
					tooShort: 'Song name must be longer than 3 characters',
					tooLong: 'Song name must be shorter than 48 characters'
				}
			}
		}
	})
	.attr('duration')
	.attr('state');

Song.bave = function() {
	console.log("Saving Song! " + this.name() + ", " + this.duration() + ", " + this.state() + ".");
	return true
}

module.exports = Song
