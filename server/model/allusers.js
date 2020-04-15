const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  
  email: { type: String, },
  password: { type: String, },
  associates: {type:String},
  userid:{type:String}
}, { collection : 'allusers' });
 
const Users = mongoose.model('Users', userSchema);
 
module.exports = Users;