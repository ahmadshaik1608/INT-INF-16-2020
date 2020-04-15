var express = require('express');  
const cors = require('cors')
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
const db=require('./config/mongoose');
const image=require('./model/gallery');
const multer  = require('multer')
const Alumni=require('./model/alumni');
const Student=require('./model/student');
const Faculty=require('./model/faculty');
const Employee=require('./model/empoyee');
const Userreg=require('./model/allusers');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var ObjectId = mongo.Types.ObjectId;
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json());   
app.use("/uploads",express.static(path.join("./uploads")))
app.use(cors())
// const User = require('./model/user');
  
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
          console.log(user[0]['associates'])
          var coll = db.collection(user[0]['associates'].toLowerCase());
          var arr = [];
          coll.find({ _id: ObjectId(user[0]['_id'])}).toArray(function (err, docs) {
            if (err) throw err;
            console.log(docs);
            
             res.send({
              status: 'success',
              message: docs})
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
      if(associates=="Employee"){
      var newuser=new Employee(req.body)
      newuser.save()
      .then(item => {
        // console.log(item._id)
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
        res.status(400).send("unable to save to database");
      });
    }
    if(associates=="Alumni"){
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
        res.status(400).send("unable to save to database");
      });
    }
    if(associates=="Student"){
      var newuser=new Student(req.body)
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
        res.status(400).send("unable to save to database");
      });
    }
    if(associates=="Faculty"){
      var newuser=new Faculty(req.body)
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
        res.status(400).send("unable to save to database");
      });
    }
   
   

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
app.post('/file',multer({dest:'./uploads'}).single('file'), (req,res,next)=>{
    const url=req.protocol+'://'+req.get("host")
    imagepath=url+"/uploads/"+req.file.filename
  console.log(imagepath);
   
   console.log(req.file)
     image.create({
         avatar:imagepath
     })
     
     return res.send({status:'ok'})
   
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

  app.listen(3000, function () {  
    
 console.log('Example app listening on port 8000!')  
})  


// 7661899995