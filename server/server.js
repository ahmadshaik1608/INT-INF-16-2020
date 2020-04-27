var express = require('express');  
const cors = require('cors')
var path = require("path");   
var bodyParser = require('body-parser');  
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
const Job= require('./model/createjob')
const contact = require('./model/contactus')
const gallery=require('./routes/gallery')
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
          
            console.log('Admin',user[0]['isadmin']);
            
            res.send({
              status: 'success',
              isAdmin:user[0]['isadmin'],
              message: docs,
            Todaybdays:bdaysToday,
            Tommorwbdays:bdaysTommorow,
            thismonth:bdaysmonth1      })
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
  console.log(req.body)
  var coll = db.collection(req.body.associates.toLowerCase());
  var arr = [];
  coll.find({}).toArray(function (err, docs) {
    if (err) throw err;
    res.send(docs)
  })
  
  //  res.send(req.body)
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

      db.collection('alumni').find(req.body).toArray(function (err, docs) {
        if (err) throw err;
        res.send(docs)
      })
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
  
   db.collection('testmonials').find({userId:req.body.userId}).toArray(function(err,docs){
    if (err) throw err;
    res.send(docs)
   })
})

app.post('/api/deletetestmonial',(req,res)=>{
  db.collection('testmonials').deleteOne({userId:req.body.userId},function(err,docs){
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

app.post('/api/updatecontact',(req,res)=>{
  contact.find().toArray(function(err,docs){
    if(docs.length>0){
      
    }
  })
})

app.post('/api/approveunapproveuser',(req,res)=>{
  console.log(req.body);
  
  var date=today
  Alumni.updateMany({_id:ObjectId(req.body.id)},{$set:{approved:req.body.approved}},{approvedon:'ysgdfysgd'},function(err){
    if(err) throw err 
    db.collection('alumni').find().toArray(function (err2, docs) {
      if (err) throw err;
      res.send(docs)
    })
  })
  
})
  app.listen(3000, function () {  
    
 console.log('Example app listening on port 8000!')  
})  


// 7661899995