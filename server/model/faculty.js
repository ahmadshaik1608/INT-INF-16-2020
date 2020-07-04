const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  Name: { type: String,},
  branch: {type:String,},
  institue:{type:String},
  yearofjoining : {type:Number ,},
  phone: { type: Number, },
  email: { type: String, },
  password: { type: String, },
  dateofbirth: { type: Date,},
  associates: {type:String}
}, { collection : 'faculty' });
 
const Faculty = mongoose.model('Faculty', userSchema);
 
module.exports = Faculty;