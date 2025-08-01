const ticketsService = require("./ticketsService");

/**
 * Middleware de vérification de l'authentification
 */
function isAuthenticated(req, res, next) {
  if (req.session?.user) {
    return next();
  }
  res.redirect("/login");
}

/**
 * Middleware d'autorisation : formateur ou auteur du ticket
 */
async function isFormateurOrAuteur(req, res, next) {
  const ticket = await ticketsService.findTicketById(req.params.id);

  const user = req.session?.user;

  const isFormateur = user?.role === "formateur";
  const isAuteur = ticket?.auteur && user?._id === ticket.auteur._id;

  if (ticket && (isFormateur || isAuteur)) {
    return next();
  }

  res.status(403).render("templates/principal", {
    session: req.session,
    bodyFragment: "pages-fragments/erreur",
    error: {
      status: 403,
      message: "403 Forbidden",
    },
  });
}

module.exports = {
  isAuthenticated,
  isFormateurOrAuteur,
};
