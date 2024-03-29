const mongoose = require('mongoose');
const { json } = require('body-parser');
const Schema = mongoose.Schema;
 
// create a schema
const SettingSchema = new Schema({
  websitelogo:{type:String},
  institutelogo:{type:String},
  socialsites:{},
  institutes:[{
    name:{type:String},
    branches:{type:Array}
  }]
}, { collection : 'settings' });
 
const Settings = mongoose.model('Settings', SettingSchema);
 
module.exports = Settings;