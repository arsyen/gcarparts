const jwt = require('jsonwebtoken');
const config = require("../utils/config-helper");

const jwtHelper = {
    sign: (payload, callback) => {
        jwt.sign(payload,
            config.secret,
            { expiresIn: config.jwtExpiration },
            (err, token) => {
                callback(token);
            });
    }
}

module.exports = jwtHelper;