'use strict';

exports.success = function(body) {
    return buildResponse(200, body);
}

exports.failure = function(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "X-Requested-With": '*',
            "Access-Control-Allow-Headers": '*',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": '*',
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}


