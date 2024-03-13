const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

let listItems = [];
let workItems = [];

app.set("view engine", "ejs");

// built-in Bodyparser Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    listItems: listItems,
  });
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems,
  });
});

app.post("/", function (req, res) {
  if (req.body.listSubmit === "Work") {
    workItems.push(req.body.newTodo); //add todo based on whether it is form work list or home list
    res.redirect("/work");
  } else {
    listItems.push(req.body.newTodo);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server running on port 3000.");
});
