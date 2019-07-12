const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/hotel/:cityId', cache(CACHE_DURATION), function(req, res) {
        const { cityId } = req.params;
        request("OtelListWithCityId", { cityId })
            .then(e => {
                let hotels = getEntities(e, "OtelBasicEntity");
                res.status(200).json(hotels).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
