const Todo = require("../model/todo");
const { startSession } = require("../model/user");
const User = require("../model/user");

const renderTodos = async (req, res) => {
  const sorted = +req.query.sorted || 1;

  const page = parseInt(req.query.page) || 1;
  console.log(page);
  const limit = 5;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id: req.user.user._id }).populate({
    path: "toDos",
    options: { sort: { date: -1 }, skip: skip, limit: limit },
  });

  res.render("index.ejs", { toDos: user.toDos, err: "", page: page });
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
