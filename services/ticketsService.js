const { EtatTicket } = require("../bo/Ticket");
const { db } = require("../app");

exports.removeAllTickets = () => {
  tickets = [];
};

exports.setTickets = (newTickets) => {
  tickets = newTickets;
};

exports.findTickets = async (filtreEtat = EtatTicket.TOUS, tri = "asc") => {
  let tabtickets;
  try {
    tabtickets = await db.collection("tickets").find().toArray();
  } catch (error) {
    throw error;
  }
  // Format de la date et tri
  tabtickets = tabtickets.map((ticket) => ({
    ...ticket,
    creation_formatted: new Date(ticket.creation).toLocaleString("fr-FR"),
  }));
  return tabtickets;
};

exports.findTicketById = (id) => {
  let ticket = tickets.find((ticket) => ticket._id == id);

  return { ...ticket }; //shallow copy
};

exports.deleteTicket = (id) => {
  tickets = tickets.filter((ticket) => ticket._id != id);
};

exports.addTicket = async (titre, auteur, description) => {
  const creation = Date.now();
  const newTicket = {
    titre,
    auteur,
    description,
    creation,
    etat: EtatTicket.OUVERT,
  };
  await db.collection("tickets").insertOne(newTicket);

  return newTicket;
};

exports.updateTicket = async (id, titre, description, etat) => {
  let index = db.collection("tickets").findIndex((ticket) => ticket._id == id);

  tickets[index] = {
    _id: id,
    titre,
    auteur: tickets[index].auteur,
    description,
    creation: tickets[index].creation,
    etat: etat != undefined ? etat : tickets[index].etat,
  };
  await db.collection("tickets").updateOne(ticket._id);
};
