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
    degree:[String],
     link:{
        type:String
     },
     deadline:{
         type:Date
     },
     userId:{
         type:String
     }
    
})
const jobs=mongoose.model('jobs_data',userSchema);
module.exports=jobs;