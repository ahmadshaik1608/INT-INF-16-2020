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
var nodemailer = require('nodemailer');

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
app.use(bodyParser.json());   
app.use("/uploads",express.static(path.join("./uploads")))
app.use(cors())
// const User = require('./model/user');

app.use("/uploads",express.static(path.join("gallery/server/uploads")))
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
  
 



app.post('/api/userdata',(req,res)=>{
  Alumni.find({
   _id:ObjectId(req.body.id)
}, function(err, user){
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
       }).toArray(function (err, bdaysmonth1) {
        if (err) throw err;
      
        // console.log('Admin',user[0]['isadmin']);
        db.collection('notifications').aggregate([
          { $match: { recieverid:req.body.id }},
          { $unwind: '$messages' },
          { $sort: { 'messages.time': -1 }},
          // { $group: { _id: '$recieverid', friends: { $push: '$messages'}}
        ]).toArray(function(err,notif){
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
           }).toArray(function (err, bdaysmonth1) {
            if (err) throw err;
          
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





app.post('/api/registerUser', (req, res) => {
  var associates=req.body.associates;
  var insertedId

    if(associates=="Alumni")
            req.body.rollno=req.body.rollno.toLowerCase()
             var newuser=new Alumni(req.body)
                 newuser['profilepic']='http://localhost:3000/uploads/83fef96efcdd7dfef9837867414baf2b'
                 newuser.save()
                     .then(item => {
                         insertedId=item._id
                         Userreg.insertMany({
                         email:req.body.email,
                        password:req.body.password,
                         associates:req.body.associates,
                         userid:insertedId
                           })
                            res.send({status: 'success',associates:associates,'regId':insertedId})
                       })
                 .catch(err => {
                    console.log("fail")
                     res.send({
                       status: 'fail',
                       'message':"Email already exist"
                     });
      });
    
})

app.post('/api/getusers',(req,res)=>{
  var count = 0;
  var coll = db.collection(req.body.associates.toLowerCase());
  var arr = [];



  db.collection('alumni').aggregate([
    {
      
        $project: {
          password:0,
        }
      },
      {
      $lookup:{
        from:'testmonials',
        localField:"_id" ,
        foreignField: 'userId',
        as: 'testmonialdata'
      }
    }
  ]).toArray(function (err, docs) {

    if (err)    throw err;
    res.send(docs)    
  })

 
  
})

app.post('/api/updateuser',(req,res)=>
{
  var newuser=new Alumni(req.body)
  console.log(newuser['_id']);
  
  db.collection("alumni").updateOne({_id:ObjectId(newuser['_id'])},{$set:newuser},function(err){
    if(err) throw err;
    else{
      // db.collection('allusers').find({userid:ObjectId('5e916f92176c463f7cacff7f')}).toArray(function(err, res){
      //   console.log(res);
        
      // })
      db.collection("alumni").find({ _id: ObjectId(newuser['_id'])}).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);

       return  res.send({
          status: 'success',
          message: docs})
      })
    }

    // res.send({
    //   status:'fail'
    // })
  
  })
  // console.log(newuser);
  
})


app.post('/api/upoadprofile',multer({dest:'./uploads'}).single('file'), (req,res,next)=>{
    const url=req.protocol+'://'+req.get("host")
    imagepath=url+"/uploads/"+req.file.filename
  console.log(imagepath);
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

app.post('/file',multer({dest:'./uploads'}).single('file'), (req,res,next)=>{
  const url=req.protocol+'://'+req.get("host")
  imagepath=url+"/uploads/"+req.file.filename
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
          _id:0
        }
      }     
  ]).toArray(function (err, docs) {
    if (err)    throw err;
    res.send(docs)
  })
      // db.collection('alumni').find(req.body).toArray(function (err, docs) {
      //   if (err) throw err;
      //   res.send(docs)
      // })
  })

app.post('/api/testmonial',(req,res)=>{
  console.log(req.body);
  
  Testmonial.find({
    userId:req.body.userId
  },function(err,user){
    if(err) throw err;
    else{   
    //   console.log("sdnjfdnjndv");
    //  console.log(user.length);
      if(user.length === 1)
     {
      db.collection('testmonials').updateOne({userId:req.body.userId},{$set:{testmonial:req.body.testmonial}},function(err){
        if (err) throw err;
        res.send({status:true})
       })
      
      
    }
    else{
      console.log("else");
      var testmonial=new Testmonial(req.body)
      console.log(testmonial);   
      testmonial.save().then(item=>{
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

app.post('/api/postjob',(req,res)=>{
   var newJob= new Job(req.body)
  newJob.save().then(item=>{
   res.send({status:'ok'})
  }).catch(err=>{
    console.log(err);
    
  })
})
app.get('/api/getjobs',(req,res)=>{
  var jobs=[]
  Job.find({deadline:{$gte:new Date()}}).then(documents=>{
    // console.log(documents)
    for (let i of documents){
       jobs.push([i])
    }
    console.log(jobs)
    res.send({alljobs:jobs})
  })
})
app.post('/api/deletejob',(req,res)=>{
  console.log(req.body);
  
  Job.remove({'_id':ObjectId(req.body.jobid)},function(err,docs){
    if(err) throw err
    else{
      var jobs=[]
  Job.find({deadline:{$gte:new Date()}}).then(documents=>{
    // console.log(documents)
    for (let i of documents){
       jobs.push([i])
    }
    console.log(jobs)
    res.send({alljobs:jobs})
  })
    }
  })
})
app.get('/api/getalltestmonials',(req,res)=>{
  var testmonialarray=[]
  db.collection('testmonials').find({isvalid:'true'}).toArray(function (err, aproveddocs) {
    if (err) throw err;

db.collection('testmonials').find({isvalid:'false'}).toArray(function (err, unapproveddocs) {
  if (err) throw err;
  res.send({
    approved:aproveddocs,
    unapproved:unapproveddocs
  })
})

})
})
app.post('/api/approveunapprove',(req,res)=>{
  Testmonial.updateOne({_id:ObjectId(req.body.id)},{$set:{isvalid:req.body.isvalid}},function(err){
    db.collection('testmonials').find({isvalid:'true'}).toArray(function (err, aproveddocs) {
      if (err) throw err;
  
  db.collection('testmonials').find({isvalid:'false'}).toArray(function (err, unapproveddocs) {
    if (err) throw err;
    res.send({
      approved:aproveddocs,
      unapproved:unapproveddocs
    })
  })
  
  })
  })
 
})

app.get('/api/contactus',(req,res)=>{
 db.collection('contactus').find({}).toArray(function(err,docs){
    res.send(
      {
        details:docs
      }
    )
  })
})
app.post('/api/updatecontact',(req,res)=>{
  console.log(req.body);
  
  db.collection('contactus').updateOne({_id:ObjectId(req.body.id)},{$set:req.body}),function(err,docs){
    db.collection('contactus').find({}).toArray(function(err,docs){
      res.send(
        {
          details:docs
        }
      )
    })
   }
 })

app.post('/api/approveunapproveuser',(req,res)=>{
  console.log(req.body);
  
  var date=today
  Alumni.updateMany({_id:ObjectId(req.body.id)},{$set:{approved:req.body.approved,approvedon:today}},{upsert: true},function(err){
    if(err) throw err 
    db.collection('alumni').find().toArray(function (err2, docs) {
      if (err) throw err;
      res.send(docs)
    })
  })
  
})

app.post('/api/posthof',(req,res)=>{
  console.log(req.body);
  var newhof=new halloffame(req.body);
  newhof.save().then(item=>{
    res.send({
      status:'ok'
    })
  }).catch(err=>{
    console.log(err);
    
  })

  
})

app.get('/api/gethof',(req,res)=>{
  db.collection('HallofFame').find({}).toArray(function(err,docs){
    res.send({
      alumni:docs
    })
    
  })
})
app.post('/api/deletehof',(req,res)=>{
  console.log(req.body);
 halloffame.deleteOne({_id:ObjectId(req.body.id)},function(err){
   if(err) throw err;
   db.collection('HallofFame').find({}).toArray(function(err,docs){
    res.send({
      alumni:docs
    })
    
  })

 })
  
})
app.get('/api/aboutus',(req,res)=>
{
 db.collection('AboutUsMessages').find({}).toArray(function(err,docs){
    res.send({
      messages:docs
    })
 })
})

app.post('/api/updateaboutus',(req,res)=>{
  newobj={
    title:req.body.title,
    name:req.body.name,
    message:[req.body.message1,req.body.message2,req.body.message3,req.body.message4],
  }
  About.updateOne({_id:ObjectId(req.body.id)},{$set:newobj},function(err,docs){
    res.send({
      status:'ok'
    })
  })
})
app.post('/api/deleteaboutus',(req,res)=>{
  About.remove({_id:Object(req.body.id)},function(err,docs){
    db.collection('AboutUsMessages').find({}).toArray(function(err,docs){
      res.send({
        messages:docs
      })
   })
  })
})
app.post('/api/newaboutus',multer({dest:'./uploads'}).single('file'),(req,res)=>{
  const url=req.protocol+'://'+req.get("host")
  imagepath=url+"/uploads/"+req.file.filename
newobj={
  title:req.body.title,
  name:req.body.name,
  message:[req.body.message1,req.body.message2,req.body.message3,req.body.message4],
  image:imagepath
}
 newmessage=new About(newobj)
 newmessage.save().then(item=>{
  res.send({
    status:'ok'
  })
   
 })
  
  
})
app.get('/api/chaptersdata',(req,res)=>{
  db.collection('chapters').find({}).toArray(function(err,docs){
   docs.forEach(function(u){
    db.collection('alumni').find({'_id':{ $in: u.coordinators.map(function(o){ return ObjectId(o); })
  }}).toArray(function(err,cordocs){
          u['coordinatorsdata']=cordocs
      db.collection('alumni').find({'_id':{ $in: u.members.map(function(o){ return ObjectId(o); })
  }}).toArray(function(err,memberdocs){
    u['membersdata']=memberdocs
      res.send({
        chapters:docs,
      })  
   })
  
   })
  })
  
    
  })
})

app.post('/api/promotedemote',(req,res)=>{
  console.log(req.body);
  
  db.collection('chapters').findOneAndUpdate({_id:ObjectId(req.body.id)},{$pull:req.body.demote},function(err,data){
    db.collection('chapters').update({_id:ObjectId(req.body.id)},{$push:req.body.promote},function(err,data){
    })
    res.send
    ({
      status:'ok'
    })  
  })
})
app.post('/api/createevent',multer({dest:'./uploads'}).single('file'),(req,res)=>{
  const url=req.protocol+'://'+req.get("host")
  imagepath=url+"/uploads/"+req.file.filename
  console.log(req.body,req.file);
  var newobj={
    eventname: req.body.eventname,
    organisedby: req.body.organisedby,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    starttime: req.body.starttime,
    endtime:req.body.enddate,
    venue: req.body.venue,
    subtext: req.body.subtext,
    description:[req.body.para1,req.body.para2,req.body.para3,req.body.para4],
    image:imagepath
  }
  var event=new Events(newobj);
  event.save().then(item=>{
   res.send({
     status:'ok'
   })
  })

})
app.post('/api/updateevent',(req,res)=>{

  var newobj={
    eventname: req.body.eventname,
    organisedby: req.body.organisedby,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    starttime: req.body.starttime,
    endtime:req.body.enddate,
    venue: req.body.venue,
    subtext: req.body.subtext,
    description:[req.body.para1,req.body.para2,req.body.para3,req.body.para4],
  }
  // var event=new Events(newobj);
  Events.updateOne({_id:Object(req.body.id)},{$set:newobj},function(err,docs){
      res.send({
        status:'ok'
      })
  })
    
})
app.post('/api/deleteevents',(req,res)=>{
  Events.remove({_id:Object(req.body.id)},function(err,docs){
    Events.find({},function(err,docs){
      res.send(docs)
    })

  })
})
app.get('/api/getevents',(req,res)=>{
  Events.find({},function(err,docs){
    res.send(docs)
  })
})
app.post('/api/registerEvent',(req,res)=>{
  console.log(req.body);
  
 Events.updateOne({_id:ObjectId(req.body.eid)},{ $push: {registeredmembers: req.body.uid } },function(err,docs){
  if(err){
    res.send({status:'failed'})
  }
  else{
    Alumni.updateOne({_id:ObjectId(req.body.uid)},{$push:{events:req.body.eid}},function(err,docs){
      res.send({status:'succes'})
    })
  }
 })
})


app.post('/api/getregisteredevent',(req,res)=>{
  console.log(req.body);
  db.collection('events').find({ _id: {$in : req.body.ids.map(function(id){ return ObjectId(id); })}},{image:0}).toArray(function(err,docs){
   res.send({events:docs})
    
  })
})

var  options = { upsert: true, new: true, setDefaultsOnInsert: true };
app.post('/api/notification',(req,res)=>{
  console.log(req.body);
  Notifications.find({recieverid:req.body.recieverid},function(err,docs){
    if(err) throw err;
    else if(docs.length === 1){
     
     Notifications.updateOne({recieverid:req.body.recieverid},{$push :{messages:{message:req.body.message,type:req.body.type}}},function(err,data){
  
        console.log(data);
        
      })
    }
    else{
     Notifications.insertMany({recieverid:req.body.recieverid,messages: {message:req.body.message,type:req.body.type}})
    }
  }) 
})
app.post('/api/selectuser',(req,res)=>{
   console.log(req.body);
  //  if(req.body.searchkey.length!=0){
  //  db.collection('alumni').find({Name:new RegExp(req.body.searchkey , 'i')},{$project:{ _id:0 }}).toArray(function(arr,data){
  //    console.log(data.length);
  //    res.send({result:data})
   
  //  })
  // }   
  
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
  console.log(req.body);
  
    if(req.body.type=='individual')
    {

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
      //   var mailOptions = {
      //     from: 'recallfaketesting@gmail.com',
      //     to: ['recallfaketesting@gmail.com'],
      //     subject: 'Sending Email using Node.js',
      //     text: req.body.message
      //   };
      
      //   transporter.sendMail(mailOptions, function (err, info) {
      //     if(err)
      //       console.log(err)
      //     else
      //       console.log(info);
      //  });
      })
      }
    }
    
})

  app.listen(3000, function () {  
    
 console.log('Example app listening on port 8000!')  
})  


// 7661899995