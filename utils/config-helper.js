let config = {};

if (process.argv.indexOf('--local') > 0) {
    config = require("../config.local.json");
}
else if (process.argv.indexOf('--dev') > 0) {
    config = require("../config.dev.json");
}
else if (process.argv.indexOf('--prod') > 0) {
    config = require("../config.prod.json");
}
else{
    config = require("../config.prod.json");
}

module.exports = config;

