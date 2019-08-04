// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');
// const EntitySchema = require('../../mongoose-models/AutoPart');
// const SchemaFieldValidationRule = require('../../mongoose-models/SchemaFieldValidationRule');
// const VForObjectValidatorDynamic = require('../../v-for-json/VForObjectValidatorDynamic');
// const mongo = require('mongodb');

// const productAdd = async (req, res) => {
//     let data = req.body.data;
//     let schemaName = req.body.schema;
//     let collectionName = 'ude_productreview';

//     data.reviewerId = req.identity.userId;
//     let user = await  mongoose.connection.db.collection("pg_identity_users").findOne({_id:mongo.ObjectID(data.reviewerId)});
//     console.log("USEEEEEER", user);
//     data.reviewerName = user.name;
//     data.date = new Date();

//     mongoose.connection.db.collection(collectionName).insertOne( {schema:schemaName, data:data}, (err, results) => {
//         if (err) {
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             console.log(results);
//             res.status(200).send(ambarResponse.success({}));
//         }
//     });
// };

// module.exports = productAdd;