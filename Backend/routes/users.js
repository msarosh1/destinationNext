"use strict";
const express = require("express");
const user = require("../models/user");

let router = express.Router();

router.route("/").get((req, res) => {
  res.send("hi get /user/");
});

router.post("/signup", function (req, res, next) {
  users.push(req.body);
  console.log(users);
  const curruser = new user({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email,
    pass: req.body.user.pass,
  });
  curruser
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.send("You have signed up successfully.");
});

module.exports = router;
