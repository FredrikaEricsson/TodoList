const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
  "mongodb+srv://fredrika:hejhejhej@cluster0.ftmyu.mongodb.net/todo_list?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return;
    app.listen(process.env.PORT || 5500, () => {
      console.log("app is running ");
    });
  }
);
