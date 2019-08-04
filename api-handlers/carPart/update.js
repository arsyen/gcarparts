// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');
// const EntitySchema = require('../../mongoose-models/AutoPart');
// const SchemaFieldValidationRule = require('../../mongoose-models/SchemaFieldValidationRule');
// const VForObjectValidatorDynamic = require('../../v-for-json/VForObjectValidatorDynamic');
// const mongo = require('mongodb');

// const update = async (req, res) => {
//     let data = req.body.data;
//     let schemaName = req.params.schemaName;
//     let collectionName = 'ude_' + schemaName;
//     let entityId = req.params.id;

//     //Get schema from db
//     let schema = await EntitySchema.findOne({ name: schemaName }).exec();
//     if (!schema) {
//         res.status(400).send(ambarResponse.fail(0, "Schema not found: " + schemaName));
//         return;
//     }

//     for (let fieldName in schema.fields) {
//         if (schema.fields[fieldName].validationRules) {
//             for (let i = 0; i < schema.fields[fieldName].validationRules.length; i++) {
//                 let currentRule = schema.fields[fieldName].validationRules[i];
//                 currentRule.rule = await SchemaFieldValidationRule.findOne({ key: currentRule.rule }).exec();
//             }
//         }
//     }

//     //Validate data using schema validation rules
//     try {
//         let v = new VForObjectValidatorDynamic(schemaName, schema.fields);
//         v.validate(data, schemaName, schemaName, function (er) {
//             if (er) {
//                 res.status(400).send(ambarResponse.fail(0, "Validation failed", er));
//             }
//             else {
//                 //Add collection to db if valid
//                 mongoose.connection.db.collection(collectionName).updateOne({ _id: new mongo.ObjectID(entityId) }, { $set: { data: data } }, (err, results) => {
//                     if (err) {
//                         res.status(500).send('Internal Server Error');
//                     }
//                     else {
//                         console.log(results);
//                         res.status(200).send(ambarResponse.success({}));
//                     }
//                 });
//             }

//         })
//     }
//     catch(ex){
//         console.log(ex);
//         res.status(500).send('Internal Server Error');
//     }
// };

// module.exports = update;