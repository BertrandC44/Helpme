const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
let session = require("express-session");
const { MongoClient } = require("mongodb");

module.exports = app;

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

const uri = "mongodb://localhost:27017/HELP_ME_Correction";
const client = new MongoClient(uri);
const db = client.db("HELP_ME_Correction");
module.exports.db = db;
client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch((err) => {
    console.log("Error connecting to server:", err);
  });

app.use(express.urlencoded({ extended: false }));

// Import des routers
const ticketsRoutes = require("./routes/ticketsRoutes");
const usersRoutes = require("./routes/usersRoutes");

// Utilisation des routers
app.use("/", ticketsRoutes); // toutes les routes de tickets à la racine "/"
app.use("/", usersRoutes); // toutes les routes utilisateurs à la racine "/"

// Page d'erreur 404 
app.use(function (req, res, next) {
   res.status(404).render("erreur", {
      session: req.session,
     titre: '404',
     message:
         "L'univers est vaste, trop vaste. La ressource demandée n'a pas été trouvée. ",
     }
   );
 });

 app.use(function (err, req, res, next) {
   console.log("Erreur : " + err.message);
   res.status(500).render("erreur", {
      session: req.session,
     titre: '500',
     message:
         "Une erreur inattendue est survenue.",
     }
   );
 });

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
