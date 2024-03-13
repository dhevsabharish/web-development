require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfuly");
});

app.use(cors());
app.use(express.json());

const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

app.listen(port, function () {
  console.log("Server has started successfully");
});
