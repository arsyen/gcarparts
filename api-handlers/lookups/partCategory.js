const PartCategory = require('../../mongoose-models/PartCategory');
const mongo = require('mongodb');
const getAll =(req, res)=>{
    PartCategory.find({}, function (err, result) {
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
    let newPartCategory = new PartCategory(req.body);

    newPartCategory.save((err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else {
            res.status(200).send({});
        }
    });  
};

const update = async (req, res) => {
    try {
        let brandId = req.params.id;

        await PartCategory.findOneAndUpdate(
            { _id: new mongo.ObjectID(brandId) },
            { name: req.body.name }
        );
        res.status(200).send({});

    } catch (ex) {
        console.log(ex);
        res.status(500).send({});
    }
};


const deleteCategory = async (req, res) => {
    try {
        let categoryId = req.params.id;
        await PartCategory.findOneAndDelete({ _id: new mongo.ObjectID(categoryId) });
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
    update,
    deleteCategory
};