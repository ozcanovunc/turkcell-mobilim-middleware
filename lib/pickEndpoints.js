module.exports = exports = pickEndpoints;

function pickEndpoints(app, ...others) {
    const paths = {};
    const appProxy = {
        get: storer.bind({ paths, method: "get" }),
        patch: storer.bind({ paths, method: "patch" }),
        post: storer.bind({ paths, method: "post" }),
        use: app.use.bind(app),
        delete: storer.bind({ paths, method: "delete" }),
        put: storer.bind({ paths, method: "put" })
    };
    others.forEach((serviceExtender) => {
        serviceExtender(appProxy);
    });
    for (let uniquePath in paths) {
        let endpointBinding = paths[uniquePath];
        app[endpointBinding.method].apply(app, endpointBinding.args);
    }
}

function storer(endPointPath) {
    const paths = this.paths;
    const method = this.method;
    const theUniquePath = `${method}: ${endPointPath}`;
    if (!paths[theUniquePath]) {
        paths[theUniquePath] = {
            args: Array.prototype.slice.call(arguments),
            method
        };
    }
}
