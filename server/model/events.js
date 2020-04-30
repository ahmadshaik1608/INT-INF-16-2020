const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  eventname:{type:String,required:true},
  organisedby:{type:String,required:true},
  venue:{type:String,required:true},
  startdate:{type:Date},
  enddate:{type:Date},
  starttime:{type:String},
  endtime:{type:String},
  description:[String],
  createdby:{type:String},
  image:{type:String}
}, { collection : 'events' });
 
const Events = mongoose.model('events', userSchema);
 
module.exports = Events;