const mongoose = require('mongoose');

const AutoPart = mongoose.model('autoPart', 
{
    carBrandId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    carModelId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    categoryId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    carBrand: {
        type:String,
        required:true
    },
    brand: {
        type:String,
        required:true
    },
    carModel: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    years:{
        type:[Number],
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
    inStock: {
        type:Boolean,
        required:true
    },
});

module.exports = AutoPart;