// const ambarResponse = require('../../core/ambarResponse');
// const mongoose = require('mongoose');
// const EntitySchema = require('../../mongoose-models/AutoPart');
// const SchemaFieldValidationRule = require('../../mongoose-models/SchemaFieldValidationRule');
// const VForObjectValidatorDynamic = require('../../v-for-json/VForObjectValidatorDynamic');

// const add = async (req, res) => {
//     let data = req.body.data;
//     let schemaName = req.body.schema;
//     let collectionName = 'ude_' + schemaName;


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
//     let v = new VForObjectValidatorDynamic(schemaName, schema.fields);
//     v.validate(data, schemaName, schemaName, function (er) {
//         if (er) {
//             res.status(400).send(ambarResponse.fail(0, "Validation failed", er));
//         }
//         else {
//             //Add collection to db if valid
//             mongoose.connection.db.collection(collectionName).insertOne({ schema: schemaName, data: data }, (err, results) => {
//                 if (err) {
//                     res.status(500).send('Internal Server Error');
//                 }
//                 else {
//                     console.log(results);
//                     res.status(200).send(ambarResponse.success({}));
//                 }
//             });
//         }

//     })
// };

// module.exports = add;