const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

// built-in Bodyparser Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static("public"));

// Homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Setup config
mailchimp.setConfig({
  apiKey: "replace-with-your-api-key",
  server: "us6",
});

// Handling post request
// Adding new subscriber
app.post("/", function (req, res) {
  const listId = "c901f52367";
  const subscribingUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  const run = async () => {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      res.sendFile(__dirname + "/success.html");
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
    } catch (error) {
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

// Redirect to signup page in case of failure
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(
  process.env.PORT || 3000,
  console.log("Server is running on port 3000")
);
