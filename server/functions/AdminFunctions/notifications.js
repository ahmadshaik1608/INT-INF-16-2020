var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var NotificationTable=require('../../model/notifications')
var ObjectId = mongo.Types.ObjectId;

var getNotifications=async function(role,callBack){
    matchvalue={recieverrole:role}
    await NotificationTable.aggregate([
        {$match:matchvalue},
          { $unwind: '$messages'},
          {$lookup:{
            from: 'alumni',
            localField: 'messages.senderid',
            foreignField: '_id',
            as: 'messages.senderdata'
          }},
          { $sort : { "messages.time":-1} },
          {$unwind:'$messages.senderdata'},
         
          {
            $group: {
                _id: '$_id',
                root: { $mergeObjects: '$$ROOT' },
                messages: { $push: '$messages' }
            }
          },
          {
              $replaceRoot: {
                  newRoot: {
                      $mergeObjects: ['$root', '$$ROOT']
                  }
              }
          },
                     
          {
            $project:{
              root:0,
            },
        
          }
       ]).then(data=>{
        //  console.log(data);
           return callBack(data)
       })
}
var InsertNotification = async function(insertedId,type){
 await NotificationTable.find({recieverrole:"Admin_Role"},function(err,docs){
    if(err) throw err;
    else if(docs.length === 1){
     
     NotificationTable.updateOne({recieverrole:"Admin_Role"},{$push :{messages:{senderid:insertedId,message:"User Registered",type:type}}},function(err,data){
  
        console.log(data);
        
      })
    }
    else{
     NotificationTable.insertMany({recieverrole:"Admin_Role",messages: {senderid:insertedId,message:"User Registered",type:type}})
    }
  }) 
}
module.exports={
   getNotifications:getNotifications,
   InsertNotification:InsertNotification
}