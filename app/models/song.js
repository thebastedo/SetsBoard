var model = require('nodejs-model');

var Song = model("Song")
    .attr('_id')
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
	.attr('duration', {
        validations: {
            format: {
                with: /^\d*$/, 
                allowBlank: true, 
                message: 'only digits are allowed, or empty string.'
            }
        }
    })
	.attr('state');

module.exports = Song;
