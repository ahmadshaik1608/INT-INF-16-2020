var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var HofTable=require('../../model/halloffame')
var ObjectId = mongo.Types.ObjectId;

var gethallofFame = async function(callBack){
   await HofTable.find({}).sort({hofyear:-1}).then(data=>{
        return callBack(data)
    })
}
var posthof = async function(data){
    var newhof=new HofTable(data);
   await newhof.save()
}
var deletehof =async function(data){
   await HofTable.deleteOne({_id:ObjectId(data.id)})
}
module.exports={
  gethallofFame:gethallofFame,
  posthof:posthof,
  deletehof:deletehof
};