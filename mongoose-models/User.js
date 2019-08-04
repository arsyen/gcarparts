const mongoose = require('mongoose');

const User = mongoose.model('user',
   {
      username: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: false
      },
      password: {
         type: String,
         required: true
      },
      firstName: {
         type: String,
         required: true
      },
      lastName: {
         type: String,
         required: true
      },
      status: {
         type: String,
         required: true
      },
      createDate: {
         type: Date,
         required: true
      },
      roles: {
         type: [String],
         required: false
      }
   });

module.exports = User;