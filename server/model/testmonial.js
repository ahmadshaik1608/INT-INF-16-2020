const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  userId:{type:String,required: true,unique:true},
  testmonial: { type: String,},
  username:{type:String},
  branch:{type:String},
  batch:{type:Number},
  isvalid: {type:String,default:"false"}

}, { collection : 'testmonials' });
 
const Testmonial = mongoose.model('Testmonial', userSchema);
 
module.exports =Testmonial;


