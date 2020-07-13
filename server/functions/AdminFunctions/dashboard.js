var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var UsersTable=require('../../model/alumni')
var ObjectId = mongo.Types.ObjectId;


var AllAlumni= async function(callBack){

 await UsersTable.aggregate([
   {
     
       $project: {
         password:0,
       }
     },
     {
     $lookup:{
       from:'testmonials',
       localField:"_id" ,
       foreignField: 'userId',
       as: 'testmonialdata'
     }
   }
 ]).then(data=>{
              return callBack(data)
 })
}

 module.exports = {
   AllAlumni:AllAlumni
}