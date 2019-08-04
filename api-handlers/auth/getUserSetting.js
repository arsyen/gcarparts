// const UserSettings = require('../../mongoose-models/UserSetting');
// const ambarResponse = require('../../core/ambarResponse');


// const getUserSettings = (req, res) => {
//     let userId = req.identity.userId;
//     console.log("USERID", userId);
    
//     UserSettings.findOne({ userId: userId }, { '_id': 0 ,'__v': 0 } ,function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             res.status(200).send(ambarResponse.success(result));
//         }
//     });
// }

// module.exports = getUserSettings;