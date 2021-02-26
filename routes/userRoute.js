const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let errors = [];

router.get("/register", (req, res) => {
  res.render("register.ejs", { errors });
});

router.post("/register", async (req, res) => {
  if (!req.body.name) {
    errors.push("Name is required");
  }

  if (!req.body.password) {
    errors.push("Password is required");
  }

  if (!req.body.name || !req.body.password) {
    res.render("register.ejs", { errors });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  });
  console.log(user);
  await user.save();

  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const userCredentials = await User.findOne({ name: req.body.name });

  if (userCredentials.name === name && userCredentials.password === password) {
    res.redirect("/");
  }
  res.send("Try again");
});
module.exports = router;
