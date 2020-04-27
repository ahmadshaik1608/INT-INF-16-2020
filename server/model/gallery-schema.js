const mongoose=require('mongoose');

const gallerySchema=new mongoose.Schema({
 foldername:{
    type:String
  },
  photopath:[String]
});

const user=mongoose.model('gallery',gallerySchema);
module.exports=user;