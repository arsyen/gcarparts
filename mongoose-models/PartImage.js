
const mongoose = require('mongoose');

const PartImage = mongoose.model('PartImage', 
{
    img: { data: Buffer, contentType: String }
});

module.exports=PartImage;