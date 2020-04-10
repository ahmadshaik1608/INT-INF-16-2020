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
const Employee=require('./model/empoyee')
   
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

      userReg.find({
        email : req.body.username, password : req.body.password
    }, function(err, user){
        if(err) throw err;
        if(user.length === 1){  
            return res.send({
                status: 'success',
                data: user
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
      if(req.body.associates=="Employee"){
      var newuser=new Employee(req.body)
      newuser.save()
      .then(item => {
        console.log("succes")
        res.send("item saved to database");
      })
      .catch(err => {
        console.log("fail")
        res.status(400).send("unable to save to database");
      });
    }
    if(req.body.associates=="Alumni"){
      var newuser=new Alumni(req.body)
      newuser.save()
      .then(item => {
        console.log("succes")
        res.send("item saved to database");
      })
      .catch(err => {
        console.log("fail")
        res.status(400).send("unable to save to database");
      });
    }
    if(req.body.associates=="Student"){
      var newuser=new Student(req.body)
      newuser.save()
      .then(item => {
        console.log("succes")
        res.send("item saved to database");
      })
      .catch(err => {
        console.log("fail")
        res.status(400).send("unable to save to database");
      });
    }
    if(req.body.associates=="Faculty"){
      var newuser=new Faculty(req.body)
      newuser.save()
      .then(item => {
        console.log("succes")
        res.send("item saved to database");
      })
      .catch(err => {
        console.log("fail")
        res.status(400).send("unable to save to database");
      });
    }
//       const url=req.protocol+'://'+req.get("host")
//       console.log(url)
//       imagepath=url+"/profilepics/"+req.file.filename
//     console.log(imagepath);
// console.log(req.file[0])
// data=JSON.parse( req.body.data)
//     console.log(req.file)
//         userReg.insertMany({
//             rollno:data.rollno,
//             firstname:data.firstname,
//             lastname:data.lastname,
//             gender:data.gender,
//             branch:data.branch,
//             yearofpass:data.yop,
//             email:data.email,
//             phone:data.phone,
//             bio:data.bio,
//             password:data.password,
//             company:data.company,
//             location:data.location,
//             designation:data.designation,
//             dateofbirth:data.dateofbirth,
//             profilepic:imagepath
//         })

//         res.send({status: 'success'})
   //  console.log("body:",data.firstname)
})

app.post('/api/register',(req,res)=>{
   res.send({status:'ok'})
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
app.listen(3000, function () {  
    
 console.log('Example app listening on port 8000!')  
})  

// 7661899995