var response = function(payload)  {
    var r = { status: null };

    // allowed param types, for now we weill ignore all else
    var types = ['string','boolean','number'];

    if (typeof payload === 'object') {
        for (var key in payload) {
            // handle 3 basic types, set in types
            if ((types.indexOf(typeof payload[key]) > -1 && payload[key] !== '') ||
                (payload[key] !== null && Object.prototype.toString.call(payload[key]) === '[object Array]')) { 
                r[key] = payload[key];
            }
        }
    }
    return r;
};

module.exports = response;
