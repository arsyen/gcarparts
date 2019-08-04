const mongoose = require('mongoose');

const PGEntitySchema = mongoose.model('pg-entitySchema', 
{
     name: {
         type:String,
         required:true
     },
     createdDate:{
         type:Date,
         required:true
     },
     updatedDate:{
        type:Date,
        required:true
     },
     fields:{
         type:mongoose.Schema.Types.Mixed,
         required:false
     }
});


// fields:{
//    "email":{
//        type:"string",
//        title:{
//            "us":"email",
//            "am":"Էլ․ փոստ"
//        },
//        validationRules:[ 
//            {rule:'email', value:null},
//            {rule:'max-length', value:100},
//            {rule:'min-length', value:100},
//        ]
//    } 
// }

module.exports = PGEntitySchema;