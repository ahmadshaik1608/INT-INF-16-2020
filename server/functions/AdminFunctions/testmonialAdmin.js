var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var TestmonialTable=require('../../model/testmonial')
var ObjectId = mongo.Types.ObjectId;

var getTestmonials=async function(callBack)
{
await TestmonialTable.find({isvalid:'true'}).then(approved=>{
    TestmonialTable.find({isvalid:'false'}).then(unapproved=>{
      return callBack({approved,unapproved})
   })
})
}
var approveUnapprove=async function(data)
{
   await TestmonialTable.updateOne({_id:ObjectId(data.id)},{$set:{isvalid:data.isvalid}})
}
module.exports={
    getTestmonials:getTestmonials,
    approveUnapprove:approveUnapprove
}