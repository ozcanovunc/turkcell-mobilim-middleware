const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const { getAllUsers } = require("../lib/db");
const errorMessages = require("../lib/errorMessages");

module.exports = function(service) {
    service.post('/mobile/login', function(req, res) {
        const { userID } = req.body;
        if (!userID) {
            return genericErrorHandler(errorMessages.ARGUMENT_ERROR, res);
        }
        getAllUsers()
            .then(users => {
                let authorized = users.find(u => u.userID === userID);
                res.status(authorized ? 200 : 401).json({}).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });

    service.post('/web/login', function(req, res) {
        res.status(200).json({}).end();
    });
};
