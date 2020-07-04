const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
    rollno:{type:String,required: true,unique:true},
  Name: { type: String,},
  branch: {type:String,},
  institue:{type:String},
  yearofjoining : {type:Number ,},
  phone: { type: Number, },
  email: { type: String, },
  password: { type: String, },
  dateofbirth: { type: Date,},
  associates: {type:String}
}, { collection : 'student' });
 
const Student = mongoose.model('Student', userSchema);
 
module.exports = Student;