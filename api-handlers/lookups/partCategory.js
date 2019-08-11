const PartCategory = require('../../mongoose-models/PartCategory');

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


module.exports = {
    getAll,
    add
};