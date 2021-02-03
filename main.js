const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/todoRoute");
const app = express();
require("dotenv").config();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", router);

const appStartedCallback = () => {
  console.log("app is running ");
};

const databaseConnectedCallback = (err) => {
  if (err) return;
  app.listen(process.env.PORT, appStartedCallback);
};

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  databaseConnectedCallback
);
