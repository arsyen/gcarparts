const mongoose = require('mongoose');

const SchemaFieldValidationRule = mongoose.model('SchemaFieldValidationRule',
   {
      _id:String,
      key: {
         type: String,
         required: true,
         unique:true
      },
      name: {
         type: String,
         required: true
      },
      fieldTypes: {
         type: mongoose.Schema.Types.Mixed,
         required: true
      },
      description: {
         type: String,
         required: true
      },
      rule: {
         type: String,
         required: true
      },
      valueNeeded: {
         type: Boolean,
         required: true
      },
      value: {
         type: mongoose.Schema.Types.Mixed,
         required: false
      },
   });

module.exports = SchemaFieldValidationRule;