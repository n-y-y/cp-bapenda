const express = require("express");
const router = express.Router({ mergeParams: true });
const Gallery = require("../models/gallery");
const middleware = require("../middleware");

router.get("/", (req, res) => {
  //Get all galleries from DB
  console.log(req.user);
  Gallery.find({}, (err, allgalleries) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      res.render("galleries/index", {
        galleries: allgalleries.reverse(),
        currentUser: req.user,
      });
    }
  });
});

//CREATE- add new post to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // add new post
  var imageUrl = req.body.image;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };

  var newArticle = {
    image: imageUrl,
    author: author,
  };
  if (!req.user.isAdmin) res.redirect("/galleries");
  //Save to database
  Gallery.create(newArticle, (err, newlyCreated) => {
    if (err) {
      console.log("Error in inserting into DB");
    } else {
      res.redirect("/galleries");
    }
  });
});

//NEW - show form to create new galleries
router.get("/publish", middleware.isLoggedIn, (req, res) => {
  res.render("galleries/new");
});


//=================EDIT POST ROUTE=====================
router.get("/:id/edit", middleware.checkfoundGalleryOwnership, (req, res) => {
  Gallery.findById(req.params.id, (err, foundArticle) => {
    res.render("galleries/edit", { gallery: foundArticle });
  });
});

//UPDATE POST ROUTE
router.put("/:id", middleware.checkfoundGalleryOwnership, (req, res) => {
  if (!req.user.isAdmin) res.redirect("/galleries");
  //find and update
  Gallery.findByIdAndUpdate(req.params.id, req.body.gallery, (err, updatedPost) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/galleries/" + req.params.id);
    }
  });
});

//DESTROY POST ROUTE
router.delete("/:id", middleware.checkfoundGalleryOwnership, (req, res) => {
  if (!req.user.isAdmin) res.redirect("/galleries");
  Gallery.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/galleries");
    } else {
      res.redirect("/galleries");
    }
  });
});

module.exports = router;
