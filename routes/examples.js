const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/example1", (req, res) => {
  res.render("examples/example1", {
    // articles: allarticles.reverse(),
    currentUser: req.user,
  });
});

module.exports = router;
