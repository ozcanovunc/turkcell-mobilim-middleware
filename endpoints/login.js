const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const { getAllUsers } = require("../lib/db");

module.exports = function(service) {
    service.post('/mobile/login', function(req, res) {
        const { userID } = req.body;
        getAllUsers()
            .then(users => {
                let authorized = users.find(u => u.userID === userID);
                res.status(authorized ? 200 : 401).json({}).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
