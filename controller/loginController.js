const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRender = (req, res) => {
  res.clearCookie("jwtToken").render("login.ejs");
};

const loginSubmit = async (req, res) => {
  const userCredentials = await User.findOne({ email: req.body.email });
  const checkedPassword = await bcrypt.compare(
    req.body.password,
    userCredentials.password
  );

  if (checkedPassword) {
    const jwtToken = await jwt.sign(
      { user: userCredentials },
      process.env.SECRET_KEY
    );

    if (jwtToken) {
      const cookie = req.cookies.jwtToken;

      if (!cookie) {
        res.cookie("jwtToken", jwtToken, { maxAge: 3600000, httpOnly: true });
      }

      return res.redirect("/");
    }
  }
  res.send("Try again");
};
module.exports = {
  loginRender,
  loginSubmit,
};
