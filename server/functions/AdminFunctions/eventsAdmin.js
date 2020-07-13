var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var EventsTable=require('../../model/events')
var ObjectId = mongo.Types.ObjectId;

var createEvent=async function(data,imagepath){
    var newobj={
        eventname: data.eventname,
        organisedby: data.organisedby,
        startdate: data.startdate,
        enddate: data.enddate,
        starttime: data.starttime,
        endtime:data.enddate,
        venue: data.venue,
        subtext: data.subtext,
        description:[data.para1,data.para2,data.para3,data.para4],
        image:imagepath
      }
      var event=new EventsTable(newobj);
     await event.save()
}

var getAllEvents=async function(callBack){
       await EventsTable.find({}).then(data=>{
             return callBack(data)
         })
}

var updateEvent=async function(data){
  
    var newobj={
        eventname: data.eventname,
        organisedby: data.organisedby,
        startdate: data.startdate,
        enddate: data.enddate,
        starttime: data.starttime,
        endtime:data.enddate,
        venue: data.venue,
        subtext: data.subtext,
        description:[data.para1,data.para2,data.para3,data.para4],
      }
     await EventsTable.updateOne({_id:Object(data.id)},{$set:newobj})
}

var deleteEvent=async function(data)
{
   await EventsTable.remove({_id:Object(data.id)})
    
}
module.exports = {
   createEvent:createEvent,
   getAllEvents:getAllEvents,
   updateEvent:updateEvent,
   deleteEvent:deleteEvent
 }