const express = require("express");
const router = express.Router();
const { setTickets, findTickets, addTicket } = require("../services/ticketsService");
const { format } = require("date-fns");
const { body, validationResult } = require("express-validator");
const { isAuthenticated } = require("../services/authService");
const { isFormateurOrAuteur} = require("../services/authService");

function toTicketDto(ticket) {
  let copie = { ...ticket };
  copie.creation_formatted = format(ticket.creation, "dd/MM/yyyy HH:mm");
  if (ticket.description.length > 50) {
    copie.description = ticket.description.substring(0, 50) + "...";
  }
  return copie;
}

/*---Lancer la page de liste de tickets---*/
router.get(["/", "/liste-tickets"], (req, res) => {
  let tickets = findTickets();

     for (let i = 0; i < tickets.length; i++) {
       tickets[i] = toTicketDto(tickets[i]);
     }
  res.render("liste-tickets", { tickets });
});

/*---Lancer la page d'ajout de tickets---*/
router.get("/new-ticket", isAuthenticated, function (req, res) {
  res.render("new-ticket", {
    session: req.session,
    titre: "Nouveau ticket",
    ticket: null,
  });
});

router.post(
  "/tickets/enregistrer",
  isAuthenticated,
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("titre")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Maximum 50 caractères"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères")
    .isLength({ max: 2000 })
    .withMessage("Maximum 2000 caractères"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("formulaire-ticket", {
        titre: "Modification ticket",
        session: req.session,
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }

    const auteur = req.session.user;

    if (!req.body._id) {
      ticketsService.addTicket(req.body.titre, auteur, req.body.description);
    } else {
      ticketsService.updateTicket(
        req.body._id,
        req.body.titre,
        req.body.description
      );
    }

    res.redirect("/tickets");
  }
);

/* Suppression d'un ticket */
router.get(
  "/tickets/:id/supprimer",
  isFormateurOrAuteur,
  function (req, res, next) {
    ticketsService.deleteTicket(req.params.id);

    res.redirect("/tickets");
  }
);

module.exports = router;
