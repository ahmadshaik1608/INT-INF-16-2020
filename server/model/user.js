const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  rollno: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection : 'user' });
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;