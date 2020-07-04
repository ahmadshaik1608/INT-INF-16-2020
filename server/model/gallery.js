const mongoose=require('mongoose');
//const multer=require('multer');
//const path=require('path');
//const AvatarPath=path.join('./uploads');

const gallerySchema=new mongoose.Schema({
  avatar:{
    type:String
  }
});

/*let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AvatarPath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
});




gallerySchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');

gallerySchema.statics.avatarpath=AvatarPath;*/


const gallary=mongoose.model('Gallary',gallerySchema);
module.exports=gallary;