const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;

    this.pendientes = [];

    this.asignados = [];
  }

  get siguienteNumero() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get lastAsignNumber() {
    return this.asignados.slice(0, 13);
  }

  createTicket() {
    const nuevoTickek = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTickek);

    return nuevoTickek;
  }

  asignTicker(agente, escritorio) {
    if (this.pendientes.length === 0) {
      return null;
    }

    const nextTickek = this.pendientes.shift();

    nextTickek.agente = agente;
    nextTickek.escritorio = escritorio;

    this.asignados.unshift(nextTickek);

    return nextTickek;
  }
}

module.exports = TicketList;
