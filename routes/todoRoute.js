const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.query);

  res.render("index.ejs");
});

module.exports = router;
