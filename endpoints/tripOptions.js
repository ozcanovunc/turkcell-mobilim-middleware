const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/tripOptions/', cache(CACHE_DURATION), function(req, res) {
        Promise.all([
                request("GetTripTypes", { companyCode: "05" }),
                request("GetTripPurposes")
            ])
            .then(e => {
                let types = e[0];
                let purposes = e[1];
                types = getEntities(types, "CodeEntity");
                purposes = getEntities(purposes, "CodeEntity");
                res.status(200).json({ types, purposes }).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
