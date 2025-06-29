class Tarjeta {
  constructor(nombre, numero, titular, fechaCaducidad, cvv, perfilId, balance = 0) {
    this.nombre = nombre
    this.numero = numero // Este es el "main key"
    this.titular = titular
    this.fechaCaducidad = fechaCaducidad
    this.cvv = cvv
    this.perfilId = perfilId // foreign key que hace referencia al id del perfil
    this.balance = balance // Nuevo campo para el saldo de la tarjeta
  }
}

export default Tarjeta
