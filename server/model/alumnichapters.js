const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 coordinators:[String],
 members:[String],
 description:[String],
 location:[String],
 created:{type:Date,default:Date.now},
 chaptername:{type:String,unique:true},
 events:[Object],
 image:{type:String}

}, { collection : 'chapters' });
 
const Chapters = mongoose.model('chapters', userSchema);
 
module.exports = Chapters;