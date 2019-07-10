const { genericErrorCode } = require("./constants");

module.exports = (e, res) => {
    res.status(genericErrorCode).json({ error: e }).end();
};
