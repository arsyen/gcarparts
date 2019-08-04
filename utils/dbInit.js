const mongoose = require('mongoose');
const Hasher = require('./hash-helper');
const config = require('./config-helper');
const AutoPart = require('../mongoose-models/AutoPart');
const brands = require('./initialData/brands');

const mongo = require('mongodb');

const dbInit = async (callback) => {
    //Connect to mongo db
    console.log(config.db.connectionString);
    mongoose.connect(config.db.connectionString, { useNewUrlParser: true, useCreateIndex: true });
    mongoose.Promise = global.Promise;

    fillDb("brands", brands);
};

const fillDb = async (collectionName, collectionData)=>{
    for (let i = 0; i < collectionData.length; i++) {
        let anyRecord = await mongoose.connection.collection(collectionName).findOne({ _id: new mongo.ObjectID(collectionData[i]._id) });
        if (!anyRecord)
            mongoose.connection.collection(collectionName).insertOne(collectionData[i]);
    }
}

module.exports = dbInit;