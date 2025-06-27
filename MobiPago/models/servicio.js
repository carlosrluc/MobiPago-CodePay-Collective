class Servicio {
  constructor(id, nombre, categoria, montoMensual, numeroCliente, descripcion) {
    this.id = id
    this.nombre = nombre
    this.categoria = categoria // agua, luz, gas, telefonia, seguros, etc.
    this.montoMensual = montoMensual
    this.numeroCliente = numeroCliente
    this.descripcion = descripcion
  }
}

export default Servicio
