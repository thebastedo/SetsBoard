var response = function(payload)  {
    var r = { status: null };

    // allowed param types, for now we weill ignore all else
    var types = ['string','boolean','number'];

    if (typeof payload === 'object') {
        for (var key in payload) {
            // handle 3 basic types, set in types
            if (types.indexOf(typeof r[key]) > -1 && r[key] !== null && r[key] !== '') { 
                r[key] = payload[key];
            }
        }
    }
    return r;
};

module.exports = response;
