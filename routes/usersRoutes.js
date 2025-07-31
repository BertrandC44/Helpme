const express = require("express");
const router = express.Router();
const usersService = require("../services/usersService");

router.get("/login", (req, res) => {
  res.render("login", { session: req.session });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usersService.findUserByUsernameAndPassword(username, password);

  if (user) {
    req.session.user = user;
    res.redirect("/tickets");
  } else {
    res.status(401).render("login", {
      session: req.session,
      erreurConexion: "Identifiant ou mot de passe incorrect",
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.user = undefined;
    req.session.destroy(() => {
      console.log("Session détruite");
    });
  }
  res.redirect("/tickets");
});

module.exports = router;
