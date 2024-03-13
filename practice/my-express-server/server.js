const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1> Hello, World! </h1>");
});

app.get("/contact", function (req, res) {
  res.send("contact me at: dhevsabharish@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("Hey! This is Dhev! I love code");
});

app.get("/hobbies", function (req, res) {
  res.send(
    "<ol><li> coffee </li><li> cricket </li><li> web dev </li><li> anime </li></ol> <h1> hello bro </h1>"
  );
});

app.listen(3000, function () {
  console.log("server started at port 3000");
});

