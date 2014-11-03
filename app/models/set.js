var model = require('nodejs-model')

var Set = model('Set')
	.attr('name', {
		validations: {
			presence: true,
			length: [3, 48]
		}
	})
	.attr('songs', {
		validations: {
			length: [3, 48]
		}
	});
