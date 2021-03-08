const express = require("express");
const router = express.Router();
const {
  registerRender,
  registerSubmit,
} = require("../controller/registerController");
const { loginRender, loginSubmit } = require("../controller/loginController");
const {
  renderReset,
  resetSubmit,
  resetParams,
  resetFormSubmit,
} = require("../controller/resetPassword");
require("dotenv").config();

router.get("/register", registerRender);

router.post("/register", registerSubmit);

router.get("/login", loginRender);

router.post("/login", loginSubmit);

router.get("/logout", (req, res) => {
  res.clearCookie("jwtToken").redirect("/login");
});

router.get("/reset", renderReset);

router.post("/reset", resetSubmit);

router.get("/reset/:token", resetParams);

router.post("/resetPasswordForm", resetFormSubmit);

module.exports = router;
