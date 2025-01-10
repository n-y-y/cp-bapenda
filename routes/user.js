const express = require("express");
const router = express.Router({ mergeParams: true });
const Article = require("../models/article");
const Gallery = require("../models/gallery");

const middleware = require("../middleware");
const { query } = require("express");

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/:name", (req, res) => {
  //   Get all articles from DB
  // console.log(`user ${req.params.name}`);
  Article.find({ "author.username": req.params.name }, (err, allArticles) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      console.log(allArticles);
      res.render("articles/user", {
        articles: allArticles.reverse(),
        currentUser: req.user,
      });
    }
  });
});

router.get("/galleries/:name", (req, res) => {
  //   Get all galleries from DB
  // console.log(`user ${req.params.name}`);
  Gallery.find({ "author.username": req.params.name }, (err, allgalleries) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      console.log(allgalleries);
      res.render("galleries/user", {
        galleries: allgalleries.reverse(),
        currentUser: req.user,
      });
    }
  });
});

module.exports = router;
