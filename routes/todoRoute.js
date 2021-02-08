const express = require("express");
const Todo = require("../model/todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const sorted = +req.query.sorted || 1;
  const page = +req.query.page || 1;
  try {
    const allTodos = await Todo.find().countDocuments();
    const todosPerPage = 5;
    const numberOfPages = Math.ceil(allTodos / todosPerPage);
    const displayedTodos = todosPerPage * page;
    const todos = await Todo.find()

      .limit(displayedTodos)
      .sort({ date: sorted });
    res.render("index.ejs", {
      todos,
      allTodos,
      numberOfPages,
      displayedTodos,
      todosPerPage,
      errors: "empty",
    });
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    await new Todo({
      name: req.body.name,
      date: req.body.date,
    }).save();
    res.redirect("/");
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

router.get("/edit/:id", async (req, res) => {
  const todos = await Todo.findOne({ _id: req.params.id });
  res.render("edit.ejs", { todos: todos });
});

router.post("/edit", async (req, res) => {
  await Todo.updateOne({ _id: req.body.id }, { name: req.body.name });
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

module.exports = router;
