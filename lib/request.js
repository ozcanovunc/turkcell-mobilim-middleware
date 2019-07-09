const { soapToRest, restToSoap } = require("./translator");
const soapRequest = require('easy-soap-request');
const { baseUrl } = require("./constants");

function getSoapAction(endpoint) {
    return `http://tempuri.org/ISeyahatPlus/${endpoint}`;
}

function request(endpoint, body) {
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': getSoapAction(endpoint)
    };

    return new Promise((resolve, reject) => {
        soapRequest(baseUrl, headers, restToSoap({ endpoint, body }))
            .then(({ response }) => {
                const { body } = soapToRest(response.body);
                const { statusCode } = response;
                const result = { statusCode, body };
                statusCode === 200 ? resolve(result) : reject(result);
            })
            .catch(reject);
    });
}

module.exports = request;
