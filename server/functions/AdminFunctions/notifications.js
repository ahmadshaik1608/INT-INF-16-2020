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
           return callBack(data)
       })
}
module.exports={
   getNotifications:getNotifications
}