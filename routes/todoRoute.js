const express = require("express");
const Todo = require("../model/todo");
const User = require("../model/user");
const router = express.Router();
const { renderTodos, addTodo } = require("../controller/handleTodo");
const {
  nextPage,
  previousPage,
  sortTodos,
} = require("../controller/homeController");
const verifyUser = require("./middleware/userVerification");

router.get("/", verifyUser, renderTodos);

router.post("/", verifyUser, addTodo);

router.get("/next/:page:sorted", verifyUser, nextPage);

router.get("/previous/:page:sorted", verifyUser, previousPage);

router.get("/sort/:page:sorted", verifyUser, sortTodos);

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
