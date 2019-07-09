const request = require("../lib/request");

module.exports = function(service) {
    service.get('/mobile/agentList/:username', function(req, res) {
        const { username } = req.params;
        request("AgentList", { username })
            .then(({ statusCode, body }) => res.status(statusCode).json(body).end())
            .catch(({ statusCode, body }) => res.status(statusCode).json(body).end());
    });
};
