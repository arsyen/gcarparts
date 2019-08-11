const mongoose = require('mongoose');

const CarBrand = mongoose.model('carBrand', 
{
    name: {
        type:String,
        required:true
    }
});


module.exports = CarBrand;