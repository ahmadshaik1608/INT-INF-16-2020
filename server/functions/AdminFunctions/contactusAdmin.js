var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var ObjectId = mongo.Types.ObjectId;
const ContactusTable=require('../../model/contactus');

var getContactDetails = async function(callBack){
   await ContactusTable.find({}).then(data=>{
       return callBack(data)
   })
}

var updateContact = async function(data){
   await ContactusTable.updateOne({_id:ObjectId(data.id)},{$set:data})
}

module.exports={
    getContactDetails:getContactDetails,
    updateContact:updateContact
}
