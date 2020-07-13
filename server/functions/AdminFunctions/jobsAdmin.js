var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var JobsTable=require('../../model/createjob')
var ObjectId = mongo.Types.ObjectId;

var getjobs=async function(callBack)
{
    var jobs=[]
    await JobsTable.find({deadline:{$gte:new Date()}}).then(documents=>{
      for (let i of documents){
         jobs.push([i])
      }
       return callBack(jobs)
    })
   
}
var createJob=async function(data)
{
    var newJob= new JobsTable(data)
    await newJob.save()
}

var deleteJob =async function(data){
   await JobsTable.remove({'_id':ObjectId(data.jobid)})
}
module.exports={
   getjobs:getjobs,
   createJob:createJob,
   deleteJob:deleteJob
}