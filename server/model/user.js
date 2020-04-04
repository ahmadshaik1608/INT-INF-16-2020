const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  gender: { type: String, required: true},
  phone: { type: Number, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  company: { type: String, required: true},
  designation: { type: String, required: true},
  dateofbirth: { type: Date, required: true},
  location: { type: String, required: true}
}, { collection : 'user' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;