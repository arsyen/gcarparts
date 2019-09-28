const mongoose = require('mongoose');
const mongo = require('mongodb');
const fs = require('fs');
const AutoPart = require('../../mongoose-models/AutoPart');
const CarBrand = require('../../mongoose-models/CarBrand');
const CarModel = require('../../mongoose-models/CarModel');
const PartCategory = require('../../mongoose-models/PartCategory');
const PartImage = require('../../mongoose-models/PartImage');

const add = async (req, res) => {
    let requestData = req.body;

    let newData = {
        inStock: requestData.inStock,
        name: requestData.name,
        price: requestData.price,
        brand: requestData.brand,
        serial: requestData.serial
    };


    if (requestData.years) {
        let yearsArray = [];
        let yearsStrings = requestData.years.split(',');
        for (let i = 0; i < yearsStrings.length; i++) {
            if (yearsStrings[i]) {
                yearsArray.push(parseInt(yearsStrings[i].trim()));
            }
        }

        newData.years = yearsArray;
    }


    let carBrand = await CarBrand.findOne({ _id: new mongo.ObjectID(requestData.carBrandId) }).exec();
    let carModel = await CarModel.findOne({ _id: new mongo.ObjectID(requestData.carModelId) }).exec();
    let category = await PartCategory.findOne({ _id: new mongo.ObjectID(requestData.categoryId) }).exec();

    newData.carBrandId = carBrand._id;
    newData.carModelId = carModel._id;
    newData.categoryId = category._id;

    newData.carBrand = carBrand.name;
    newData.carModel = carModel.name;
    newData.category = category.name;

    //Save image in db
    if (req.body.fileName) {
        let filePath = `./uploads/${req.body.fileName}`;
        let imageData = fs.readFileSync(filePath);
        let imageInDb = await new PartImage({
            img: {
                data: imageData,
                contentType: req.body.imageContentType
            }
        }).save();
        newData.image = imageInDb._id;
        fs.unlinkSync(filePath);
    }


    let newPart = new AutoPart(newData);
    newPart.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
};


const get = (req, res) => {
    let serial = req.query.sn;

    if(serial){
        let collectionName = 'autoparts';
        mongoose.connection.collection(collectionName).find({serial:serial}).toArray((err, result) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            else {
                res.status(200).send(result);
            }
        });
        return;
    }


    //Determine paging info
    let page = req.query.page || 1;
    let size = req.query.size || 30;
    page = Number(page);
    size = Number(size);
    let skip = size * (page - 1)

    //Construct filter
    let findFilter = {};
    if (req.query.cbid)
        findFilter.carBrandId = new mongo.ObjectID(req.query.cbid);
    if (req.query.mid)
        findFilter.carModelId = new mongo.ObjectID(req.query.mid);
    if (req.query.cid)
        findFilter.categoryId = new mongo.ObjectID(req.query.cid);
    if (req.query.year)
        findFilter.years = Number(req.query.year);

    let collectionName = 'autoparts';
    mongoose.connection.collection(collectionName).find(findFilter).skip(skip).limit(size).toArray((err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else {
            res.status(200).send(result);
        }
    });
}


const deletePart = async (req, res) => {
    try {
        let partId = req.params.id;

        let part = await AutoPart.findOne({ _id: new mongo.ObjectID(partId) });
        await AutoPart.findOneAndDelete({ _id: new mongo.ObjectID(partId) });

        if (part.image) {
            await PartImage.findOneAndDelete({ _id: new mongo.ObjectID(part.image) });
        }
        res.status(200).send();
    }
    catch (ex) {
        console.log(ex);
        res.status(500).send();
    }
};


module.exports = get;

module.exports = {
    add: add,
    get: get,
    deletePart: deletePart
}