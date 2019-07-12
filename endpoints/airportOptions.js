const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/airportOptions/:from/:to', cache(CACHE_DURATION), function(req, res) {
        const { from, to } = req.params;

        Promise.all([
                request("GetFliedFrom", { fliedFrom: from }),
                request("GetFliedFrom", { fliedFrom: to })
            ])
            .then(e => {
                let from = e[0];
                let to = e[1];
                from = getEntities(from, "CityCountryEntity");
                to = getEntities(to, "CityCountryEntity");
                res.status(200).json({ from, to }).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
