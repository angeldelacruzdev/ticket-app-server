const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    //instancia de TicketList
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Escuchar evento: mensaje-to-server
      socket.on("solicitar-ticket", (_, callback) => {
        const nuevoTickek = this.ticketList.createTicket();
        callback(nuevoTickek);
      });
    });
  }
}

module.exports = Sockets;
