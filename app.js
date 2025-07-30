"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static("public"));


// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

let message = "je suis un super message";

app.get("/", (req, res) => {
  res.render("liste-tickets", {
    message: message,
    monInfo: "Ras le cul",
    condition: true,
  });
});

app.listen(3333);




































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
