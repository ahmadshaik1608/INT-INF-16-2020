const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  Name: { type: String,},
  phone: { type: Number, },
  email: { type: String, },
  password: { type: String, },
  company: { type: String},
  designation: { type: String},
  dateofbirth: { type: Date,},
  location: { type: String},
  associates: {type:String}
}, { collection : 'employee' });
 
const Employee = mongoose.model('Employee', userSchema);
 
module.exports = Employee;