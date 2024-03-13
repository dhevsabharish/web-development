// const insertDocuments = function (db, callback) {
//   // Get the documents collection
//   const collection = db.collection("series");
//   // Insert some documents
//   collection.insertMany(
//     [
//       { name: "Breaking Bad", popularityRanking: 1, rating: 8.5 },
//       { name: "Game of Thrones", popularityRanking: 2, rating: 9 },
//       { name: "Vikings", popularityRanking: 3, rating: 8.5 },
//     ],
//     function (err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     }
//   );
// };

// const findDocuments = function (db, callback) {
//   // Get the documents collection
//   const collection = db.collection("series");
//   // Find some documents
//   collection.find({}).toArray(function (err, series) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(series);
//     callback(series);
//   });
// };

require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  const seriesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Every series needs a name"],
    },
    popularityRanking: Number,
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
  });

  const Series = mongoose.model("Series", seriesSchema);

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteSeries: seriesSchema,
  });

  const Person = mongoose.model("Person", personSchema);

  const series = new Series({
    name: "Breaking Bad",
    popularityRanking: 1,
    rating: 8.5,
  });

  const aot = new Series({
    name: "Attack on Titan",
    popularityRanking: 6,
    rating: 10,
  });

  const office = new Series({
    name: "Office",
    popularityRanking: 4,
    rating: 8,
  });

  const person = new Person({
    name: "Nikhil",
    age: 19,
    favouriteSeries: office,
  });

  aot.save();
  Person.deleteOne({ age: 19 }, function (err) { });
  person.save();

  const vikings = new Series({
    name: "Vikings",
    popularityRanking: 3,
    rating: 8.5,
  });

  Series.insertMany([vikings, office], function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added vikings, office");
    }
  });

  Person.updateOne(
    { _id: "60fe401278884b0b64c62b3d" },
    { favouriteSeries: aot },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully updated");
      }
    }
  );

  Person.find(function (err, people) {
    if (err) {
      console.log(err);
    } else {
      people.forEach((person) => {
        console.log(person.name);
      });
    }
  });
});
