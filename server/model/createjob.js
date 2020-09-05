const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    company:{
        type:String,
    },
    role:{
        type:String
    },
    experience:{
        type:String
    },
    location:{
        type:String
     },
    batch:{
        type:Number
    },
    degree:{
        type:String
     },
     link:{
        type:String
     },
     deadline:{
         type:Date
     },
     userId:{
         type:String
     },
     createdon:{
         type:Date,default:Date.now
     }
    
})
const jobs=mongoose.model('jobstreet',userSchema);
module.exports=jobs;