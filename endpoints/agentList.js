const request = require("../lib/request");
const genericErrorHandler = require("../lib/genericErrorHandler");

/*
Returns:
[{
    "AdCode": "TCELL|TEAM-ACENTE-DOK-TUR",
    "AgentID": 201,
    "AgentName": "DOK-TUR",
    "UserGroup": "ACENTA_DOK-TUR"
}, {
    "AdCode": "TCELL|TEAM-ACENTE-VISTA",
    "AgentID": 61,
    "AgentName": "VISTA",
    "UserGroup": "ACENTA_VISTA"
}]
*/
module.exports = function(service) {
    service.get('/mobile/agentList/:username', function(req, res) {
        const { username } = req.params;
        request("AgentList", { username })
            .then(e => {
                let result = Object.values(e.AgentEntityCollection.AgentEntity);
                res.status(200).json(result).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
