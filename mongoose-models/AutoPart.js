const mongoose = require('mongoose');

const EntitySchema = mongoose.model('entitySchema', 
{
    brand: {
        type:String,
        required:true
    },
    model: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    name: {
         type:String,
         required:true
     },
     description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
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

module.exports = EntitySchema;