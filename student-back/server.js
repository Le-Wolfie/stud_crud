const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoute = require("./routers/studentroutes");

mongoose // localhost doesn't work as i'm guessing mongo needs an ID, 127.0.0.1 does
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => {
    console.log(
      "Connected to the database, database name:" + mongoose.connection.name
    );
    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
      console.log("Connected to port " + port);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

const app = express();
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors()); // allow cross-origin requests (i don't think this is needed for this project)
app.use("/", studentRoute);
