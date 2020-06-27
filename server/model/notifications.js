const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const NotificationSchema = new Schema({

  recieverid:{type:Object},
  recieverrole:{type:String},
  messages:[{
      senderid:{type:Object},
      seen:{type:Number, default:0},
      message:{type:String},
      type:{type:String},
      time:{type:Date, default: Date.now}
  }]
}, { collection : 'notifications' });
 
const Notifications= mongoose.model('Notifications', NotificationSchema);
 
module.exports = Notifications;