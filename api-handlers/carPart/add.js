const mongoose = require('mongoose');
const mongo = require('mongodb');
const AutoPart = require('../../mongoose-models/AutoPart');
const CarBrand = require('../../mongoose-models/CarBrand');
const CarModel = require('../../mongoose-models/CarModel');
const PartCategory = require('../../mongoose-models/PartCategory');

const add = async (req, res) => {
    let requestData = req.body.data;
    
 
    let newData = {
        inStock:requestData.inStock,
        name:requestData.name,
        years:requestData.years,
        description:requestData.description,
        price:requestData.price,
        brand:requestData.brand
    };

    let carBrand = await CarBrand.findOne({_id: new mongo.ObjectID(requestData.carBrandId) }).exec();
    let carModel = await CarModel.findOne({_id: new mongo.ObjectID(requestData.carModelId) }).exec();
    let category = await PartCategory.findOne({_id: new mongo.ObjectID(requestData.categoryId) }).exec();

    newData.carBrandId=carBrand._id;
    newData.carModelId=carModel._id;
    newData.categoryId = category._id;
    
    newData.carBrand=carBrand.name;
    newData.carModel=carModel.name;
    newData.category = category.name;

    let newPart = new AutoPart(newData);

    
    newPart.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send({});
        }
    });  
};

module.exports = add;