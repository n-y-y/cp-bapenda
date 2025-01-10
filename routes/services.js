const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/pbb", (req, res) => {
    res.render("services/pbb", {
        // articles: allarticles.reverse(),
        currentUser: req.user,
    });
});
router.get("/pbhtb", (req, res) => {
    res.render("services/pbhtb", {
        // articles: allarticles.reverse(),
        currentUser: req.user,
    });
});
router.get("/pdl", (req, res) => {
    res.render("services/pdl", {
        // articles: allarticles.reverse(),
        currentUser: req.user,
    });
});

module.exports = router;
