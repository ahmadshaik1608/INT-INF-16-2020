const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  rollno:{type:String,required: true,unique:true},
  Name: { type: String,},
  branch: {type:String,default:'-'},
  yop : {type:Number },
  institution :{type:String},
  profilepic:{type:String},
  phone: { type: Number, },
  email: { type: String,required: true,unique:true },
  password: { type: String, },
  company: { type: String,default:'-'},
  designation: { type: String,default:'-'},
  dateofbirth: { type: Date},
  location: { type: String,default:'-'},
  associates: {type:String},
  chapter:{type:Object,default:null},
  testmonial:{type:Boolean,default:false},
  isadmin:{type:Boolean,default:false},
  approved:{type:Boolean,default:false},
  registeredon:{type:Date,default:Date.now},
  approvedon:{type:Date,default:null},
  events:[],
  jobsposted:[],
  adminon:{tye:Date}
}, { collection : 'alumni' });
 
const Alumni = mongoose.model('Aumni', userSchema);
 
module.exports = Alumni;