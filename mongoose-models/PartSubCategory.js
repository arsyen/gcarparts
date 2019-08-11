
const mongoose = require('mongoose');

const PartSubCategory = mongoose.model('partSubCategory', 
{
    name: {
        type:String,
        required:true
    }
});


module.exports = PartSubCategory;