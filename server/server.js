var express = require('express');  
const cors = require('cors')
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
const db=require('./config/mongoose');
const image=require('./model/gallery');
const multer  = require('multer')
const userReg=require('./model/user');
   
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

  
app.post('/api/registerUser',multer({dest:'./profilepics'}).single('file'), (req, res) => {
      console.log("data"+req)
      const url=req.protocol+'://'+req.get("host")
      console.log(url)
      imagepath=url+"/profilepics/"+req.file.filename
    console.log(imagepath);
console.log(req.file[0])
data=JSON.parse( req.body.data)
    console.log(req.file)
        userReg.insertMany({
            firstname:data.firstname,
            lastname:data.lastname,
            gender:data.gender,
            branch:data.branch,
            email:data.email,
            phone:data.phone,
            bio:data.bio,
            password:data.password,
            company:data.company,
            location:data.location,
            designation:data.designation,
            dateofbirth:data.dateofbirth,
            profilepic:imagepath
        })

        res.send({status: 'success'})
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