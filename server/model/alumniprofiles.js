const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
 name:{type:String},
 year:{type:String},
 createdon:{type:Date,default:Date.now},
 description:{type:String},
 designation:{type:String},
company:{type:String},
image:{type:String},
branch:{type:String}
}, { collection : 'alumniprofiles' });
 
const AlumniProfiles = mongoose.model('almniprofiles', userSchema);
 
module.exports = AlumniProfiles;