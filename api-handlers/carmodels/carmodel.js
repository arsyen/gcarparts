const CarModel = require('../../mongoose-models/CarModel');
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

const add = (req, res) => {
    let  newCarModel = new CarModel(req.body);

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
    add
};