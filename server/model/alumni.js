const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  rollno:{type:String,required: true,unique:true},
  Name: { type: String,},
  branch: {type:String,},
  yop : {type:Number ,},
  institution :{type:String},
  profilepic:{type:String},
  phone: { type: Number, },
  email: { type: String,required: true,unique:true },
  password: { type: String, },
  company: { type: String},
  designation: { type: String},
  dateofbirth: { type: Date},
  location: { type: String},
  associates: {type:String},
  testmonial:{type:Boolean,default:false}
}, { collection : 'alumni' });
 
const Alumni = mongoose.model('Aumni', userSchema);
 
module.exports = Alumni;