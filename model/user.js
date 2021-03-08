const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  token: String,
  tokenExpiration: Date,
  toDos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todo",
    },
  ],
});

userSchema.methods.addTodo = function (todoID) {
  this.toDos.push(todoID);

  this.save();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
