const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 coordinators:[String],
 members:[String],
 chaptername:{type:String,unique:true},
 events:[String]

}, { collection : 'chapters' });
 
const Chapters = mongoose.model('chapters', userSchema);
 
module.exports = Chapters;