const mongoose = require('mongoose');

const PartCategory = mongoose.model('partCategory', 
{
    name: {
        type:String,
        required:true
    }
});


module.exports = PartCategory;