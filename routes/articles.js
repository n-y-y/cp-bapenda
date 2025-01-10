const express = require("express");
const router = express.Router({ mergeParams: true });
const Article = require("../models/article");
const middleware = require("../middleware");

router.get("/", (req, res) => {
  //Get all articles from DB
  Article.find({}, (err, allarticles) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      res.render("articles/index", {
        articles: allarticles.reverse(),
        currentUser: req.user,
      });
    }
  });
});

//CREATE- add new post to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // add new post
  var name = req.body.name;
  var imageUrl = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };

  var newArticle = {
    name: name,
    image: imageUrl,
    description: desc,
    author: author,
  };
  if (!req.user.isAdmin) res.redirect("/articles");
  //Save to database
  Article.create(newArticle, (err, newlyCreated) => {
    if (err) {
      console.log("Error in inserting into DB");
    } else {
      res.redirect("/articles");
    }
  });
});

//NEW - show form to create new articles
router.get("/publish", middleware.isLoggedIn, (req, res) => {
  res.render("articles/new");
});

//SHOW - render show template with given id
router.get("/:id", function (req, res) {
  //find the post with provided id
  Article.findById(req.params.id)
    .populate("comments")
    .exec((err, foundArticle) => {
      if (err) {
        console.log("Error occurced in finding ID");
      } else {
        //render show template with that post
        res.render("articles/show", { article: foundArticle });
      }
    });
});

//=================EDIT POST ROUTE=====================
router.get("/:id/edit", middleware.checkfoundArticleOwnership, (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    res.render("articles/edit", { article: foundArticle });
  });
});

//UPDATE POST ROUTE
router.put("/:id", middleware.checkfoundArticleOwnership, (req, res) => {
  if (!req.user.isAdmin) res.redirect("/articles");
  //find and update
  Article.findByIdAndUpdate(req.params.id, req.body.article, (err, updatedPost) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/articles/" + req.params.id);
    }
  });
});

//DESTROY POST ROUTE
router.delete("/:id", middleware.checkfoundArticleOwnership, (req, res) => {
  if (!req.user.isAdmin) res.redirect("/articles");
  Article.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/articles");
    } else {
      res.redirect("/articles");
    }
  });
});

module.exports = router;
