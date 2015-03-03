var response = require('./response');

var success = function(payload) {
    var r = new response(payload);
    r.status = 'success';
    return r;
};

module.exports = success;
