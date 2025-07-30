const { Ticket, EtatTicket } = require("../BO/Ticket");

let tickets = [];

function addTicket(auteur, titre, description) {
  const id = tickets.length + 1;
  const ticket = new Ticket(id, auteur, titre, description);
  tickets.push(ticket);
  return ticket;
}

function findTickets() {
  return [...tickets].sort((a, b) => a.creation - b.creation);
}

function setTickets(newTickets) {
  tickets = newTickets.map((ticket) => ({
    ...ticket,
    creation: new Date(ticket.creation),
  }));
}

module.exports = { addTicket, findTickets, setTickets };
