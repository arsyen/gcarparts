const CarBrand = require('../../mongoose-models/CarBrand');
const mongo = require("mongodb");

const getAll = (req, res) => {
    CarBrand.find({}, {}, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            res.status(200).send(result);
        }
    });
}

const add = async (req, res) => {
    try {
        let newCarBrand = new CarBrand(req.body);
        let savedBrand = await newCarBrand.save();
        res.status(200).send(savedBrand);
    }
    catch (ex) {
        console.log(ex);
        res.status(500).send({});
    }
};

const update = async (req, res) => {
    try {
        let brandId = req.params.id;

        await CarBrand.findOneAndUpdate(
            { _id: new mongo.ObjectID(brandId) },
            { name: req.body.name }
        );
        res.status(200).send({});

    } catch (ex) {
        console.log(ex);
        res.status(500).send({});
    }
};


const deleteBrand = async (req, res) => {
    try {
        let brandId = req.params.id;
        await CarBrand.findOneAndDelete({ _id: new mongo.ObjectID(brandId) });
        res.status(200).send({});
    }
    catch (ex) {
        console.log(ex);
        res.status(500).send({});
    }
};


module.exports = {
    getAll,
    add,
    deleteBrand,
    update
};