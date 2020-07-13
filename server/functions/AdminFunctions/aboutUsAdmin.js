var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var AboutUsTable=require('../../model/aboutus')
var ObjectId = mongo.Types.ObjectId;

var getAboutUs=async function(callBack){
     await AboutUsTable.find({}).then(allMessages=>{
         return callBack(allMessages)
     })
}
var updateAboutUs=async function(data){
    newobj={
        title:data.title,
        name:data.name,
        message:[data.message1,data.message2,data.message3,data.message4],
      }
     await AboutUsTable.updateOne({_id:ObjectId(data.id)},{$set:newobj})
}
var deleteAboutUs=async function(data)
{
   await AboutUsTable.remove({_id:Object(data.id)})
    
}
var createAboutus= async function(data,imagepath){
    newobj={
        title:data.title,
        name:data.name,
        message:[data.message1,data.message2,data.message3,data.message4],
        image:imagepath
      }
       newmessage=new AboutUsTable(newobj)
    await newmessage.save()
        
}
module.exports={
    getAboutUs:getAboutUs,
    updateAboutUs:updateAboutUs,
    deleteAboutUs:deleteAboutUs,
    createAboutus:createAboutus
}