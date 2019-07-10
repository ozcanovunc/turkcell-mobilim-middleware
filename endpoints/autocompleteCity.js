const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");

module.exports = function(service) {
    service.get('/mobile/autocompleteCity/:searchText', function(req, res) {
        const { searchText } = req.params;
        request("FromToCollection", { fromTo: searchText })
            .then(e => {
                let result = getEntities(e, "CityCountryEntity");
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
