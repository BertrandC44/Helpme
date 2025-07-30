"use strict";

const app = require('../app');
const ticketsService = require('../services/ticketsService');
const {format} = require('date-fns');
const {EtatTicket} = require('../BO/Ticket');

function toTicketDto(ticket) {
  let copie = { ...ticket };
  copie.creation_formatted = format(ticket.creation, "dd/MM/yyyy HH:mm");
  if (ticket.description.length > 50) {
    copie.description = ticket.description.substring(0, 50) + "...";
  }
  return copie;
}

exports.afficherTicket = (req, res) => {
    //Arrange
    const allTickets = [
      {
        id: 1,
        titre: "Ticket 1",
        auteur: { name: "Alice", id: 1 },
        description: "Description du ticket 1",
        creation: new Date("2025-06-07T15:30:00Z"),
        etat: EtatTicket.OUVERT,
      },
      {
        id: 2,
        titre: "Ticket 2",
        auteur: { name: "Bob", id: 2 },
        description: "Description du ticket 2",
        creation: new Date("2025-06-07T15:35:00Z"),
        etat: EtatTicket.CLOS,
      },
      {
        id: 3,
        titre: "Ticket 3",
        auteur: { name: "Joe", id: 3 },
        description: "Description du ticket 3",
        creation: new Date("2025-06-08T15:05:00Z"),
        etat: EtatTicket.OUVERT,
      },
    ];
    ticketsService.setTickets(allTickets);

    let tickets = ticketsService.findTickets();

    for (let i = 0; i < tickets.length; i++) {
      tickets[i] = toTicketDto(tickets[i]);
    }

    res.render("liste-tickets", { tickets });
  };
