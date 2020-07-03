require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/index");

const app = express();

//seedDB(); // Seed Database

// App Config

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

// Passport config

app.use(
  require("express-session")({
    secret: "I Completed Web Developer Bootcamp",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Require Routes

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });

app.listen(process.env.PORT, () => console.log("YelpCamp app has started!"));
