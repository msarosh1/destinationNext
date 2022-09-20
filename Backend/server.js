const express = require("express");
const app = express();

const mongoose = require("mongoose");

const port = process.env.port || 5000;

const users = require("./routes/users");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ank7gsi.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/users", users);

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(port, () => {
  console.log("Server started on port 5000");
});
