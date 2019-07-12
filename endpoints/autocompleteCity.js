const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/autocompleteCity/:searchText', cache(CACHE_DURATION), function(req, res) {
        const { searchText } = req.params;
        request("FromToCollection", { fromTo: searchText })
            .then(e => {
                let result = getEntities(e, "CityCountryEntity");
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
