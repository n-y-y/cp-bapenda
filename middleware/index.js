const Article = require("../models/article");
const Gallery = require("../models/gallery");
const Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkfoundArticleOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Article.findById(req.params.id, (err, foundfoundArticle) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the foundArticle checking
        if (foundfoundArticle.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkfoundGalleryOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Gallery.findById(req.params.id, (err, foundfoundGallery) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the foundArticle checking
        if (foundfoundGallery.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
