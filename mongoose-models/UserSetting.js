const mongoose = require('mongoose');

const UserSetting = mongoose.model('userSetting', 
{
     userId: {
         type:String,
         required:true
     },
     settings:{
        type:mongoose.Schema.Types.Mixed,
         required:false
     }
});

module.exports = UserSetting;