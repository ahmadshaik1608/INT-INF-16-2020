const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  
  title: { type: String, },
  name: { type: String, },
  message: [String],
  image:{type:String},
}, { collection : 'AboutUsMessages' });
 
const AboutUs = mongoose.model('AboutUsMessages', userSchema);
 
module.exports = AboutUs;