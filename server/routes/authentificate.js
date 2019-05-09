var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
router.get("/hello", (req, res) => {
  res.json({ succes: true, message: "hello" });
});

router.post("/register", (req, res) => {
  if (!req.body.username) {
    res.json({ succes: false, message: "you have to provide a username" });
  } else {
    if (!req.body.password) {
      res.json({ succes: false, message: "you have to provide a password" });
    } else {
      if (!req.body.passwordconf) {
        res.json({
          succes: false,
          message: "you have to confirm the password"
        });
      } else {
        if (req.body.password != req.body.passwordconf) {
          res.json({ succes: false, message: "passwords dont match" });
        } else {
          if (!req.body.productId) {
            res.json({ succes: false, message: "provide product Id" });
          } else {
            Product.findOne({ _id: req.body.productId }, (err, product) => {
              if (err || product === null) {
                res.json({
                  succes: false,
                  message: "the product id provided doesn t exist"
                });
              } else {
                let user = new User({
                  username: req.body.username,
                  password: req.body.password,
                  productId: req.body.productId
                });
                user.save(err => {
                  if (err) {
                    if (err.code === 11000) {
                      res.json({
                        succes: false,
                        message: "username already exists"
                      });
                    } else {
                      res.json({
                        succes: false,
                        message: "error occured",
                        err
                      });
                    }
                  } else {
                    res.json({ succes: true, message: "user created" });
                  }
                });
              }
            });
          }
        }
      }
    }
  }
});

router.post("/login", (req, res) => {
  if (!req.body.username) {
    res.json({ succes: false, message: "you have to provide a username" });
  } else {
    if (!req.body.password) {
      res.json({ succes: false, message: "you have to provide a password" });
    } else {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          res.json({ succes: false, message: "error happened ", err });
        } else {
          if (user === null) {
            res.json({
              succes: false,
              message: "There is no username called " + req.body.username
            });
          } else {
            if (user.password != req.body.password) {
              res.json({ succes: false, message: "Wrong password" });
            } else {
              res.json({
                succes: true,
                message: "login succesful",
                userId: user._id,
                productId: user.productId
              });
            }
          }
        }
      });
    }
  }
});
module.exports = router;
