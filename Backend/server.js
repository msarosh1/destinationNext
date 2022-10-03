const express = require("express");
const app = express(); // server software
const bodyParser = require("body-parser"); // parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session"); // session middleware
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login"); // authorization

require("./passport")(passport);

const User = require("./models/user"); // User Model

const mongoose = require("mongoose");

const port = process.env.port || 5000;

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ank7gsi.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//passport local strategy
const LocalStrategy = require("passport-local").Strategy;

// Configure Sessions Middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configuring More Middleware
const bcrypt = require("bcryptjs");

// Route to Homepage
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/static/index.html");
  console.log("Inside get /");
});

// Route to Login Page
app.get("/login", (req, res) => {
  console.log("Inside /login");
  res.send("Logged out");
  // res.sendFile(__dirname + "/static/login.html");
});

// Route to Dashboard
app.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.email}. Your session ID is ${req.sessionID}
  and your session expires in ${req.session.cookie.maxAge}
  milliseconds.<br><br>
  <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
});

// Route to Log out
app.get("/logout", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect("/login");
});

//Post Route: signup
app.post("/signup", (req, res) => {
  const username = req.body.user.username;
  const fname = req.body.user.fname;
  const lname = req.body.user.lname;
  const email = req.body.user.email;
  const password = req.body.user.password;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          username,
          fname,
          lname,
          email,
          password,
        });
        //Hash password before saving in database
        bcrypt
          .genSalt(10)
          .then((salt) => {
            return bcrypt.hash(newUser.password, salt);
          })
          .then((hash) => {
            newUser.password = hash;
            newUser.save().then((user) => {
              res.json({
                success: true,
                message: "Signed up successfully.",
              });
            });
          })
          .catch((err) => {
            res.json({
              success: false,
              message: `Error: ${err}`,
            });
          });
      } else {
        res.json({
          success: false,
          message: "A user with the given username already exists.",
        });
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        message: `Error: ${err}`,
      });
    });
});

//Post Route: login
app.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        message: info.message,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({
        success: true,
        message: "login successful",
      });
    });
  })(req, res, next);
});

app.use("/destinations", require("./routes/destination-routes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
