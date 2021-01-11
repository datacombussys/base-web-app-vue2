var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const AWS = require("aws-sdk");
var uuid = require('uuid');

//Amazon Credentials
AWS.config.loadFromPath('config.json');

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});

const fileFilter = function(req, file, cb) {
  console.log("fileFilter req", file);
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/x-png', 'image/gif'];
  if(!allowedFileTypes.includes(file.mimetype)) {
    const error = new Error("Wrong filetype. Please try another");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
}
const upload = multer({
  storage: storage,
  // dest: __dirname + '/uploads/',
  limits: {fileSize: 1000000},
  fileFilter
});


/* GET File Upload page. */
router.get('/', (req, res, next) => {
  console.log("req", req);
  res.status(200).json({ error: 'This is the upload page' });
});

/* POST Inventory Item File Upload to backend. */
router.post('/', upload.single('file'), async (req, res, next) =>{
  const s3 = new AWS.S3();
  console.log("req.file", req.file);

  try {
    const buffer = await sharp(req.file.path)
      .resize(300)
      .toBuffer();
    const s3response = await s3.upload({
      Bucket: "datapos-images",
      Key: Date.now() + '-' + `${req.file.originalname}`,
      Body: buffer,
      ACL: 'public-read'
    }).promise();
 
    // fs.unlink(req.file.path, () => {
    //   res.json({ file: s3response.Location});
    // })
  } catch(err) {
    res.status(422).json({err});
  }
}); 

/* POST Inventory Gallery Multiple Files Upload to backend. */
router.post('/invgallery', upload.array('files'), (req, res, next) =>{
  console.log("The files upload is:", req.files);
  res.send({file: req.files});
});

router.use(function(err, req, res, next) {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({error: "Only images are allowed"});
    return;
  }
});

module.exports = router;
