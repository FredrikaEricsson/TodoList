const Todo = require("../model/todo");
const { startSession } = require("../model/user");
const User = require("../model/user");

const renderTodos = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id }).populate("toDos");
  console.log(user.toDos);
  res.render("index.ejs", { toDos: user.toDos, err: "" });
};

const addTodo = async (req, res) => {
  const { name, date } = req.body;
  const todo = await new Todo({
    name: name,
    date: date,
  }).save();

  const user = await User.findOne({ _id: req.user.user._id });

  user.addTodo(todo._id);

  res.redirect("/");
};

module.exports = {
  renderTodos,
  addTodo,
};
