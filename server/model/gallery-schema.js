const mongoose=require('mongoose');

const gallerySchema=new mongoose.Schema({
 foldername:{
    type:String
  },
  thumbnail:{type:String,default:'http://localhost:3000/uploads/251359a5d2d661cf5906f900032484a2'},
  createdon:{type:Date},
  photopath:[String]
});

const user=mongoose.model('gallery',gallerySchema);
module.exports=user;