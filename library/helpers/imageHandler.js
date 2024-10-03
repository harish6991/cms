const fs = require('fs');
const path = require('path');
const multer = require('multer');
const oneLevelUp = path.dirname(path.dirname(__dirname))


// checking if file directory is present if not create one
const  directoryChecker  = ()=>{
  let uploadDirectory = path.join(oneLevelUp,'public','uploads')
  if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
      console.log(`Directory '${uploadDirectory}' created.`);
    }

}
console.log(oneLevelUp)

// storage of the file
const storage = multer.diskStorage({destination:function(req,file,cb){
    cb(null,path.join(oneLevelUp,'public','uploads'))
},
filename:function(req,file,cb){
  cb(null, Date.now() + path.extname(file.originalname));
}})


// upload event
const upload =multer({
  storage:storage,
  limits:{ fileSize: 5 * 1024 * 1024 },
  fileFilter:function(req,file,cb){
     checkFileType(file,cb)
  }
})


// checking the file type
function checkFileType(file,cb){
  const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Images Only!');
  }

}



module.exports = {directoryChecker,upload};
