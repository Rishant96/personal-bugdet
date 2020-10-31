// Budget API

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3200;

var bodyParser = require("body-parser");

const mongoose = require("mongoose");
const budgetsModel = require("./models/budget_schema");

let url = "mongodb://localhost:27017/budgets_db";

app.use(cors());
app.use(bodyParser.json());

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
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

app.post("/add", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      budgetsModel
        .insertMany(req.body)
        .then((data) => {
          console.log(data);
          res.json({ status: "success" });
        })
        .catch((conErr) => {
          console.log(conErr);
          res.json({ status: "db error" });
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
      res.json({ status: "conn error" });
    });
    res.json({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
