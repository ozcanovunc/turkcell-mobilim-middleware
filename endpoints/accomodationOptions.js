const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.get('/mobile/accomodationOptions/', cache(CACHE_DURATION), function(req, res) {
        Promise.all([
                request("KonaklamaList", { listType: "ST_ODATIPI" }),
                request("KonaklamaList", { listType: "ST_KONAKLAMATIPI" }),
                request("GetOtherHotelReasons")
            ])
            .then(e => {
                let roomTypes = getEntities(e[0], "CodeEntity");
                let accomodationTypes = getEntities(e[1], "CodeEntity");
                let hotelReasons = getEntities(e[2], "CodeEntity");
                res.status(200).json({ roomTypes, accomodationTypes, hotelReasons }).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
