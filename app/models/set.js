var model = require('nodejs-model');

var Set = model('Set')
    .attr('_id')
	.attr('name', {
		validations: {
			presence: true,
			length: [3, 48]
		}
	})
	.attr('songs');
