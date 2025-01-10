const express = require("express");
const router = express.Router();

router.get("/index", (req, res) => {
  res.render("pegawai/index", {
    currentUser: req.user,
  });
});

module.exports = router;
