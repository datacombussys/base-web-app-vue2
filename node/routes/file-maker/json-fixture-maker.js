var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
const multer = require('multer');

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/file-maker-files/',
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});
//Filter Filt Types
const fileFilter = function(req, file, cb) {
  console.log("fileFilter req", file);
  const allowedFileTypes = ['text/csv'];
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

/* GET home page */
router.get('/json-maker', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST REquest */
router.post('/json-maker', upload.single('file'), async (req, res, next) => {
  await console.log("received file request");
  await console.log("req", req);
  await console.log("req.file", req.file);

  try {
    var filedata = fs.ReadStream(req.file);
    console.log("filedata", filedata);

    var fileLocation = path.join(path.join(__dirname, 'public/uploads/file-maker-files', Date.now() + '-' + `${req.file.originalname}`));
    console.log("fileLocation", fileLocation);
    
    var filedata2 = fs.ReadStream(req.file);
    console.log("filedata2", filedat2a);

    res.status(201).json({ data: 'File Created' });

  } catch(err) {

    res.status(422).json({ error: "There was an error creating the file", err });

  }  
});

//Middelware Error Handling Wrong File Type
router.use(function(err, req, res, next) {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({error: "Only images are allowed"});
    return;
  }
});

module.exports = router;
