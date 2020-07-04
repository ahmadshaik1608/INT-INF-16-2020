const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 name:{type:String},
 created:{type:Date,default:Date.now},
 coordinatorsk:{type:Array},
 members:{type:Array},
 image:{type:String}

}, { collection : 'chapters' });
 
const Chapters = mongoose.model('chapters', userSchema);
 
module.exports = Chapters;