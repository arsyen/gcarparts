// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');
// const mongo = require('mongodb');

// const productGet = (req, res) => {

//     let productId = req.query.productId;
//     let collectionName = 'ude_productreview';

    
//     if (productId) {
//         mongoose.connection.db.collection(collectionName).find({"data.productId":productId}).toArray((err, result) => {
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

// module.exports = productGet;