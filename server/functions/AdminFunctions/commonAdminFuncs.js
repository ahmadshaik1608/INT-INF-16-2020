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
  await SettingsTable.updateOne({_id:ObjectId(id)},{socialsites:data})
}
var addInstitute=async function(data)
{
  console.log(data);
   await SettingsTable.updateOne({_id:ObjectId(data.id)},{$push:{institutes:{name:data.name,branches:[]}}})
}
var removeInstitute=async function(data)
{
  console.log(data);
    await SettingsTable.updateOne({_id:ObjectId(data.id)},{$pull:{"institutes":{_id:ObjectId(data.instid)}}})
  // await SettingsTable.find({_id:ObjectId(data.id)}).then(data=>{
  //   console.log(data);
  // })
}
var addBranch = async function(data)
{
  await SettingsTable.updateOne({_id:ObjectId(data.id),'institutes.name':data.inst},{$push:{'institutes.$.branches':data.branch}})
}
var removeBranch=async function(data)
{
  await SettingsTable.updateOne({_id:ObjectId(data.id),'institutes.name':data.inst},{$pull:{'institutes.$.branches':data.branch}})
}
module.exports={
  addInstitute:addInstitute,
   getAllAdmins:getAllAdmins,
   setlogos:setlogos,
   getlogos:getsettinsdata,
   updatess:updatess,
   addBranch:addBranch,
   removeBranch:removeBranch,
   removeInstitute:removeInstitute
}