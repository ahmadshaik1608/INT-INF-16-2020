var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var ObjectId = mongo.Types.ObjectId;
const AlumniTable=require('../../model/alumni');
const SettingsTable=require('../../model/settings');

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
var setlogos= async function(id,data,imagepath){
    var updatedata={}
    updatedata[data]=imagepath
    await SettingsTable.updateOne({_id:ObjectId(id)},updatedata);
}
var getlogos= async function(callBack){
    await SettingsTable.find({}).then(data=>{
        return callBack(data)
    })
}
module.exports={
   getAllAdmins:getAllAdmins,
   setlogos:setlogos,
   getlogos:getlogos
}