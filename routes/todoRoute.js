const express = require("express");
const Todo = require("../model/todo");
const User = require("../model/user");
const router = express.Router();
const { renderTodos, addTodo } = require("../controller/handleTodo");
const verifyUser = require("./middleware/userVerification");

router.get("/", verifyUser, renderTodos);

router.post("/", verifyUser, addTodo);

router.get("/next/:page:sorted", verifyUser, (req, res) => {
  let sorted = parseInt(req.params.sorted);
  const nextPage = parseInt(req.params.page) + 1;
  res.redirect("/?page=" + nextPage + "&sorted=" + sorted);
});

router.get("/previous/:page:sorted", verifyUser, (req, res) => {
  let sorted = parseInt(req.params.sorted);
  const previousPage = parseInt(req.params.page) - 1;
  res.redirect("/?page=" + previousPage + "&sorted=" + sorted);
});

router.get("/sort/:page:sorted", verifyUser, (req, res) => {
  let page = parseInt(req.params.page);
  let sorted = parseInt(req.params.sorted);
  if (sorted === -1) {
    sorted = 1;
  } else {
    sorted = -1;
  }
  res.redirect("/?page=" + page + "&sorted=" + sorted);
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
  await User.updateMany(
    {},
    {
      $pull: { toDos: { $in: [req.params.id] } },
    },
    { multi: true }
  );
  res.redirect("/");
});

module.exports = router;
