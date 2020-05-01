const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,required: true,unique:true},
  testmonial: { type: String,},
  username:{type:String},
  branch:{type:String},
  batch:{type:Number},
  profilepic:{type:String},
  isvalid: {type:String,default:"false"}

}, { collection : 'testmonials' });
 
const Testmonial = mongoose.model('Testmonial', userSchema);
 
module.exports =Testmonial;


