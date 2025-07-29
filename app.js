"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

<<<<<<< Updated upstream
=======
app.use(express.static("public"));

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
app.use(express.static("public"));
app.listen(3333);

=======

app.listen(3333);



































>>>>>>> Stashed changes
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
