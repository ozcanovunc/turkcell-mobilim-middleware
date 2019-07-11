const { GENERIC_ERROR_CODE } = require("./constants");

module.exports = (e, res) => {
    res.status(GENERIC_ERROR_CODE).json({ error: e }).end();
};
