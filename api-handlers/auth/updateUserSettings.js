// const UserSettings = require('../../mongoose-models/UserSetting');
// const ambarResponse = require('../../core/ambarResponse');


// const updateUserSettings = (req, res) => {
//     let data = req.body;
//     let userId = req.identity.userId;
//     console.log("USERID", userId);
//     UserSettings.findOneAndUpdate({ userId: userId }, {userId: userId, settings:data}, { upsert:true,useFindAndModify:false } ,function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             res.status(200).send(ambarResponse.success(result));
//         }
//     });
// }

// module.exports = updateUserSettings;