const express=require('express')


const router =express.Router()
var mongo = require("mongoose");  
var ObjectId = mongo.Types.ObjectId;

const gallery=require('../model/gallery-schema')


router.post('/createfolder',(req,res)=>{

    gallery.create(req.body).then((result)=>{
        //console.log(result)
        return res.send(result)
    })
})

router.get('/getfolder',(req,res)=>{
    gallery.find().select({foldername:1,_id:1}).then((err,docs)=>{
        if(err){return res.send(err)}
        else{return res.send(docs)}
    })
})

router.delete('/deletefolder:id',(req,res)=>{
    gallery.deleteOne({_id:ObjectId(req.params.id)},(err)=>{
        if(err){
            res.send(err)
        }
        else{
            //console.log("deleted")
            res.json({message:"delete"})
        }
    })
})
router.get('/dispalyimages:id',(req,res)=>{
    gallery.findOne({_id:ObjectId(req.params.id)}).select({photopath:1}).exec((err,docs)=>{
        if(err){return res.send(err)}
        else{return res.send(docs)}
    })
    
})

router.delete('/deleteimage',(req,res)=>{
    console.log(req.query.id,req.query.img)
    gallery.updateOne({_id:ObjectId(req.query.id)},{$pull:{photopath:req.query.img}},(err)=>{
        if(err){return res.send(err)}
        else{return res.send({status:"deleted image"})}
    })
   
})


module.exports=router