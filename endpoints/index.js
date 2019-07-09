const fs = require("fs");
const path = require("path");

module.exports = processDir;

function processDir(service, startPath = __dirname) {
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        let file = path.parse(files[i]);
        let stat = fs.statSync(path.join(startPath, files[i]));
        if (stat.isFile()) {
            if (file.ext !== ".js")
                continue;
            let modulePath = path.relative(__dirname, path.join(startPath, files[i]));
            if (modulePath === "index.js")
                continue;
            require(`./${modulePath}`)(service);
        }
        else {
            processDir(service, path.join(startPath, files[i]));
        }
    }
}
