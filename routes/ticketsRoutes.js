const express = require("express");
const { body, validationResult } = require("express-validator");
const { format } = require("date-fns");
const {
  deleteTicket,
  findTicketById,
  addTicket,
  updateTicket,
} = require("../services/ticketsService");
const {
  isAuthenticated,
  isFormateurOrAuteur,
} = require("../services/authService");

const router = express.Router();
const ticketsService = require('../services/ticketsService');

/**
 * Convertit un ticket pour l'affichage (DTO)
 */
function toTicketDto(ticket) {
  let copie = { ...ticket };
  copie.creation_formatted = format(ticket.creation, "dd/MM/yyyy HH:mm");
  if (ticket.description.length > 50) {
    copie.description = ticket.description.substring(0, 50) + "...";
  }
  return copie;
}

// GET /tickets ou /liste-tickets
router.get(["/", "/liste-tickets"], async (req, res) => {
  try {
    let tickets = await ticketsService.findTickets();
    res.render("liste-tickets", { tickets, session: req.session });
  } catch (error) {
    console.error("Erreur récupération tickets :", error);
    res.status(500).send("Erreur serveur");
  }
});


// GET /new-ticket
router.get("/new-ticket", isAuthenticated, (req, res) => {
  res.render("new-ticket", {
    session: req.session,
    titre: "Nouveau ticket",
    ticket: {},
    errors: [], // toujours défini pour éviter erreurs dans EJS
  });
});

// POST /tickets/enregistrer
router.post(
  "/tickets/enregistrer",
  isAuthenticated,
  body("titre")
    .trim()
    .notEmpty()
    .withMessage("Champ obligatoire")
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

    const { _id, titre, description } = req.body;
    const ticket = { _id, titre, description };

    if (!errors.isEmpty()) {
      return res.render("new-ticket", {
        session: req.session,
        titre: _id ? "Modification ticket" : "Nouveau ticket",
        ticket,
        errors: errors.array(),
      });
    }

    const auteur = req.session.user;

    if (!_id) {
      addTicket(titre, auteur, description);
    } else {
      updateTicket(_id, titre, description);
    }

    res.redirect("/liste-tickets");
  }
);

/* Affichage de la page détail d'un ticket */
router.get('/tickets/:id', async function (req, res) {
   const ticket = await ticketsService.findTicketById(req.params.id);

   if (!ticket) {
    

      throw new Error('Le ticket ' + req.params.id + " n'a pas été trouvé");
   }

   res.render("detail-ticket", {
      session: req.session,
      ticket: ticket,
   });
});

// GET /tickets/:id/supprimer
router.get("/tickets/:id/supprimer", isFormateurOrAuteur, (req, res) => {
  deleteTicket(req.params.id);
  res.redirect("/tickets");
});

module.exports = router;
