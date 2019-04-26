var express = require("express");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, "capture" + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/uploadImage", upload.single("capture"), function(req, res) {
  res.json({ succes: true, message: "image uploaded : " + req.file.path });
  console.log(req.file.path);
});

module.exports = router;
