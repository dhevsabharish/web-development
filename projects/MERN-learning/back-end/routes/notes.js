const router = require("express").Router();

let Note = require("../models/note.model.js");

router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json(err));
});

router.route("/").post((req, res) => {
  const content = req.body.content;

  const title = req.body.title;

  const noteKeyId = req.body.noteKeyId;

  const newNote = new Note({ title, content, noteKeyId });

  newNote
    .save()
    .then(() => res.json("Note added!"))
    .catch((err) => res.status(400).json(err));
});

router.route("/:noteKeyId").delete((req, res) => {
  Note.deleteOne({ noteKeyId: req.params.noteKeyId })
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
