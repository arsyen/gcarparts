// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');
// const mongo = require('mongodb');

// const getById =(req, res)=>{

//     let collectionName = 'ude_' + req.params.schemaName;
//     let entityId = req.params.id;
    
//     mongoose.connection.db.collection(collectionName).findOne( { _id: new mongo.ObjectID(entityId)}, (err, result) => {
//         if (err) {
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             console.log(result);
//             res.status(200).send(ambarResponse.success(result));
//         }
//     });
// }

// module.exports = getById;