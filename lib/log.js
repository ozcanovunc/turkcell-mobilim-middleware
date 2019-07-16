const { Client } = require("@elastic/elasticsearch");
const { ELASTICSEARCH_URL } = require("./constants");

module.exports = (() => {
    const client = new Client({
        node: ELASTICSEARCH_URL
    });
    return ({
        index,
        type,
        message,
        deviceInfo = {}
    }) => {
        return client.index({
            index,
            type,
            body: {
                time: new Date(),
                msg: message,
                ...deviceInfo
            }
        });
    };
})();
