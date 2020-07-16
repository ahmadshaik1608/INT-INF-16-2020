const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const SettingSchema = new Schema({
  websitelogo:{type:String},
  institutelogo:{type:String}
}, { collection : 'settings' });
 
const Settings = mongoose.model('Settings', SettingSchema);
 
module.exports = Settings;