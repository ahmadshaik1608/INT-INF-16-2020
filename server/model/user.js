const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  rollno:{type:String,required: true,unique:true},
  firstname: { type: String,},
  lastname: { type: String,},
  gender: { type: String, },
  branch: {type:String,},
  bio:{type:String},
  yearofpass : {type:Number ,},
  phone: { type: Number, },
  email: { type: String, },
  password: { type: String, },
  company: { type: String},
  profilepic:{type:String},
  designation: { type: String},
  dateofbirth: { type: Date,},
  location: { type: String}
}, { collection : 'user' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;