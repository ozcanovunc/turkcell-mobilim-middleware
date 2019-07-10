const request = require("../lib/request");
const genericErrorHandler = require("../lib/genericErrorHandler");

/*
Returns:
{
    "types": [{
        "Code": "YURTICI",
        "Description": "Yurt İçi"
    }],
    "purposes": [{
        "Code": "SEMINER",
        "Description": "Seminer - Konferans"
    }]
}
*/
module.exports = function(service) {
    service.get('/mobile/tripOptions/', function(req, res) {
        Promise.all([
                request("GetTripTypes", { companyCode: "05" }),
                request("GetTripPurposes")
            ])
            .then(e => {
                let types = e[0];
                let purposes = e[1];
                types = Object.values(types.CodeEntityCollection.CodeEntity);
                purposes = Object.values(purposes.CodeEntityCollection.CodeEntity);
                res.status(200).json({ types, purposes }).end();
            })
            .catch(e => genericErrorHandler(e, res));
    });
};
