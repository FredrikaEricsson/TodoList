const express = require("express");
const mongoose = require("mongoose");
const user = require("../model/user");
const router = express.Router();

let errors = [];

router.get("/register", (req, res) => {
  res.render("register.ejs", { errors });
});

router.post("/register", async (req, res) => {
  if (!req.body.name) {
    errors.push(" Name is required");
  }

  if (!req.body.password) {
    errors.push(" password is required");
  }

  if (!req.body.name || !req.body.password) {
    res.render("register.ejs", { errors });
  }

  const user = await new user({
    name: req.body.name,
    password: req.body.password,
  }).save();
  console.log(user);

  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const username = await user.find({ name: name });
  const userPass = await user.find({ password: password });
  if (username[0].name === name && userPass[0].password === password) {
    res.send("Welcome");
  }
  res.send("Try again");
});
module.exports = router;
