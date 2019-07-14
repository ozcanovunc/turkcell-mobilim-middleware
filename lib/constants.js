module.exports = {
    BASE_URL_SEYAHAT: "http://netpre01/NetFlowWcfService/SeyahatPlus.svc",
    ELASTICSEARCH_URL: "http://es01:9200/",
    GENERIC_ERROR_CODE: 500,
    GENERIC_SUCCESS_CODE: 200,
    PORT: 80,
    CACHE_DURATION: "4 hours",
    CACHE_OPTIONS: {
        headers: {
            "cache-control": "no-cache"
        },
        statusCodes: {
            include: [200], // caches ONLY responses with a success/200 code
        }
    }
};
