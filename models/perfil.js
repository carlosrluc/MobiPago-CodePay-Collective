class Perfil {
  constructor(id, nombre, apellidos, usuario, contrasena, transacciones, telefono, fotoPerfil = null) {
    this.id = id
    this.nombre = nombre
    this.apellidos = apellidos
    this.usuario = usuario
    this.contrasena = contrasena
    this.transacciones = transacciones // Array de transacciones
    this.telefono = telefono
    this.fotoPerfil = fotoPerfil // URI de la imagen o base64
    // Removido el campo balance
  }
}

export default Perfil
