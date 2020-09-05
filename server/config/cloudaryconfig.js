
const cloudinary = require('cloudinary');


cloudinary.config({
cloud_name: 'dnwfegd8k',
api_key: '697221238458473',
api_secret: 'KZ5Q9XDumbFRu_IFcdqZw4G_VKs'
});

exports.uploads = async function(path,callBack){

   await cloudinary.uploader.upload(
        path, function(image){
          console.log('file uploaded to Cloudinary')
          const fs = require('fs')
          fs.unlinkSync(path)
          console.log(image);
          callBack(image)

        }
      )
    }

    