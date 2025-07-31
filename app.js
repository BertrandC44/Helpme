const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

// Import des routers
const ticketsRoutes = require("./routes/ticketsRoutes");
const usersRoutes = require("./routes/usersRoutes");

// Utilisation des routers
app.use("/", ticketsRoutes); // toutes les routes de tickets à la racine "/"
app.use("/", usersRoutes); // toutes les routes utilisateurs à la racine "/"

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
