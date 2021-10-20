
const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;


let userSchema = new SCHEMA({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
},{ timestamps: true });


module.exports = MONGOOSE.model('user', userSchema);
