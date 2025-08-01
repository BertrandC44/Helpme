const express = require("express");
const router = express.Router();
const usersService = require("../services/usersService");

// GET - Page de connexion
router.get("/login", (req, res) => {
  res.render("login", { session: req.session });
});

// POST - Traitement du formulaire de login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usersService.findUserByUsernameAndPassword(username, password);

  if (user) {
    req.session.user = user;
    res.redirect("/liste-tickets");
  } else {
    res.status(401).render("login", {
      session: req.session,
      erreurConexion: "Identifiant et/ou mot de passe incorrect",
    });
  }
});

// GET - Déconnexion
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.user = undefined;
    req.session.destroy(() => {
      console.log("Session détruite");
    });
  }
  res.redirect("/liste-tickets");
});

module.exports = router;
