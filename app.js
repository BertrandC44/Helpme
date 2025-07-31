const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
let session = require("express-session");


let sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 5 * 60 * 1000 }, // 5 minutes
  httpOnly: true,
  secure: false, // Set to true if using HTTPS
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sess));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

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
