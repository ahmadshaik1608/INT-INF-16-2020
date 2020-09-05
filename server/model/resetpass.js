const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const resetSchema = new Schema({
  email:{type:String},
  otp:{type:String},
  time:{type:Date,default:Date.now}
 
}, { collection : 'resetPassword' });
 
const resetPassword= mongoose.model('resetPassword', resetSchema);
 
module.exports = resetPassword;