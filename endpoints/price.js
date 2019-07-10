const request = require("../lib/request");
const genericErrorHandler = require("../lib/genericErrorHandler");

module.exports = function(service) {
    service.post('/mobile/price/hotel', function(req, res) {
        let {
            otelId,
            startDate,
            endDate,
            roomType,
            accommodationType
        } = req.body;

        request("CalculateOtelPrice", {
                otelId,
                startDate,
                endDate,
                roomType,
                accommodationType
            })
            .then(e => {
                res.status(200).json({ price: e.CalculatedOtelPrice }).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
