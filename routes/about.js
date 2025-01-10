const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.render("about/index", {
    // articles: allarticles.reverse(),
    currentUser: req.user,
  });
});

module.exports = router;
