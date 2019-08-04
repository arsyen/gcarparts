// const User = require("../../mongoose-models/User");
// const hasher = require("../../utils/hash-helper");
// const ambarResponse = require("../../core/ambarResponse");

// let registerHandler = (req, res) => {
//     let username = req.body.username;
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let userName = req.body.userName;
//     let password = req.body.password;

//     //Hash password with salt
//     password = hasher.sha512(password);

//     let newUser = new User({
//         username: username,
//         password: password.passwordHash,
//         firstName: firstName,
//         lastName: lastName,
//         createDate:Date.now(),
//         status: 1,
//         roles: ["user"]
//     });

//     newUser.save((err, results) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             res.status(200).send(ambarResponse.success());
//         }
//     });
// };

// module.exports = registerHandler;
