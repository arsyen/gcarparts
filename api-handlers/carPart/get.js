const mongoose = require('mongoose');
const mongo = require('mongodb');
const get = (req, res) => {
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
        findFilter.years =  Number(req.query.year);

    let collectionName = 'autoparts';
    mongoose.connection.collection(collectionName).find(findFilter).skip(skip).limit(size).toArray((err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    });
}

module.exports = get;