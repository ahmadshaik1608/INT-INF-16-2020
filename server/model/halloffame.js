const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  
  name: { type: String, },
  rollno:{type:String},
  batch:{type:Number},
  branch:{type:String},
  description:{type:String},
  institution:{type:String},
  hofyear:{type:Number},
  designation:{type:String},
  company:{type:String},
  location:{type:String},
  profilepic:{type:String},
}, { collection : 'HallofFame' });
 
const Hof= mongoose.model('HallofFame', userSchema);
 
module.exports = Hof;