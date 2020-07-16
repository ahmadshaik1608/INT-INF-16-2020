var mongo = require("mongoose");  
const db=require('../../config/mongoose');
var AlumniTable=require('../../model/alumni')
var ObjectId = mongo.Types.ObjectId;
var notifications=require('../AdminFunctions/notifications')

var registerUser = async function(data,callBack)
{
   var newuser=AlumniTable(data)
   newuser['profilepic']='http://localhost:3000/uploads/83fef96efcdd7dfef9837867414baf2b';
  await newuser.save()
       .then(async item =>{
           insertedId=item._id
          await notifications.InsertNotification(insertedId,'R')
        //   Notifications.find({recieverrole:"Admin_Role"},function(err,docs){
        //     if(err) throw err;
        //     else if(docs.length === 1){
             
        //      Notifications.updateOne({recieverid:req.body.recieverid},{$push :{messages:{senderid:insertedId,message:"User Registered",type:'R'}}},function(err,data){
          
        //         console.log(data);
                
        //       })
        //     }
        //     else{
        //      Notifications.insertMany({recieverid:req.body.recieverid,recieverrole:"Admin_Role",messages: {senderid:insertedId,message:"User Registered",type:'R'}})
        //     }
        //   }) 
          
            //   res.send({status: 'success',associates:associates,'regId':insertedId})
              return callBack({status: 'success',associates:'Alumni',regId:insertedId})
         })

}
module.exports={
  registerUser:registerUser
}