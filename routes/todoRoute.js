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
  try {
    await new Todo({
      name: req.body.name,
    }).save();
    res.redirect("/");
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

router.get("/edit/:id", async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  res.render("edit.ejs", { todo: todo });
});

router.post("/edit", async (req, res) => {
  await Todo.updateOne(
    { _id: req.body.id },
    {
      name: req.body.name,
    }
  );
  res.redirect("/");
});

module.exports = router;
