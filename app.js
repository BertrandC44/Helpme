"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//MiddleWhere
app.get("/", (req, res) => {
  res.send("Hello Wooooooooooooorld!");
});

app.get("/toto", (req, res) => {
  res.send("Bonjour Toto");
});

//Query Parameter
app.get("/toto/tutu", (req, res) => {
  res.send(`Bonjour ${req.query.nom}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
