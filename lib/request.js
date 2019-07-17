const { soapToRest, restToSoap } = require("./translator");
const soapRequest = require('easy-soap-request');
const { BASE_URL_TRIP, BASE_URL_AWARD, GENERIC_ERROR_CODE } = require("./constants");

function request(baseUrl, endpoint, requestBody = {}) {
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': `http://tempuri.org/${baseUrl === BASE_URL_TRIP ? "ISeyahatPlus" : "IGiftService"}/${endpoint}`
    };

    return new Promise((resolve, reject) => {
        soapRequest(baseUrl, headers, restToSoap({ endpoint, body: requestBody }))
            .then(({ response }) => {
                let { body } = soapToRest(response.body);
                let { statusCode } = response;
                if (body.ErrorMessage || body.HasError)
                    statusCode = GENERIC_ERROR_CODE;
                statusCode === 200 ? resolve(body) : reject(body);
            })
            .catch(reject);
    });
}

function tripRequest(endpoint, body) {
    return request(BASE_URL_TRIP, endpoint, body);
}

function awardRequest(endpoint, body) {
    return request(BASE_URL_AWARD, endpoint, body);
}

module.exports = exports = tripRequest;

exports.awardRequest = awardRequest;
