const awardRequest = require("../lib/request").awardRequest;
const genericErrorHandler = require("../lib/genericErrorHandler");
const { CACHE_DURATION } = require("../lib/constants");
const errorMessages = require("../lib/errorMessages");
const {
    getUser,
    getAllUsers,
    updateUser
} = require("../lib/db");
const apicache = require("apicache");
var cache = apicache.middleware;

module.exports = function(service) {
    service.post('/web/award/addFunds', function(req, res) {
        const { userID, funds } = req.body;
        getUser(userID)
            .then(user => updateUser(userID, "funds", user.funds + funds))
            .then(() => res.status(200).json({}).end())
            .catch(e => genericErrorHandler(e, res));
    });

    service.get('/web/award/users', cache(CACHE_DURATION), function(req, res) {
        getAllUsers()
            .then(users => res.status(200).json(users).end())
            .catch(e => genericErrorHandler(e, res));
    });

    service.post('/mobile/award/sendAward', function(req, res) {
        const { userIDFrom, userIDTo, awardID } = req.body;
        var userFrom, userTo;
        Promise.all([getUser(userIDFrom), getUser(userIDTo), getAllAwards()])
            .then(e => {
                userFrom = e[0];
                userTo = e[1];
                let awards = e[2];
                let award = awards.find(a => a.Kod === awardID);
                if (!award) {
                    return Promise.reject(errorMessages.NO_AWARD_WITH_ID);
                }
                if (!userFrom || !userIDTo) {
                    return Promise.reject(errorMessages.USER_NOT_FOUND);
                }
                let userFunds = userFrom.funds;
                let awardPrice = award.Fiyat;
                if (awardPrice > userFunds)
                    return Promise.reject(errorMessages.INSUFFICIENT_FUNDS);
                return updateUser(userIDFrom, "funds", userFunds - awardPrice); // Reduce user funds
            })
            .then(() => {
                // Update given awards
                userFrom.givenAwards.push(awardID);
                return updateUser(userIDFrom, "givenAwards", userFrom.givenAwards.join(","));
            })
            .then(() => {
                // Update received awards
                userTo.receivedAwards.push(awardID);
                return updateUser(userIDTo, "givenAwards", userTo.receivedAwards.join(","));
            })
            .then(() => res.status(200).json({}).end())
            .catch(e => genericErrorHandler(e, res));
    });

    service.get('/mobile/award/:userID', function(req, res) {
        const { userID } = req.params;
        getUser(userID)
            .then(user => res.status(200).json(user).end())
            .catch(e => genericErrorHandler(e, res));
    });

    service.get('/mobile/award', function(req, res) {
        getAllAwards()
            .then(e => res.status(200).json(e).end())
            .catch(e => genericErrorHandler(e, res));
    });
};

function getAllAwards() {
    return new Promise((resolve, reject) => {
        awardRequest("GetAllGifts")
            .then(e => {
                let thereAreMultipleResults = !!e.OdulListesi.Odul[0];
                let awards = thereAreMultipleResults ? Object.values(e.OdulListesi.Odul) : [e.OdulListesi.Odul];
                resolve(awards);
            })
            .catch(reject);
    });
}
