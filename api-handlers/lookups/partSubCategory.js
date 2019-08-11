const PartSubCategory = require('../../mongoose-models/PartSubCategory');

const getAll =(req, res)=>{
    PartSubCategory.find({}, { '_id': 0,'__v': 0 }, function (err, result) {
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
    let newPartSubCategory = new PartSubCategory(req.body);

    newPartSubCategory.save((err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else {
            res.status(200).send();
        }
    });  
};


module.exports = {
    getAll,
    add
};