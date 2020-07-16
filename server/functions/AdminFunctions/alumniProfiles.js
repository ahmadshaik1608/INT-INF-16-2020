var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var ObjectId = mongo.Types.ObjectId;
const ProfilesTable=require('../../model/alumniprofiles');
const { update } = require("../../model/alumniprofiles");

var newProfile=async function(data)
{
    var newProfile=ProfilesTable(data)
    await newProfile.save()
}
var getProfiles=async function(callBack)
{
    await ProfilesTable.aggregate([{
        $sort:{createdon:1}
    }]).then(data=>{
        return callBack(data)
    })
}

var updateProfile=async function(data)
{
    await ProfilesTable.update({_id:ObjectId(data._id)},data)
}
var deleteProfile=async function(data)
{
    await ProfilesTable.remove({_id:ObjectId(data.id)},data)
}
module.exports={
    newProfile:newProfile,
    getProfiles:getProfiles,
    updateProfile:updateProfile,
    deleteProfile:deleteProfile

}