var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var AlumniTable=require('../../model/alumni')
var ChaptersTable=require('../../model/alumnichapters')
var ObjectId = mongo.Types.ObjectId;
var mongodb = require("mongodb");

var promoteDemoteUser = async function(data)
{
    // data['mId']=ObjectId(data['mId'])
    
    console.log(mongodb.ObjectID(data['mId']));
   await ChaptersTable.updateOne({_id:ObjectId(data.chapter)},{$push:{members:mongodb.ObjectID(data['mId'])}});
    // await AlumniTable.updateOne({_id:ObjectId(data.mId)},{$set:{chapter:{chapterId:ObjectId(data.chapter),membership:'M'}}})
}
module.exports={
  promoteDemoteUser:promoteDemoteUser
}