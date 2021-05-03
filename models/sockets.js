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

      //Crear el siguiente ticket solicitado.
      socket.on("next-ticket", (data, callback) => {
        const { agente, escritorio } = data.usuario;
        const suTicket = this.ticketList.asignTicker(agente, escritorio);
        callback(suTicket);
        this.io.emit("ticket-asignado", this.ticketList.lastAsignNumber);
      });
    });
  }
}

module.exports = Sockets;
