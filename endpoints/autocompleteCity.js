const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/autocompleteCity/:isDomestic/:searchText', cache(CACHE_DURATION), function(req, res) {
        var { isDomestic, searchText } = req.params;
        isDomestic = isDomestic === "true";
        request("FromToCollection", { fromTo: searchText })
            .then(e => {
                let result = getEntities(e, "CityCountryEntity");
                result = result.filter(country => isDomestic ? country.CountryID === 190 : country.CountryID !== 190);
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
