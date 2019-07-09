const parser = require("fast-xml-parser");
const j2xParser = parser.j2xParser;

function soapToRest(soapResponse) {
    var response = parser.parse(soapResponse);
    var headers = response["s:Envelope"]["s:Header"];
    var body = response["s:Envelope"]["s:Body"];
    var firstLevelKey = Object.keys(body)[0];
    var secondLevelKey = Object.keys(body[firstLevelKey])[0];
    body = modifyBodyForRest(body[firstLevelKey][secondLevelKey]);
    return { headers, body };
}

function restToSoap(restRequest) {
    var { endpoint, body } = restRequest;
    var parser = new j2xParser();
    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
        <tem:${endpoint}>
            ${parser.parse(modifyBodyForSoap(body))}
        </tem:${endpoint}>
        </soapenv:Body>
        </soapenv:Envelope>`;
}

function modifyBodyForRest(obj) {
    var newObj = {};
    var keys = Object.keys(obj);
    keys.forEach(key => {
        let splittedKey = key.split(":");
        if (splittedKey[0] === "a") {
            newObj[splittedKey[1]] = typeof obj[key] === "object" ? modifyBodyForRest(obj[key]) : obj[key];
        }
        else {
            newObj[key] = typeof obj[key] === "object" ? modifyBodyForRest(obj[key]) : obj[key];
        }
    });
    return newObj;
}

function modifyBodyForSoap(obj) {
    var newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[`tem:${key}`] = obj[key];
    });
    return newObj;
}

module.exports = { soapToRest, restToSoap };
