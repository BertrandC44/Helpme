"use strict";

const express = require("express");
const { setTickets, findTickets } = require("./services/ticketsService");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

let ticketsRoutes = require("./routes/ticketRoutes");

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get(["/", "/tickets"], ticketsRoutes.afficherTicket);


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


































// //MiddleWhere
// app.get("/", (req, res) => {
//   res.send("Hello Wooooooooooooorld!");
// });

// app.get("/toto", (req, res) => {
//   res.send("Bonjour Toto");
// });

// //Query Parameter
// app.get("/toto/tutu", (req, res) => {
//   res.send(`Bonjour ${req.query.nom}`);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
