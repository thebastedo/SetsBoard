var model = require('nodejs-model');

var SetList = model('Set')
    .attr('id')
	.attr('name', {
		validations: {
			presence: true,
			length: [3, 48]
		}
	})
	.attr('songs');

module.exports = SetList;
