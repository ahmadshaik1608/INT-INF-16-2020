const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 email:{type:String},
 phone:{type:String},
 link:{type:String},
 address:{type:String}

}, { collection : 'contactus' });
 
const Alumni = mongoose.model('contactus', userSchema);
 
module.exports = Alumni;