const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 coordinators:[String],
 members:[String],
 created:{type:Date,default:Date.now},
 chaptername:{type:String,unique:true},
 events:[String],
 image:{type:String}

}, { collection : 'chapters' });
 
const Chapters = mongoose.model('chapters', userSchema);
 
module.exports = Chapters;