const jwt = require('jsonwebtoken');
const config = require('../utils/config-helper');
const User = require('../mongoose-models/User');

const identityResolver = (req, res, next) => {
    req.identity = {
        authenticated: false
    };

    let token = req.headers['x-access-token'];
     
    if(!token)
        token= req.cookies.xt;
        
        
    if (token) {
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.lenght);
        }
        //Resolve identity token
        jwt.verify(token, config.security.secret, (err, decoded) => {
            if (err) {
                console.log("ERROR", err);
                next();
            }
            else {
                req.identity.authenticated = true;
                req.identity.username = decoded.username;
                req.identity.userId = decoded.userId;

                //Resolve user data from db (roles,status, etc. )
                User.findById(req.identity.userId, function (err, user) {
                    if (err) {
                        console.log("ERROR", err);
                        return res.status(500).send('Internal Server Error');
                    }
                    else if (user) {
                        req.identity.roles = user.roles;
                        req.identity.status = user.status;
                        next();
                    }
                    else {
                        next();
                    }
                });
            }
        })
    }
    else {
        next();
    };
}

module.exports = identityResolver;
