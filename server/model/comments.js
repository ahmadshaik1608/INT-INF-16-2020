const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 email:{type:String},
 firstname:{type:String},
 lastname:{type:String},
 comment:{type:String},
 seen:{type:Number,default:0},
 answered:{type:Boolean,default:false},
 time:{type:Date,default:Date.now}

}, { collection : 'comments' });
 
const Comments = mongoose.model('comments', userSchema);
 
module.exports = Comments;