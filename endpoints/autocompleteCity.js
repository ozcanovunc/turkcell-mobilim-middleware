const request = require("../lib/request");
const genericErrorHandler = require("../lib/genericErrorHandler");

module.exports = function(service) {
    service.get('/mobile/autocompleteCity/:searchText', function(req, res) {
        const { searchText } = req.params;
        request("FromToCollection", { fromTo: searchText })
            .then(e => {
                let result = Object.values(e.CityCountryEntityCollection.CityCountryEntity);
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
