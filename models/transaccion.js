class Transaccion {
  constructor(id, idDestinatario, idRemitente, monto, fecha, hora) {
    this.id = id; // Main key
    this.idDestinatario = idDestinatario; // Foreign key que hace referencia al perfil destinatario
    this.idRemitente = idRemitente; // Foreign key que hace referencia al perfil remitente
    this.monto = monto;
    this.fecha = fecha;
    this.hora = hora;
  }
}

export default Transaccion;
