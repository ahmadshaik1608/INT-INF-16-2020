const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  
  email: { type: String, },
  password: { type: String, },
  associates: {type:String},
  userid:{type:String},
  isadmin:{type:Boolean,default:false}
}, { collection : 'allusers' });
 
const Users = mongoose.model('Users', userSchema);
 
module.exports = Users;