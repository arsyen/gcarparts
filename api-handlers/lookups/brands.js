const CarBrand = require('../../mongoose-models/CarBrand');


const getAll =(req, res)=>{
    CarBrand.find({}, {}, function (err, result) {
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
    let newCarBrand = new CarBrand(req.body);

    newCarBrand.save((err, result) => {
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