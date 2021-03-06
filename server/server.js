var express = require('express');  
const cors = require('cors')
var path = require("path");   
var bodyParser = require('body-parser');  
var nodemailer = require('nodemailer');
var bluebird=require('bluebird')

var mongo = require("mongoose");  
const db=require('./config/mongoose');
const image=require('./model/gallery-schema');
const multer  = require('multer')
const Alumni=require('./model/alumni');
const Student=require('./model/student');
const Faculty=require('./model/faculty');
const Employee=require('./model/empoyee');
const Userreg=require('./model/allusers');
const About=require('./model/aboutus')
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Testmonial=require('./model/testmonial')
const Events=require('./model/events')
const Job= require('./model/createjob')
const contact = require('./model/contactus')
const gallery=require('./routes/gallery')
const mail=require('./routes/mail')
const halloffame=require('./model/halloffame')
const Chapters=require('./model/alumnichapters')
const Notifications=require('./model/notifications')
const Comments=require('./model/comments')
const chapterEvent=require('./model/chapterEvents')
var nodemailer = require('nodemailer');
const { allowedNodeEnvironmentFlags } = require('process');
const ChapterEvents = require('./model/chapterEvents');
const ResetPassword=require('./model/resetpass')

var chapterFunctions=require('./functions/AdminFunctions/chaptersFile');
var dashboardAdmin=require('./functions/AdminFunctions/dashboard');
var eventsAdmin=require('./functions/AdminFunctions/eventsAdmin');
var aboutusAdmin=require('./functions/AdminFunctions/aboutUsAdmin');
var testmonialAdmin=require('./functions/AdminFunctions/testmonialAdmin');
var jobsAdmin=require('./functions/AdminFunctions/jobsAdmin');
var hofAdmin=require('./functions/AdminFunctions/halloffameAdmin');
var notificationfunction=require('./functions/AdminFunctions/notifications');
var contactusAdmin = require('./functions/AdminFunctions/contactusAdmin');
var commonAdminFunctions = require('./functions/AdminFunctions/commonAdminFuncs');
const commonAdminFuncs = require('./functions/AdminFunctions/commonAdminFuncs');
const alumniProfilesAdmins = require('./functions/AdminFunctions/alumniProfiles');

var registerLoginAlumni=require('./functions/AlumniFunctions/registerLogin'); 
var alumniChapters=require('./functions/AlumniFunctions/almniChapters')

var cloud = require('./config/cloudaryconfig');
const almniChapters = require('./functions/AlumniFunctions/almniChapters');
const resetPassword = require('./model/resetpass');
var ObjectId = mongo.Types.ObjectId;
const today = new Date()
const tomorrow = new Date(today)
const month=new Date()
const nextmont=new Date()
const monththree= new Date()
month.setDate(today.getMonth()+1)
nextmont.setDate(today.getMonth()+2)
monththree.setDate(today.getMonth()+3)
months=[today.getMonth()+1,today.getMonth()+2,today.getMonth()+3,today.getMonth()+4,today.getMonth()+5]
tomorrow.setDate(tomorrow.getDate() + 1)

   
var app = express()  
app.use(bodyParser());  
// app.use(bodyParser.json());   
// app.use("/uploads",express.static(path.join("./uploads")))
app.use("/uploads",express.static("./uploads"))
app.use(cors())
// const User = require('./model/user');

// app.use("/uploads",express.static(path.join("gallery/server/uploads")))
//app.use(auth, express.static(__dirname + '/uploads'));
app.use('/gallery',gallery)

  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  

 const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
 };

 const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
      console.log("storage: ",req.body[0]);
      const isvalid=MIME_TYPE_MAP[file.mimetype];
      let error=new Error('INvalid')
      if(isvalid){
         error=null;
      }
       cb(error,dest);
    },
    filename: (req, file, cb) =>{
      const name=file.originalname.toLowerCase().split(' ').join('-');
      const ext =MIME_TYPE_MAP[file.mimetype];
      cb(null,name+'-'+Date.now()+'.'+ext)
    }
  });



  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'recallfaketesting@gmail.com',
      pass: '$Test@123'
    }
  });
  
 



app.post('/api/userdata',async(req,res)=>{
  Alumni.find({
   _id:ObjectId(req.body.id)
}, async function(err, user){
    if(err) throw err;
    if(user.length === 1){  
      // console.log(user[0]['associates'])
      var coll = db.collection(user[0]['associates'].toLowerCase());
      var arr = [];
      coll.find({ _id: ObjectId(user[0]['_id'])}).toArray(function (err, docs) {
        if (err) throw err;
        console.log("monts->",month,nextmont,monththree);
        db.collection("alumni").find({
          "$expr": { 
              "$and": [
                   { "$eq": [ { "$dayOfMonth": "$dateofbirth" }, { "$dayOfMonth": new Date() } ] },
                   { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : new Date() } ] }
              ]
           }
       }).toArray(function (err, bdaysToday) {
        if (err) throw err;
        db.collection("alumni").find({
          "$expr": { 
              "$and": [
                   { "$eq": [ { "$dayOfMonth": "$dateofbirth" }, { "$dayOfMonth": tomorrow } ] },
                   { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : new Date() } ] }
              ]
           }
       }).toArray(function (err, bdaysTommorow) {
        if (err) throw err;
        db.collection("alumni").find({
          "$expr": { 
              "$and": [
                   { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : month } ] }
              ]
           }
       }).toArray(async function (err, bdaysmonth1) {
  
        if (err) throw err;
        if(user[0]['isadmin']){
          notification=[]
          await notificationfunction.getNotifications('Admin_Role',function(notif){
            matchVale={'seen':0}
            db.collection("comments").aggregate([
                            {$match :matchVale},
                            { $sort : { "time":-1} },
                          ]).toArray(function(err,comentsData){
              //               // console.log(comentsData);
                            
            res.send({
                      status: 'success',
                      isAdmin:user[0]['isadmin'],
                      message: docs,
                    Todaybdays:bdaysToday,
                    Tommorwbdays:bdaysTommorow,
                    thismonth:bdaysmonth1,
                    notifications:notif,
                    comments:comentsData
                  })
                })
          })

      }
      if(!user[0]['isadmin']){
        db.collection('notifications').find({recieverid:user[0]['_id'].toString()}).toArray(function(err,notif){
                 console.log(notif);
          if(err) throw err

          res.send({
            status: 'success',
            isAdmin:user[0]['isadmin'],
            message: docs,
          Todaybdays:bdaysToday,
          Tommorwbdays:bdaysTommorow,
          thismonth:bdaysmonth1,
          notifications:notif
        })

        })
      }
    })
        
         })
       })
        
      })
    } else {
        return res.send({
            status: 'fail',
            message: 'Login Failed'
        })
    }
     
})
})
app.post('/api/loginUser', (req, res) => {
      Alumni.find({
        email : req.body.username, password : req.body.password
    }, function(err, user){
        if(err) throw err;
        if(user.length === 1){  
          // console.log(user[0]['associates'])
          var coll = db.collection(user[0]['associates'].toLowerCase());
          var arr = [];
          coll.find({ _id: ObjectId(user[0]['_id'])}).toArray(function (err, docs) {
            if (err) throw err;
            db.collection("alumni").find({
              "$expr": { 
                  "$and": [
                       { "$eq": [ { "$dayOfMonth": "$dateofbirth" }, { "$dayOfMonth": new Date() } ] },
                       { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : new Date() } ] }
                  ]
               }
           }).toArray(function (err, bdaysToday) {
            if (err) throw err;
            db.collection("alumni").find({
              "$expr": { 
                  "$and": [
                       { "$eq": [ { "$dayOfMonth": "$dateofbirth" }, { "$dayOfMonth": tomorrow } ] },
                       { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : new Date() } ] }
                  ]
               }
           }).toArray(function (err, bdaysTommorow) {
            if (err) throw err;
            db.collection("alumni").find({
              "$expr": { 
                  "$and": [
                       { "$eq": [ { "$month"     : "$dateofbirth" }, { "$month"     : month } ] }
                  ]
               }
           }).toArray(async function (err, bdaysmonth1) {
            if (err) throw err;
            if(user[0]['isadmin']){
              var comments=[]
              await notificationfunction.getNotifications('Admin_Role',function(notif){
                db.collection("comments").aggregate([
                                { $sort : { "time":-1} },
                              ]).toArray(function(err,comentsData){
                  //               // console.log(comentsData);
                                
                res.send({
                          status: 'success',
                          isAdmin:user[0]['isadmin'],
                          message: docs,
                        Todaybdays:bdaysToday,
                        Tommorwbdays:bdaysTommorow,
                        thismonth:bdaysmonth1,
                        notifications:notif,
                        comments:comentsData
                      })
                    })
              })
          }
          if(!user[0]['isadmin']){
           
            db.collection('notifications').find({recieverid:user[0]['_id'].toString()}).toArray(function(err,notif){
               
                    
              if(err) throw err
    
              res.send({
                status: 'success',
                isAdmin:user[0]['isadmin'],
                message: docs,
              Todaybdays:bdaysToday,
              Tommorwbdays:bdaysTommorow,
              thismonth:bdaysmonth1,
              notifications:notif
            })
    
            })
          }
        })
            
             })
           })
            
          })
        } else {
            return res.send({
                status: 'fail',
                message: 'Login Failed'
            })
        }
         
    })
  });





app.post('/api/registerUser', async (req, res) => {
  var associates=req.body.associates;
  var insertedId
  const url=req.protocol+'://'+req.get("host")
  req.body.rollno=req.body.rollno.toLowerCase()
  await registerLoginAlumni.registerUser(req.body,url,function(data){
    console.log(data);
    res.send(data)

  }).catch(err => {
    console.log(err);
     res.send({
       status: 'fail',
       'message':"Email already exist"
     });
});

    
})

app.post('api/emailUpdate', async (req, res) => {
  Alumni.find({email:req.body.email},function(err,docs){
    if(docs.length>0)
    {
        res.send({status:'error'})
    }
    else
    {
      res.send({status:'success'})
    }
  })
})
// -----------------------------------------ADMIN FUNCTINALITY STARTS--------------------------------------------------

// --------------------------------------Dashboard AllUsers Data-----------------------------------------------------
app.post('/api/getusers',async(req,res)=>{
  console.log("djfdjfhjhdfjh");
   Alldata=await dashboardAdmin.AllAlumni(function(alumniData){
     res.send(alumniData)
   })
  
})

// ---------------------------------------CHAPTERS FUNCTIONS----------------------------------------------


app.get('/api/chaptersdata',(req,res)=>{

  chdata=chapterFunctions.chapterData(function(result)
  {
   res.send({
     chapters:result
   })
  })

})

app.post('/api/createchapter',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
 create=await chapterFunctions.createChapter(req.body,imagepath)
chdata=chapterFunctions.chapterData(function(result)
{
res.send({
  chaptersData:result,
  status:'ok'
})
})

})

app.post('/api/deleteChapter',async(req,res)=>{

await chapterFunctions.deleteChapter(req.body.id)
chdata=chapterFunctions.chapterData(function(result)
{
res.send({
  chaptersData:result,
  status:'ok'
})
})

})

app.post('/api/updateChapter',async(req,res)=>{
var data=req.body.data
await chapterFunctions.updateChapterData(req.body.id,data)
chdata=chapterFunctions.chapterData(function(result)
{
res.send({
  chaptersData:result,
  status:'ok'
})
})

})

app.post('/api/updateChapterImage',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
await chapterFunctions.updateChapterImage(req.body.id,imagepath)
chdata=chapterFunctions.chapterData(function(result)
{
res.send({
  chaptersData:result,
  status:'ok'
})
})
})

app.post('/api/promotedemote',(req,res)=>{
console.log(req.body);
var membership
var userId
if(req.body.type=='P'){
req.body.demote.members=ObjectId(req.body.demote.members)
req.body.promote.coordinators=ObjectId(req.body.promote.coordinators)
membership='C'
userId= req.body.promote.coordinators
}
else{
 req.body.demote.coordinators=ObjectId(req.body.demote.coordinators)
 req.body.promote.members=ObjectId(req.body.promote.members)
 membership='M'
 userId= req.body.demote.coordinators
}
db.collection('chapters').findOneAndUpdate({_id:ObjectId(req.body.id)},{$pull:req.body.demote},function(err,data){
 db.collection('chapters').findOneAndUpdate({_id:ObjectId(req.body.id)},{$push:req.body.promote},function(err,data){
 })
 db.collection('alumni').findOneAndUpdate({_id:userId},{$set:{chapter:{membership:membership,chapterId:ObjectId(req.body.id)}}},function(err,data){
 })
 res.send
 ({
   // status:'ok'
 })  
})
})

// -------------------------------------------------GET EVENTS---------------------------------------------------------

app.get('/api/getevents',(req,res)=>{
  eventsAdmin.getAllEvents(function(allEvents){
      res.send(allEvents)
  })
  // Events.find({},function(err,docs){
  //   res.send(docs)
  // })
})

// -------------------------------------------------CREATE EVENTS---------------------------------------------------------

app.post('/api/createevent',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
 await eventsAdmin.createEvent(req.body,imagepath)
 await eventsAdmin.getAllEvents(function(allEvents){
  res.send({
    status:'ok',
    Events:allEvents
  })
})
})
 
// -------------------------------------------------UPDATE EVENTS--------------------------------------------------------- 
  
app.post('/api/updateevent',async(req,res)=>{
   await eventsAdmin.updateEvent(req.body)
  await  eventsAdmin.getAllEvents(function(allEvents){
    res.send({
      status:'ok',
      Events:allEvents
    })
  })
})
// -------------------------------------------------DELETE EVENTS---------------------------------------------------------
app.post('/api/deleteevents',async(req,res)=>{
 await eventsAdmin.deleteEvent(req.body)
 await  eventsAdmin.getAllEvents(function(allEvents){
  res.send({
    status:'ok',
    Events:allEvents
  })
})
})
// -------------------------------------------------GET ABOUT US---------------------------------------------------------
app.get('/api/aboutus',async(req,res)=>
{

  await aboutusAdmin.getAboutUs(function(allData){
    res.send({messages:allData})
  })
 
})
// -------------------------------------------------UPDATE ABOUT US---------------------------------------------------------
app.post('/api/updateaboutus',async(req,res)=>{
await aboutusAdmin.updateAboutUs(req.body)
await aboutusAdmin.getAboutUs(function(allData){
  res.send(
    {
      status:'ok',messages:allData})
})
})
// -------------------------------------------------DELETE ABOUT US---------------------------------------------------------
app.post('/api/deleteaboutus',async(req,res)=>{
 await aboutusAdmin.deleteAboutUs(req.body)
 await aboutusAdmin.getAboutUs(function(allData){
  res.send(
    {
      status:'ok',messages:allData})
})
})
// -------------------------------------------------NEW ABOUT US---------------------------------------------------------
app.post('/api/newaboutus',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })

  await aboutusAdmin.createAboutus(req.body,imagepath)
  await aboutusAdmin.getAboutUs(function(allData){
    res.send(
      {
        status:'ok',messages:allData})
  })
})
// -------------------------------------------------GET ALL TESTMONIALS---------------------------------------------------------
app.get('/api/getalltestmonials',async(req,res)=>{
  var testmonialarray=[]
  await testmonialAdmin.getTestmonials(function(allData){
    res.send({
      approved:allData.approved,
      unapproved:allData.unapproved
    })
  })
 
})

// -------------------------------------------------APPROVE UNAPROVE TESTMONIAL---------------------------------------------------------
app.post('/api/approveunapprove',async(req,res)=>{
 
  await testmonialAdmin.approveUnapprove(req.body)
  await testmonialAdmin.getTestmonials(function(allData){
    res.send({
      approved:allData.approved,
      unapproved:allData.unapproved
    })
  }) 
})
// -------------------------------------------------GET OSTED JOBS---------------------------------------------------------
app.get('/api/getjobs',(req,res)=>{
  jobsAdmin.getjobs(function(jobs){
    res.send({alljobs:jobs})
  })
})
// -------------------------------------------------POST NEW JOB---------------------------------------------------------
app.post('/api/postjob',async(req,res)=>{
  await jobsAdmin.createJob(req.body)
  jobsAdmin.getjobs(function(jobs){
    res.send({sataus:'ok',alljobs:jobs})
  })
})
// -------------------------------------------------DELETE JOB---------------------------------------------------------
app.post('/api/deletejob',async(req,res)=>{
console.log(req.body);
 await jobsAdmin.deleteJob(req.body)
 await jobsAdmin.getjobs(function(jobs){
   res.send({sataus:'ok',alljobs:jobs})
 })

})
// -------------------------------------------------POST HALL OF FAME---------------------------------------------------------
app.post('/api/posthof',async(req,res)=>{
  await hofAdmin.posthof(req.body)
  await hofAdmin.gethallofFame(function(allData){
    res.send({
      alumni:allData,
      status:'ok'
    })
  })
})
// -------------------------------------------------GET HALL OF FAME--------------------------------------------------------
app.get('/api/gethof',async(req,res)=>{
  await hofAdmin.gethallofFame(function(allData){
    res.send({
      alumni:allData
    })
  })
})
// -------------------------------------------------DELETE HALL OF FAME---------------------------------------------------------
app.post('/api/deletehof',async(req,res)=>{
  console.log(req.body);
  await hofAdmin.deletehof(req.body)
  await hofAdmin.gethallofFame(function(allData){
    res.send({
      alumni:allData
    })
  })
})
// -------------------------------------------------GET CONTACT US---------------------------------------------------------
app.get('/api/contactus',async(req,res)=>{
  await contactusAdmin.getContactDetails(function(data){
    res.send(
      {
        details:data
      })
  })
 })
 // -------------------------------------------------UPDATE CONTACT US---------------------------------------------------------
 app.post('/api/updatecontact',async(req,res)=>{
   console.log(req.body);
   await contactusAdmin.updateContact(req.body);
   await contactusAdmin.getContactDetails(function(data){
    res.send(
      {
        details:data
      })
  })
  })

// -------------------------------------------------SEND REPLY TO COMMENT---------------------------------------------------------  
app.post("/api/sendCommentReply",(req,res)=>{
  console.log(req.body);
     var mailOptions = {
          from: 'recallfaketesting@gmail.com',
          to: [req.body.email],
          subject: 'RE: Recall | Response to your comment : '+req.body.comment,
          html:'<div style="background-color: #f8f9fa;padding: 10px;"><div style="width:60%;background-color: white;padding: 10px;margin:0 auto;"><h1>Hi '+req.body.name+',</h1><p>First of all, we would like to express our thanks for your interest towards Vidyanikethan<br></p><p><strong>Response: </strong>'+req.body.message+'</p><p>We hope our response has satisfied your request. Should there be any questions, please feel free to contact us. We look forward to hearing from you.</p><p>Thanks, <br> The Recall Team</p></div>',
       
        };
      
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
           Comments.updateOne({_id:ObjectId(req.body.cId)},{$set:{answered:true,replymessage:req.body.message}},function(err,data){
             console.log(data);
             
           })
            res.send({status:'ok'})
       });
})

// -------------------------------------------------GET ALL ADMINS---------------------------------------------------------  
app.get('/api/getAdmins',async(req,res)=>{
  await commonAdminFuncs.getAllAdmins(function(admins){
    res.send(admins)
  })
})

// -------------------------------------------------MAKE AS ADMIN---------------------------------------------------------  
app.post('/api/makeAdmin',async(req,res)=>{
  console.log(req.body)
  await db.collection('alumni').findOneAndUpdate({_id:ObjectId(req.body._id)},{$set:{isadmin:true , adminon:today}},{new:true},(error,docs)=>{
        console.log(docs); 
  })
  await commonAdminFuncs.getAllAdmins(function(admins){
    res.send(admins)
  })

})
// -------------------------------------------------DELETE ADMIN---------------------------------------------------------  
app.post('/api/deleteAdmin',async(req,res)=>{
  console.log(req.body)
  await db.collection('alumni').findOneAndUpdate({_id:ObjectId(req.body._id)},{$set:{isadmin:false , adminon:null}},{new:true},(error,docs)=>{})
  await commonAdminFuncs.getAllAdmins(function(admins){
    res.send(admins)
  })

})
// -------------------------------------------------UPDATE ADMIN DETAILS---------------------------------------------------------  
app.post('/api/updateAdmin',(req,res)=>{
  updateDetais={}
  console.log(req.body)
  if(req.body.Name) updateDetais.Name=req.body.Name
  if(req.body.email) updateDetais.email=req.body.email
  if(req.body.password) updateDetais.password=req.body.password
 
  db.collection('alumni').findOneAndUpdate({_id:ObjectId(req.body.id)},{$set:updateDetais},{new:true},(error,docs)=>{
   res.send({
     status:'ok'
   })
})
})
// -------------------------------------------------ADMIN GET ALUMNI PROFILES---------------------------------------------------------

app.get('/api/getprofiles', async (req,res)=>{
  await alumniProfilesAdmins.getProfiles(function(data){
    console.log(data);
    res.send(data)
  })
})
// -------------------------------------------------ADMIN UPDATE ALUMNI PROFILES---------------------------------------------------------
app.post('/api/updateprofile',async(req,res)=>{

  await alumniProfilesAdmins.updateProfile(req.body)
  await alumniProfilesAdmins.getProfiles(function(data){
    res.send(
      {
        status:'ok',
        docs:data
      }
    )
})
})
// -------------------------------------------------ADMIN DELETE ALUMNI PROFILES---------------------------------------------------------
app.post('/api/deleteprofile',async(req,res)=>{
  console.log(req.body);
  await alumniProfilesAdmins.deleteProfile(req.body)
  await alumniProfilesAdmins.getProfiles(function(data){
    res.send(
      {
        status:'ok',
        docs:data
      }
    )
})
})
// -------------------------------------------------ADMIN ADD ALUMNI PROFILES---------------------------------------------------------

app.post('/api/createprofile',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const url=req.protocol+'://'+req.get("host")
  imagepath=url+"/uploads/"+req.file.filename
  req.body['image']=imagepath
  console.log(req.body);
  await alumniProfilesAdmins.newProfile(req.body)
  await alumniProfilesAdmins.getProfiles(function(data){
    res.send(
      {
        status:'ok',
        docs:data
      }
    )
  })
})

// -------------------------------------------------ADMIN UPDATE SOCIAL SITES---------------------------------------------------------

app.post('/api/updatesocialsites',async(req,res)=>{
  console.log(req.body);
  commonAdminFunctions.updatess(req.body)
  res.send({
    status:'ok'
  })
})
// -------------------------------------------------ADMIN ADD INSTITUTES---------------------------------------------------------
app.post('/api/addinstitute',async(req,res)=>{
  await commonAdminFunctions.addInstitute(req.body)
  await commonAdminFunctions.getlogos(function(logodata){
    res.send({
      status:'ok',
      settings:logodata
    })
  })
})
// -------------------------------------------------ADMIN REMOVE INSTITUTE---------------------------------------------------------

app.post('/api/removeinstitute',async(req,res)=>{
  // console.log(req.body);
  await commonAdminFunctions.removeInstitute(req.body)
  await commonAdminFunctions.getlogos(function(logodata){
    res.send({
      status:'ok',
      settings:logodata
    })
  })
})
// -------------------------------------------------ADMIN Add BRANCH---------------------------------------------------------

app.post('/api/addbranch',async(req,res)=>{
  console.log(req.body);
  await commonAdminFunctions.addBranch(req.body)
  await commonAdminFunctions.getlogos(function(logodata){
    res.send({
      status:'ok',
      settings:logodata
    })
  })
})
// -------------------------------------------------ADMIN REMOVE BRANCH---------------------------------------------------------

app.post('/api/removebranch',async(req,res)=>{
  console.log(req.body);
 await commonAdminFunctions.removeBranch(req.body)
  await commonAdminFunctions.getlogos(function(logodata){
    res.send({
      status:'ok',
      settings:logodata
    })
  })
})

// -------------------------------------------------ADMIN FUNCTIONALITY ENDS---------------------------------------------------------

app.post('/api/updateuser',(req,res)=>
{
   var newuser={}

  var keys = Object.keys(req.body);
  for(var i=0; i<keys.length; i++){
      var key = keys[i];
     if(key!='_id')
                        {
                          newuser[key]=req.body[key]
                        }
  }
  console.log(newuser);
  db.collection("alumni").updateOne({_id:ObjectId(req.body['_id'])},{$set:newuser},function(err){
    if(err){
      res.send({
        status: 'error'
      })
    }
    else{
      db.collection("alumni").find({ _id: ObjectId(req.body['_id'])}).toArray(function (err, docs) {
        if (err) {
          res.send({
            status: 'error'
          })
        };
       

       return  res.send({
          status: 'success',
          message: docs})
      })
    }
  })
})


app.post('/api/upoadprofile',multer({dest:'./uploads'}).single('file'), async(req,res,next)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
   console.log(req.body.id);
   db.collection("alumni").updateOne({_id:ObjectId(req.body.id)},{$set:{profilepic:imagepath}},function(err){
    if(err) throw err;
    else{
      db.collection("alumni").find({ _id: ObjectId(req.body.id)}).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);

       return  res.send({
          status: 'success',
          message: docs})
      })
    }
   
  })
})

app.post('/file',multer({dest:'./uploads'}).single('file'), async(req,res,next)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
    // console.log(imagepath);
    // console.log(req.body.id)
    image.updateOne({_id:req.body.id},{$push:{photopath:imagepath}},(err,result)=>{
        if(err){ return res.send(err)}
        else{
            console.log(result)
        return res.send({imagepath:imagepath})
        }
    })
})
app.get('/getfiles',(req,res,nest)=>{
   var a=[]
   image.find().then(documents=>{
     console.log(documents[0].avatar)
     for (let i of documents){
        a.push([i.avatar])
     }
     console.log(a)
      res.send({value:a})
   })
})

app.post('/api/searchalumni',(req,res)=>{
    console.log(req.body);
    
    if(Object.keys(req.body)[0]=='yop'){
      req.body['yop']=parseInt( req.body['yop'])
    }
    if(Object.keys(req.body)[0]=='_id'){
      req.body['_id']=ObjectId(req.body['_id'])
    }
   matchvalue=req.body
    db.collection('alumni').aggregate([
      {
        $match :matchvalue
      },
      {
        $project: {
          password:0,
        }
      }     
  ]).toArray(function (err, docs) {
    if (err)    throw err;
    res.send(docs)
  })
  })

app.post('/api/testmonial',(req,res)=>{
  console.log(req.body);
  
  Testmonial.find({
    userId:ObjectId(req.body.userId)
  },function(err,user){
    if(err) throw err;
    else{   
    //   console.log("sdnjfdnjndv");
    //  console.log(user.length);
      if(user.length === 1)
     {
    
      db.collection('testmonials').updateOne({userId:ObjectId(req.body.userId)},{$set:{testmonial:req.body.testmonial}},function(err){
        Notifications.updateOne({recieverrole:"Admin_Role"},{$push :{messages:{senderid:ObjectId(req.body.userId),message:"New Testmonial",type:'T'}}},function(err,data){
          console.log(err);
            
          
        })
        if (err) throw err;
        res.send({status:true})
       })
      
      
    }
    else{
      console.log("else");
      var testmonial=new Testmonial(req.body)
      console.log(testmonial);   
      testmonial.save().then(item=>{
        Notifications.updateOne({recieverrole:"Admin_Role"},{$push :{messages:{senderid:ObjectId(req.body.userId),message:"New Testmonial",type:'T'}}},function(err,data){
          console.log(err);
            
          
        })
       db.collection('alumni').updateOne({_id:ObjectId(req.body.userId)},{$set:{testmonial:true}},function(err){
        if (err) throw err;
        res.send({status:true})
       })
      })
    }
    }
  })

})

app.post('/api/gettestmonial',(req,res)=>{

  console.log(req.body);
  
   db.collection('testmonials').find({userId:ObjectId(req.body.userId)}).toArray(function(err,docs){
    if (err) throw err;
    res.send(docs)
   })
})

app.post('/api/deletetestmonial',(req,res)=>{
  db.collection('testmonials').deleteOne({userId:ObjectId(req.body.userId)},function(err,docs){
    if (err) throw err;
    db.collection('alumni').updateOne({_id:ObjectId(req.body.userId)},{$set:{testmonial:false}},function(err){
      if (err) throw err;
      res.send({status:true})
     })
   })
})


app.post('/api/approveunapproveuser',async(req,res)=>{
  console.log(req.body);
  
  var date=today
  Alumni.updateMany({_id:ObjectId(req.body.id)},{$set:{approved:req.body.approved,approvedon:today}},{upsert: true},async function(err){
    if(err) throw err 
    await Notifications.find({recieverid:ObjectId(req.body.id)},async function(err,docs){
      if(err) throw err;
      else if(docs.length === 1){
       
       await Notifications.updateOne({recieverid:ObjectId(req.body.id)},{$push :{messages:{senderid:ObjectId(req.body.senderid),message:req.body.message,type:req.body.type}}},function(err,data){
    
          console.log(data);
          
        })
      }
      else{
       await Notifications.insertMany({recieverid:ObjectId(req.body.id),recieverrole:"Alumni_User",messages: {senderid:ObjectId(req.body.senderid),message:req.body.message,type:req.body.type}})
      }
    }) 
    await db.collection('alumni').find().toArray(function (err2, docs) {
      if (err) throw err;
      res.send(docs)
    })
  })
  
})




app.post('/api/registerEvent',(req,res)=>{
  console.log(req.body);
  
 Events.updateOne({_id:ObjectId(req.body.edata.id)},{ $push: {registeredmembers: req.body.uid } },function(err,docs){
  if(err){
    res.send({status:'failed'})
  }
  else{
    Alumni.updateOne({_id:ObjectId(req.body.uid)},{$push:{events:req.body.edata}},function(err,docs){
      res.send({status:'succes'})
    })
  }
 })
})


app.post('/api/getregisteredevent',(req,res)=>{
  console.log(req.body);
  db.collection('events').find({ _id: {$in : req.body.ids.map(function(id){ return ObjectId(id.id); })}},{image:0}).toArray(function(err,docs){
   res.send({events:docs})
    
  })
})

var  options = { upsert: true, new: true, setDefaultsOnInsert: true };
app.post('/api/notification',(req,res)=>{
  console.log(req.body);
  Notifications.find({recieverid:req.body.recieverid},function(err,docs){
    if(err) throw err;
    else if(docs.length === 1){
     
     Notifications.updateOne({recieverid:req.body.recieverid},{$push :{messages:{senderid:ObjectId(req.body.senderid),message:req.body.message,type:req.body.type}}},function(err,data){
  
        console.log(data);
        
      })
    }
    else{
     Notifications.insertMany({recieverid:req.body.recieverid,recieverrole:"Alumni_User",messages: {senderid:ObjectId(req.body.senderid),message:req.body.message,type:req.body.type}})
    }
  }) 
})
app.post('/api/selectuser',(req,res)=>{
   console.log(req.body);
  db.collection('alumni').aggregate([
    { 
      $match : {Name:new RegExp(req.body.searchkey , 'i')}
    } ,
    {
      
        $project: {
          email:1,
          Name:1,
          _id:1,
          profilepic:1
        }
      }     
  ]).toArray(function (err, docs) {
    if (err)    throw err;
    res.send(docs)    
  })
   
})

app.post('/api/sendMail',(req,res)=>{
  tomails=[]
    if(req.body.type=='individual')
    {
    for(var each of req.body.group)
    {
      tomails.push(each.email);
    }
    console.log(tomails);
    tomails=['recallfaketesting@gmail.com','recallfaketesting@gmail.com']  
    var mailOptions = {
      from: 'recallfaketesting@gmail.com',
      to: [tomails],
      subject: req.body.subject,
      text: req.body.message
    };
  
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
        res.send({status:'ok'})
   });
    }
    else{
      if(req.body.type=='all')
      {
        db.collection('alumni').aggregate([
          {
            $match :{}
          },
          {
            $project: {
              email:1,
              _id:0
            }
          }     
      ]).toArray(function (err, docs) {
        if (err)    throw err;
        console.log(docs.length);
        
      })
      }
      else{
        var matchvalue={}
        if(req.body.type=='yop') req.body.group[0]=parseInt(req.body.group[0])
        matchvalue[req.body.type]=req.body.group[0]
        db.collection('alumni').aggregate([
          {
            $match :matchvalue
          },
          {
            $project: {
              email:1,
              _id:0
            }
          }     
      ]).toArray(function (err, docs) {
        if (err)    throw err;
        console.log(docs);
        tomails=['recallfaketesting@gmail.com','recallfaketesting@gmail.com']
        // for(each of docs)
        // {
        //   tomails.push(each.email)
        // }
        console.log(tomails);
        var mailOptions = {
          from: 'recallfaketesting@gmail.com',
          to: [tomails],
          subject: req.body.subject,
          text: req.body.message
        };
      
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
            res.send({status:'ok'})
       });
      })
      }
    }
    
})



app.post('/api/deleteNotifications',async(req,res)=>{
  if(req.body.role=='Admin_Role')
 {
   await Notifications.update({recieverrole:'Admin_Role'},{$pull:{messages:{_id:ObjectId(req.body.id)}}},function(err,data) {
    console.log(data);
    
  })

  await notificationfunction.getNotifications('Admin_Role',function(notif){
    console.log(notif);
    res.send({data:notif})
  })
  }
  else{
  // console.log(req.body);
    await Notifications.update({recieverid:req.body.uid},{$pull:{messages:{_id:ObjectId(req.body.mId)}}},function(err,data) {
      console.log(data); 
    })
    await Notifications.find({recieverid:req.body.uid}).then(data=>{
      console.log(data);
      res.send({data:data})
    })
  }
})



app.post("/api/postComment",(req,res)=>{
  console.log(req.body);
  Comments.insertMany(req.body)
  res.send({
    status:'ok'
  })
  
})

app.get("/api/getComment",(req,res)=>{

  Comments.updateMany({},{$set:{seen:1}}).then(data=>{})
  db.collection("comments").aggregate([
    { $sort : { "time":-1} },
  ]).toArray(function(err,commentsData){
    res.send({
      comments:commentsData
    })
  })
  
})

app.post('/api/joinChapter',async(req,res)=>{
  await db.collection('chapters').updateOne({_id:ObjectId(req.body.chapter)},{$push:{members:ObjectId(req.body.mId)}})
    await db.collection("alumni").updateOne({_id:ObjectId(req.body.mId)},{$set:{chapter:{chapterId:ObjectId(req.body.chapter),membership:'M',name:req.body.name}}})
     await chapterFunctions.chapterData(function(result){
       console.log(result);
       res.send({
        status:'ok',
        chapters:result
       })
})
})

app.post('/api/leaveChapter',(req,res)=>{
  db.collection("alumni").updateOne({_id:ObjectId(req.body.mId)},{$set:{chapter:null}},function(err){
    db.collection('chapters').updateOne({_id:ObjectId(req.body.chapter)},{$pull:{members:ObjectId(req.body.mId)}},function(err){
      db.collection('chapters').updateOne({_id:ObjectId(req.body.chapter)},{$pull:{coordinators:ObjectId(req.body.mId)}},function(err){
        res.send({status:'ok'})
      })
      })
    })

})

app.post('/api/chapterevent',(req,res)=>{
  req.body.chapterid=ObjectId(req.body.chapterid)
 ChapterEvents.insertMany(req.body,function(err,data){
   var eventId=ObjectId(data[0]._id)
  Chapters.updateOne({_id:req.body.chapterid},{$push:{events:eventId}},function(err,data){
   res.send({
     'status':'ok'
   })
  })
  
   
 })

  
})

app.post('/api/updatelogo',multer({dest:'./uploads'}).single('file'),async(req,res)=>{
  const path = req.file.path
  const uniqueFilename = new Date().toISOString()
   imagepath=''
 await cloud.uploads(path,function(data){
   console.log("uploaded: ",data.url);
   imagepath=data.url
 })
  console.log(req.body);
  await commonAdminFunctions.setlogos(req.body.id,req.body.type,imagepath)
  await commonAdminFunctions.getlogos(function(logodata){
    res.send({
      settings:logodata
    })
  })
})
app.get('/api/getlogos',async(req,res)=>{
  commonAdminFunctions.getlogos(function(logodata){
    res.send({
      settings:logodata
    })
  })
})

app.post('/api/forgetPassword',async(req,res)=>{
  console.log(req.body);
  await Alumni.find({email:req.body.email},async function(err,docs){

    if(docs.length>0)
    {
      var userdata=docs
      console.log(userdata.Name);
      var digits = '0123456789'; 
      let OTP = ''; 
      for (let i = 0; i < 6; i++ ) { 
          OTP += digits[Math.floor(Math.random() * 10)]; 
      }
      console.log(OTP);
      await resetPassword.find({email:req.body.email},function(err,docs){
        var mailOptions = {
          from: 'recallfaketesting@gmail.com',
          to: ['ahmadbashashaik5670@gmail.com'],
          subject: 'Recall Password Reset',
          html:'<div style="background-color: #f8f9fa;padding: 10px;"><div style="width:60%;background-color: white;padding: 10px;margin:0 auto;"><h1>Hi '+userdata[0].Name+',</h1><p>You recently requested to reset your password for your Recall account. Use the below OTP to reset it.<br> <strong>This password reset is only valid for the next 24 hours.</strong></p><h2 style="text-align:center">'+OTP+'</h2><p>If you didnt request this, you can ignore this email. Your password Wont change until you craete a new password</p><p>Thanks, <br> The Recall Team</p></div>',
        };
      
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
          })
             if(docs.length>0)
             {
              resetPassword.updateOne({email:req.body.email},{$set:{otp:OTP}}).then(data=>{})
              res.send({status:'success'})
             }
             else{
               resetPassword.insertMany({email:req.body.email,otp:OTP})
               res.send({status:'success'})
             }
      })
    
    }
    else{
      res.send({status:'fail'})
    }
  })
})

app.post('/api/checkOtp',async(req,res)=>{
  console.log(req.body);
  resetPassword.find({email:req.body.email},function(err,doc){
           if(doc[0].otp==req.body.otp)
           {
            res.send({status:'success'})
           }
           else{
            res.send({status:'fail'})
           }
  })
})
app.post('/api/changePassword',async(req,res)=>{
  console.log(req.body);
  await resetPassword.remove({email:req.body.email})
  await Alumni.updateOne({email:req.body.email},{$set:{password:req.body.password}}).then(data=>{
                     res.send({status:'success'})
  })
})

const port=process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'public')) );
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
})

  app.listen(port, function () {  
    
 console.log('Example app listening on port 8000!')  
})  


// 7661899995