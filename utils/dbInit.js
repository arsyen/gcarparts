const mongoose = require('mongoose');
const Hasher = require('./hash-helper');
const config = require('./config-helper');
const AutoPart = require('../mongoose-models/AutoPart');
const brands = require('./initialData/brands');
const categories = require('./initialData/partCategories');
const subCategories = require('./initialData/partSubCategories');
const carModels = require('./initialData/carModels');
const User = require("../mongoose-models/User");

const mongo = require('mongodb');

const dbInit = async (callback) => {
    //Connect to mongo db
    console.log(config.db.connectionString);
    mongoose.connect(config.db.connectionString, { useNewUrlParser: true, useCreateIndex: true });
    mongoose.Promise = global.Promise;

    fillDb("carbrands", brands);
    fillDb("partcategories", categories);
    fillDb("partsubcategories", subCategories);
    fillDb("carmodels", carModels);

    let updateOptions = {
        upsert: true,
        setDefaultsOnInsert: false,
        useFindAndModify: false
    }
    await User.findOneAndUpdate(
        {
            "username": "admin"
        },
        {
            "username": "admin",
            "firstName": "admin",
            "lastName": "admin",
            "email": "",
            "status": "active",
            "password": Hasher.sha512("admin").passwordHash,
            "roles": ["owner"]
        },
        updateOptions).exec();
};

const fillDb = async (collectionName, collectionData)=>{
    for (let i = 0; i < collectionData.length; i++) {
        let anyRecord = await mongoose.connection.collection(collectionName).findOne({ _id: new mongo.ObjectID(collectionData[i]._id) });
        if (!anyRecord)
            mongoose.connection.collection(collectionName).insertOne(collectionData[i]);
    }
}

module.exports = dbInit;