const express = require("express");
const router = express.Router();
const { setTickets, findTickets } = require("../services/ticketsService");

router.get(["/", "/tickets"], (req, res) => {
  // exemple d'implémentation, adapte selon ta logique
  const tickets = findTickets();
  res.render("liste-tickets", { tickets });
});

module.exports = router;
