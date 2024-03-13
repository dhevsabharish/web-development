const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

// built-in Bodyparser Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-dhev:Nms3d9FXP3ZBgWp@cluster0.0j61i.mongodb.net/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useFindAndModify", false);

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app

  .route("/articles")

  .get(function (req, res) {
    Article.find({}, function (err, articles) {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (err) {
      if (!err) {
        res.send("successfully saved article");
      } else {
        res.send("error saving article");
      }
    });
  })

  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("successfully deleted");
      } else {
        res.send(err);
      }
    });
  });

app

  .route("/articles/:articleTitle")

  .get(function (req, res) {
    Article.findOne(
      { title: req.params.articleTitle },
      function (err, foundArticle) {
        if (!err) {
          res.send(foundArticle);
        } else {
          res.send(err);
        }
      }
    );
  })

  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("successfully updated");
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("successfully updated");
          console.log(req.body);
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) {
        res.send("successfully deleted");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function () {
  console.log("Server has started successfully");
});
