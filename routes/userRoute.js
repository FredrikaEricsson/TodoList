const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  renderReset,
  resetSubmit,
  resetParams,
  resetFormSubmit,
} = require("../controller/resetPassword");
const verifyToken = require("./middleware/userVerification");
require("dotenv").config();

let errors = [];

router.get("/register", (req, res) => {
  res.render("register.ejs", { errors });
});

router.post("/register", async (req, res) => {
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
});

router.get("/login", (req, res) => {
  res.clearCookie("jwtToken").render("login.ejs");
});

router.post("/login", async (req, res) => {
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
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken").redirect("/login");
});

router.get("/reset", renderReset);

router.post("/reset", resetSubmit);

router.get("/reset/:token", resetParams);

router.post("/resetPasswordForm", resetFormSubmit);

module.exports = router;
