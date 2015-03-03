var response = require('./response');

var error = function(message) {
    var r = new response({'message': message});
    r.status = 'error';
    return r;
};

module.exports = error;
