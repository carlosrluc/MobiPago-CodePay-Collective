class Perfil {
  constructor(id, nombre, apellidos, usuario, contrasena, transacciones, telefono, dni = null) {
    this.id = id
    this.nombre = nombre
    this.apellidos = apellidos
    this.usuario = usuario
    this.contrasena = contrasena
    this.transacciones = transacciones // Array de transacciones
    this.telefono = telefono
    this.dni = dni // Agregar campo DNI
    // Removido el campo balance
  }
}

export default Perfil
