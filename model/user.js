const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  token: String,
  tokenExpiration: Date,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
