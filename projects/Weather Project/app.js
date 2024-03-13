const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=13a9545c5e86269a185c350ce29a541b&units=metric";

  http.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.send(
        `<h1>The temperature in ${query} is ` +
          temp +
          " degrees Celsius</h1><br/><p>The weather is currently " +
          weatherDescription +
          "</p>" +
          "<img src=" +
          imageURL +
          ">"
      );
    });
  });
});

app.listen(3000, function () {
  console.log("server is listening on port 3000");
});
