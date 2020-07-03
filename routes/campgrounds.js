const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX - show all campgrounds

router.get("/", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    err
      ? console.log(err)
      : res.render("campgrounds/index", {
          campgrounds: allCampgrounds,
          currentUser: req.user,
        });
  });
});

// CREATE - add new campground to DB

router.post("/", middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const price = req.body.price;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author,
    price: price,
  };

  Campground.create(newCampground, (err, newlyCreated) => {
    err ? console.log(err) : res.redirect("/campgrounds");
  });
});

// NEW - show form to create new campground

router.get("/new", middleware.isLoggedIn, (req, res) =>
  res.render("campgrounds/new")
);

// SHOW - shows more info about one campground

router.get("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT - Edit Campgrounds

router.get("/:id/edit", middleware.checkCampgroundAuthorization, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE - Update Campground

router.put("/:id", middleware.checkCampgroundAuthorization, (req, res) => {
  // find and update correct campground
  // redirect somewhere
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        req.flash("error", "Campground not found !");
        res.redirect("/campgrounds");
      } else {
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    }
  );
});

// Destroy - Remove Campground

router.delete("/:id", middleware.checkCampgroundAuthorization, (req, res) => {
  // find and remove correct campground
  // redirect somewhere
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
