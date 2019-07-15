module.exports = {
    BASE_URL_TRIP: "http://netpre01/NetFlowWcfService/SeyahatPlus.svc",
    BASE_URL_AWARD: "http://netpre01/odul/GiftService.svc",
    ELASTICSEARCH_URL: "http://es01:9200/",
    GENERIC_ERROR_CODE: 500,
    GENERIC_SUCCESS_CODE: 200,
    PORT: process.env.C9_USER ? 8080 : 80,
    CACHE_DURATION: "4 hours",
    CACHE_OPTIONS: {
        headers: {
            "cache-control": "no-cache"
        },
        statusCodes: {
            include: [200], // caches ONLY responses with a success/200 code
        }
    },
    DB: {
        CONNECTION_STRING: "postgressql://mobilim1:devops@bauba.turkcell.tgc:5497/mobilim1",
        USER_TABLE_NAME: `tcell_mobilim1."User"`
    }
};
