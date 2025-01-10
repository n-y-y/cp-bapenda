const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

var referrer

router.get("/", (req, res) => {
  res.render("landing");
});

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//handle signup logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect(req.get('Referrer') || '/articles');
    });
  });
});

//show register form
router.get("/update-password", (req, res) => {
  res.render("update-password");
});


router.post("/update-password", (req, res) => {
  const { password, confirmPassword, username } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  // Proceed with updating the password
  User.findOne({ username: username }, (err, user) => {
    if (err || !user) {
      return res.status(404).send("User not found.");
    }
    user.setPassword(password, (err) => {
      if (err) {
        return res.status(500).send("Failed to update password.");
      }
      user.save((err) => {
        if (err) {
          return res.status(500).send("Error saving user.");
        }
        res.redirect(req.get('Referrer') || '/articles');
      });
    });
  });
});

// show login form
router.get("/login", (req, res) => {
  referrer = req.get("Referrer")
  res.render("login");
});

//handle login logic
// ----------> router.post('/login', middleware, callback)
// POST route for login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // if (err) {
    //   return next(err); // Pass errors to Express error handler
    // }
    // if (!user) {
    //   const redirectTo = req.get("Referrer") || "/articles/user";
    //   return res.redirect(redirectTo);
    //   // return res.redirect("/login"); // Redirect if authentication fails
    // }

    req.logIn(user, (err) => {
      // if (err) {
      //   return next(err); // Handle login errors
      // }
      // Redirect to referrer or fallback
      const redirectTo = user.username ? referrer || `/user/${user.username}` || "/articles/user" : '/login';
      return res.redirect(redirectTo);
    });
  })(req, res, next);
});

//logic route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/articles");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
