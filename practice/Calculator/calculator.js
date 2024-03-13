const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

// built-in Bodyparser Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  console.log(req.body);
  var num1 = Number(req.body.num1); // They are parsed as text
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send("The result of adding those to numbers is " + result);
});

app.post("/bmicalculator", function (req, res) {
  console.log(req.body);
  var w = parseFloat(req.body.weight);
  var h = parseFloat(req.body.height);
  res.send("Your BMI is: " + w / (h * h));
});

app.listen(3000, function () {
  console.log("server is runnning on port 3000");
});