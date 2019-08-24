const CarModel = require('../../mongoose-models/CarModel');
const CarBrand = require('../../mongoose-models/CarBrand');
const mongo = require('mongodb');

const getByBrand =(req, res)=>{
    let brandId = req.params.brandId;
    CarModel.find({brandId: new mongo.ObjectID(brandId)}, function (err, result) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.status(200).send(result);
        }
    });
}

const getAll =(req, res)=>{
    CarModel.find({}, function (err, result) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.status(200).send(result);
        }
    });
}

const add = async (req, res) => {
    let data = req.body; 
    let brand = await CarBrand.findOne({_id: new mongo.ObjectID(req.body.brandId)});
    data.brandName=brand.name;

    let newCarModel = new CarModel(data);

    newCarModel.save((err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else {
            res.status(200).send();
        }
    });  
};


module.exports = {
    getByBrand,
    add,
    getAll
};