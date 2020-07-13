var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var ObjectId = mongo.Types.ObjectId;
const AlumniTable=require('../../model/alumni');

var getAllAdmins= async function(callBack){
    await AlumniTable.aggregate([
        {
          $match :{isadmin:true}
        },
        {
          $project: {
            password:0,
          }
        }     
    ]).then(admins=>{
        return callBack(admins)
    })
}

module.exports={
   getAllAdmins:getAllAdmins
}