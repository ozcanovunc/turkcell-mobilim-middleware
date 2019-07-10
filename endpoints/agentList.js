const request = require("../lib/request");
const getEntities = require("../lib/getEntities");
const genericErrorHandler = require("../lib/genericErrorHandler");

module.exports = function(service) {
    service.get('/mobile/agentList/:username', function(req, res) {
        const { username } = req.params;
        request("AgentList", { username })
            .then(e => {
                let result = getEntities(e, "AgentEntity");
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
