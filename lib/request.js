const { soapToRest, restToSoap } = require("./translator");
const soapRequest = require('easy-soap-request');
const { BASE_URL_SEYAHAT, GENERIC_ERROR_CODE } = require("./constants");

function getSoapAction(endpoint) {
    return `http://tempuri.org/ISeyahatPlus/${endpoint}`;
}

function request(endpoint, body = {}) {
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': getSoapAction(endpoint)
    };

    return new Promise((resolve, reject) => {
        soapRequest(BASE_URL_SEYAHAT, headers, restToSoap({ endpoint, body }))
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

module.exports = request;
