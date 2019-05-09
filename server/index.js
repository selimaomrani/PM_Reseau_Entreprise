var express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("../config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routes/authentificate.js");
const photos = require("./routes/photoAPI.js");
const com = require("./routes/com_bd.js");

mongoose.Promise = global.Promise;
app.use("/uploads", express.static("uploads"));

mongoose.connect(config.uri, err => {
  if (err) {
    console.log("Could not connect to db", err);
  } else {
    console.log("Connected to : " + config.db);
  }
});
app.use(
  cors({
    // origin: "http://localhost:8101"
    origin: "http://192.168.43.92:8100"
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", auth);
app.use("/photoApi", photos);
app.get("/sayhello", (req, res) => {
  res.send("hello");
});
app.use("/com", com);
app.listen(3000, "192.168.43.92", err => {
  if (err) {
    console.log("could not start server");
  } else {
    console.log("server running on port : 3000");
  }
});
