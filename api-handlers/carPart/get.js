// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');

// const get = (req, res) => {

//     let page = req.query.page;
//     let size = req.query.size;
//     let collectionName = 'ude_' + req.params.schemaName;

//     if (page && size) {
//         page = Number(page);
//         size = Number(size);
//         let skip = size * (page - 1)
        
//         mongoose.connection.db.collection(collectionName).find({}).skip(skip).limit(size).toArray((err, result) => {
//             if (err) {
//                 res.status(500).send('Internal Server Error');
//             }
//             else {
//                 console.log(result);
//                 res.status(200).send(ambarResponse.success(result));
//             }
//         });
//     }
//     else{
//         mongoose.connection.db.collection(collectionName).find({}).toArray((err, result) => {
//             if (err) {
//                 res.status(500).send('Internal Server Error');
//             }
//             else {
//                 console.log(result);
//                 res.status(200).send(ambarResponse.success(result));
//             }
//         });
//     }
// }

// module.exports = get;