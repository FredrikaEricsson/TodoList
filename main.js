const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
let cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
require("dotenv").config();

app.use(express.static(__dirname + "/public/style"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", router);
app.use("/", userRouter);

const appStartedCallback = () => {
  console.log("app is running");
};

const databaseConnectedCallback = (err) => {
  if (err) return;
  app.listen(process.env.PORT, appStartedCallback);
};

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  databaseConnectedCallback
);
