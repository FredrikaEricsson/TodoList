const User = require("../model/user");
const bcrypt = require("bcrypt");

let errors = [];

const registerRender = (req, res) => {
  res.render("register.ejs", { errors });
};

const registerSubmit = async (req, res) => {
  if (!req.body.name) {
    errors.push("Användarnamn krävs");
  }

  if (!req.body.email) {
    errors.push("E-post krävs");
  }

  if (!req.body.password) {
    errors.push("Lösenord krävs");
  }

  if (!req.body.name || !req.body.password) {
    res.render("register.ejs", { errors });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  res.redirect("/");
};
module.exports = {
  registerRender,
  registerSubmit,
};
