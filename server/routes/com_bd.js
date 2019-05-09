var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");

router.get("/hello", (req, res) => {
  res.json({ succes: true, message: "hello" });
});

router.post("/getvar", (req, res) => {
  User.findOne({ productId: req.body.productId }, (err, user) => {
    if (err) {
      res.json({ succes: false, message: "error happened ", err });
    } else {
      res.json({
        succes: true,
        pictureRequest: user.pictureRequest
      });
    }
  });
});
router.post("/resetvar", (req, res) => {
  User.findOneAndUpdate(
    { productId: req.body.productId },
    { $set: { pictureRequest: false } },
    (err, user) => {
      if (err) {
        res.json({ succes: false, message: "error happened ", err });
      } else {
        res.json({
          succes: true
        });
      }
    }
  );
});

router.post("/setvar", (req, res) => {
  User.findOneAndUpdate(
    { productId: req.body.productId },
    { $set: { pictureRequest: true } },
    (err, user) => {
      if (err) {
        res.json({ succes: false, message: "error happened ", err });
      } else {
        res.json({
          succes: true
        });
      }
    }
  );
});
router.post("/addNewProduct", (req, res) => {
  let product = new Product({});
  product.save(err => {
    if (err) {
      if (err.code === 11000) {
        res.json({ succes: false, message: "id already exists" });
      } else {
        res.json({ succes: false, message: "error occured", err });
      }
    } else {
      res.json({ succes: true, message: "product added" });
    }
  });
});

router.post("/checkRequest", (req, res) => {
  if (!req.body.productId) {
    res.json({ sucess: false, message: "provide product Id" });
  } else {
    User.findOne({ productId: req.body.productId }, (err, user) => {
      if (err || user === null) {
        res.json({ sucess: false, message: "couldn t not find user" });
      } else {
        res.json({ sucess: true, pictureRequest: user.pictureRequest });
      }
    });
  }
});
module.exports = router;
