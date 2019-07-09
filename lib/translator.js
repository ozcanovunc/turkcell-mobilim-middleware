const parser = require("fast-xml-parser");

function soapToRest(soapResponse) {
    let response = parser.parse(soapResponse);
    let headers = response["s:Envelope"]["s:Header"];
    let body = response["s:Envelope"]["s:Body"];
    let firstLevelKey = Object.keys(body)[0];
    let secondLevelKey = Object.keys(body[firstLevelKey])[0];
    body = modifyBody(body[firstLevelKey][secondLevelKey]);
    return { headers, body };
}

function restToSoap(restRequest) {

}

function modifyBody(obj) {
    var newObj = {};
    var keys = Object.keys(obj);
    keys.forEach(key => {
        let splittedKey = key.split(":");
        if (splittedKey[0] === "a") {
            newObj[splittedKey[1]] = typeof obj[key] === "object" ? modifyBody(obj[key]) : obj[key];
        }
        else {
            newObj[key] = typeof obj[key] === "object" ? modifyBody(obj[key]) : obj[key];
        }
    });
    return newObj;
}

module.exports = { soapToRest, restToSoap };
