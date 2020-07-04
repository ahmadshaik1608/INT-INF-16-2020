
const express=require('express')


const mail =express.Router()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'recallfaketesting@gmail.com',
    pass: '$Test@123'
  }
});

var mailOptions = {
  from: 'recallfaketesting@gmail.com',
  to: 'recallfaketesting@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


function camail()
{
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
module.exports=camail