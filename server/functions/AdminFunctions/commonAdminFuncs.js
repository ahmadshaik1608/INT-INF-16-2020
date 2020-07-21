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
var getsettinsdata= async function(callBack){
    await SettingsTable.find({}).then(data=>{
        return callBack(data)
    })
}
var updatess=async function(data)
{
  await SettingsTable.updateOne({_id:ObjectId("5f0c1365a21d6834e8a2013c")},{socialsites:data})
}
var addInstitute=async function(data)
{
  var inst={}
  inst[data]=[]
   await SettingsTable.updateOne({_id:ObjectId("5f0c1365a21d6834e8a2013c")},{$push:{institutes:inst}})
}

module.exports={
  addInstitute:addInstitute,
   getAllAdmins:getAllAdmins,
   setlogos:setlogos,
   getlogos:getsettinsdata,
   updatess:updatess
}