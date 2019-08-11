const jwt = require('jsonwebtoken');
const config = require("../../utils/config-helper");
const hasher = require("../../utils/hash-helper");
const User = require("../../mongoose-models/User");

let loginHandler = (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        passwordHash = hasher.sha512(password, config.security.hashSalt);
        User.findOne({ username: username, password:passwordHash.passwordHash }, function (err, result) {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else if(result){
                jwt.sign({ username: username, userId:result._id, roles: result.roles }, config.security.secret, { expiresIn: config.security.jwtExpiration },
                    (err, token) => {
                        console.log(err);
                        res.status(200).send({token:token});
                    });
                
            }
            else{
                res.status(400).send("Invalid Credentials-No user found");
            }
        });
    }
    else {
        res.status(400).send("Credentials missing");
    }
};

module.exports = loginHandler;