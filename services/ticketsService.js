const { Ticket, EtatTicket } = require("../BO/Ticket");

let tickets = [
  {
    id: 1,
    titre: "Ticket 1",
    auteur: { id: 2, name: "Alice" },
    description: "Description du ticket 1",
    creation: new Date("2025-06-07T15:30:00Z"),
    etat: EtatTicket.OUVERT,
  },
  {
    id: 2,
    titre: "Ticket 2",
    auteur: { id: 3, name: "Bob" },
    description: "Description du ticket 2",
    creation: new Date("2025-06-07T15:35:00Z"),
    etat: EtatTicket.CLOS,
  },
  {
    id: 3,
    titre: "Ticket 3",
    auteur: { id: 3, name: "Bob" },
    description: "Description du ticket 3",
    creation: new Date("2025-06-08T15:05:00Z"),
    etat: EtatTicket.OUVERT,
  },
];
let idx = 4;

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
