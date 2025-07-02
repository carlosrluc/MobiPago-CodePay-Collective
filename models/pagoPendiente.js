class PagoPendiente {
  constructor(id, servicioId, usuarioId, monto, fechaVencimiento, mes, año, pagado = false) {
    this.id = id
    this.servicioId = servicioId
    this.usuarioId = usuarioId // ID del usuario que tiene este pago pendiente
    this.monto = monto
    this.fechaVencimiento = fechaVencimiento
    this.mes = mes
    this.año = año
    this.pagado = pagado
  }
}

export default PagoPendiente
