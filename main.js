const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/todoRoute");
const app = express();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", router);

const appStartedCallback = () => {
  console.log("app is running ");
};

const databaseConnectedCallback = (err) => {
  if (err) return;
  app.listen(5504, appStartedCallback);
};

mongoose.connect(
  "mongodb+srv://fredrika:hejhejhej@cluster0.ftmyu.mongodb.net/todo_list?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  databaseConnectedCallback
);
