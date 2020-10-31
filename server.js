// Budget API

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3200;

const mongoose = require("mongoose");
const budgetsModel = require("./models/budget_schema");

let url = "mongodb://localhost:27017/budgets_db";

app.use(cors());

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      budgetsModel
        .find({})
        .then((data) => {
          res.json(data);
        })
        .catch((conErr) => {
          console.log(conErr);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
