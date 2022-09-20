var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fname: String,
  lname: String,
  email: String,
  pass: String,
});

module.exports = mongoose.model("Users", userSchema);
