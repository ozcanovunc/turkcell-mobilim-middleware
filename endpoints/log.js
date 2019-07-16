const genericErrorHandler = require("../lib/genericErrorHandler");
const log = require("../lib/log");

module.exports = function(service) {
    service.post('/mobile/log', function(req, res) {
        const { index, type, message, deviceInfo } = req.body;
        if (index && type && message) {
            log({ index, type, message, deviceInfo })
                .then(() => res.status(200).json({}).end())
                .catch(e => genericErrorHandler(e, res));
        }
        else {
            genericErrorHandler("Parameters are missing", res);
        }
    });
};
