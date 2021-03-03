const mongoose = require("mongoose");
const User = require("./user");

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 18 },
  date: { type: Date, default: Date.now },
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
