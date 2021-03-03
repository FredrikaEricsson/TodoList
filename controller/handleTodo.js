const Todo = require("../model/todo");
const { startSession } = require("../model/user");
const User = require("../model/user");

const renderTodos = async (req, res) => {
  const sorted = +req.query.sorted || 1;
  const page = +req.query.page || 1;
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
};

const addTodo = async (req, res) => {
  const { name, date } = req.body;
  const todo = await new Todo({
    name: name,
    date: date,
  }).save();
  console.log(req.user);
  const user = await User.findOne({ _id: req.user.user._id });

  console.log(user);
  console.log(req);

  user.addTodo(todo._id);

  res.redirect("/");
};

module.exports = {
  renderTodos,
  addTodo,
};
