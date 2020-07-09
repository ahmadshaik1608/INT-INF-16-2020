const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 eventname:{type:String},
 location:{type:String},
 createdby:{type:String},
 eventdate:{type:Date},
 eventtime:{type:String},
 chapterid:{type:Object}
}, { collection : 'chapterevents' });
 
const ChapterEvents = mongoose.model('chapterevents', userSchema);
 
module.exports = ChapterEvents;