const Todo = require("../model/todo");
const { startSession } = require("../model/user");
const User = require("../model/user");

const renderTodos = async (req, res) => {
  const sorted = parseInt(req.query.sorted) || -1;

  const page = parseInt(req.query.page) || 1;

  const limit = 5;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id: req.user.user._id }).populate({
    path: "toDos",
    options: { sort: { date: sorted }, skip: skip, limit: limit },
  });
  const allTodos = await User.findOne({ _id: req.user.user._id }).populate({
    path: "toDos",
  });

  res.render("index.ejs", {
    user: user,
    toDos: user.toDos,
    allTodos: allTodos.toDos,
    err: "",
    page: page,
    sorted: sorted,
  });
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
