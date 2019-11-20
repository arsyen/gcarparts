const express = require('express');
const expressConfig = require('./expressConfig');
const dbInit = require("./utils/dbInit");
const mongoose = require('mongoose');
const config = require('./utils/config-helper');


//Connect to mongo db
mongoose.Promise = global.Promise;
mongoose.connect(config.db.connectionString, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true });

if (config.db.init) {
     dbInit();
}

console.log("Configuring express instance");
const app = express();

expressConfig.configure(app);

//Start server
app.use('/uploads', express.static('uploads'));
app.use('/front-end', express.static('front-end'));
app.use('/front-end-admin', express.static('front-end-admin'));

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}!`));

