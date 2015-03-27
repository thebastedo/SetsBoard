var Response = require('../../app/responses/response'),
    Success = require('../../app/responses/success'),
    ErrorResponse = require('../../app/responses/error'),
    assert = require('assert');

var arr = [1,2,3];

describe('Response', function() {

    describe('No payload', function() {
        var r = new Response();

        it('Should have a status of null',function() {
            assert.equal(null, r.status);
        });
    });

    describe('Payload can support arrays, strings, numbers and booleans', function() {
        var r = new Response({
            s: 'string',
            n: 1,
            nZero: 0,
            nNegative: -1,
            b: true,
            z: null,
            a: arr,
            o: { a: 1, b: 2, c:3 }
        });

        it('response.payload.s should be "string"', function() {
            assert.equal('string', r.s);
        });

        it('response.payload.n should be 1', function() {
            assert.equal(1, r.n);
        });

        it('response.payload.nZero should be 0', function() {
            assert.equal(0, r.nZero);
        });

        it('resonse.payload.nNegative should be -1', function() {
            assert.equal(-1, r.nNegative);
        });

        it('response.payload.b should be true', function() {
            assert.equal(true, r.b);
        });

        it('response.payload.a should be an array', function() {
            assert.equal(arr, r.a);
        });

        it('response.payload.z, a and o should be undefined', function() {
            assert.equal(undefined, r.z);
            assert.equal(undefined, r.o);
        });
    });
});

describe('Success', function() {
    describe('No Payload', function() {
        var s = new Success();
        
        it('Should have a status of "success"', function() {
            assert.equal('success', s.status);
        });
    });

    describe('With payload', function() {
        var successObj = {
            s: 'string',
            n: 1,
            b: true,
            a: arr
        };

        var s = new Success(successObj);

        it('Should have a status of "success"', function() {
            assert.equal('success',s.status);
        });

        it('Should have the proper data', function() {
            assert.equal('string', s.s);
            assert.equal(1, s.n);
            assert.equal(true, s.b);
            assert.equal(arr, s.a);
        });
    });
});

describe('Error', function() {
    describe('No Message', function() {
        var e = new ErrorResponse();

        it('Should have a status of "error"', function() {
            assert.equal('error', e.status);
        });
    });

    describe('With message', function() {
        var e = new ErrorResponse('message');

        it('Should have a status of "error"', function() {
            assert.equal('error', e.status);
        });

        it('Should have a message of "message"', function() {
            assert.equal('message', e.message);
        });
    });
});
