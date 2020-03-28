var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
const User = require('./model/user');
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
const url = 'mongodb://localhost:27017/RecallDb';
app.post('/api/SaveUser', (req, res) => {
  mongo.connect(url,{ useNewUrlParser: true }, function(err){
      if(err) throw err;
      console.log(req.body)
      User.find({
        rollno : req.body.username, password : req.body.password
    }, function(err, user){
        if(err) throw err;
        if(user.length === 1){  
            return res.status(200).json({
                status: 'success',
                data: user
            })
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Login Failed'
            })
        }
         
    })
  });
})
  
app.listen(8000, function () {  
    
 console.log('Example app listening on port 8000!')  
})  