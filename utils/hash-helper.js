const crypto = require('crypto');
const config = require('../utils/config-helper');

const Hasher = {
    sha512: (password) => {
        var hash = crypto.createHmac('sha512', config.security.hashSalt);
        hash.update(password);
        var value = hash.digest('hex');
        return {
            passwordHash: value
        };
    }
}

module.exports = Hasher;