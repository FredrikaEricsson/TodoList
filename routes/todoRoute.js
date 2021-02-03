const express = require("express");
const Todo = require("../model/todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Todo.find();
    res.render("index.ejs", { data: data, error: "empty" });
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body.name);
  try {
    await new Todo({
      name: req.body.name,
    }).save();
    res.redirect("/");
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

module.exports = router;
