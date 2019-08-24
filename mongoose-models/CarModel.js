const mongoose = require('mongoose');

const CarModel = mongoose.model('carModel', 
{
    name: {
        type:String,
        required:true
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    brandName:{
        type:String,
        required:true
    }
});


module.exports = CarModel;