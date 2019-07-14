const log = require("../lib/log");

module.exports = function(options = {}) {
    return function(req, res, next) {
        var send = res.send;
        log({
            type: "log",
            index: "middleware_request",
            message: {
                url: req.url,
                method: req.method,
                body: req.body
            }
        });
        res.send = function(body) {
            var statusCode = this.statusCode;
            log({
                type: statusCode === 200 ? "log" : "error",
                index: "middleware_response",
                message: {
                    statusCode,
                    body
                }
            });
            return send.call(this, body);
        };
        next();
    };
};
