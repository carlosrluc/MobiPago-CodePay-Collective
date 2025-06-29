import Perfil from "../models/perfil.js"
import Tarjeta from "../models/tarjeta.js"
import Transaccion from "../models/transaccion.js"

// Instancias de perfiles con correos electrónicos como usuario
export const perfiles = [
  new Perfil(1, "Carlos R.", "Lucar", "carlos.lucar@gmail.com", "password123", [], "999 999 999"),
  new Perfil(2, "Maria A.", "Lopez", "maria.lopez@gmail.com", "password456", [], "888 888 888"),
  new Perfil(3, "Juan P.", "Gonzalez", "juan.gonzalez@gmail.com", "password789", [], "777 777 777"),
  new Perfil(4, "Ana M.", "Martínez", "ana.martinez@gmail.com", "password101", [], "666 666 666"),
  new Perfil(5, "Luis G.", "Fernández", "luis.fernandez@gmail.com", "password202", [], "555 555 555"),
]

// Datos de transacciones de ejemplo con valores positivos (sin valores negativos)
export const transaccionesEjemplo = [
  new Transaccion(1, 2, 1, 200.0, "12/05/2025", "11:15"), // De Carlos a Maria
  new Transaccion(2, 1, 2, 150.0, "12/05/2025", "12:00"), // De Maria a Carlos
  new Transaccion(3, 3, 1, 300.0, "12/05/2025", "13:30"), // De Carlos a Juan
  new Transaccion(4, 1, 3, 500.0, "12/06/2025", "09:45"), // De Juan a Carlos
  new Transaccion(5, 4, 1, 450.0, "12/06/2025", "10:30"), // De Carlos a Ana
  new Transaccion(6, 5, 2, 600.0, "12/06/2025", "11:00"), // De Maria a Luis
  new Transaccion(7, 2, 4, 100.0, "12/07/2025", "08:20"), // De Ana a Maria
  new Transaccion(8, 3, 4, 350.0, "12/07/2025", "14:10"), // De Ana a Juan
  new Transaccion(9, 4, 5, 800.0, "12/07/2025", "16:00"), // De Luis a Ana
  new Transaccion(10, 1, 5, 1000.0, "12/07/2025", "17:00"), // De Luis a Carlos
  new Transaccion(11, 2, 3, 900.0, "12/08/2025", "10:10"), // De Juan a Maria
  new Transaccion(12, 5, 3, 700.0, "12/08/2025", "12:00"), // De Juan a Luis
  new Transaccion(13, 1, 2, 350.0, "12/09/2025", "15:30"), // De Maria a Carlos
  new Transaccion(14, 3, 5, 550.0, "12/09/2025", "18:00"), // De Luis a Juan
  new Transaccion(15, 4, 5, 600.0, "12/09/2025", "19:10"), // De Luis a Ana
]

// Asignar las transacciones a los perfiles correspondientes
perfiles[0].transacciones = [
  transaccionesEjemplo[0], // Envió a Maria
  transaccionesEjemplo[1], // Recibió de Maria
  transaccionesEjemplo[2], // Envió a Juan
  transaccionesEjemplo[3], // Recibió de Juan
  transaccionesEjemplo[4], // Envió a Ana
  transaccionesEjemplo[9], // Recibió de Luis
  transaccionesEjemplo[12], // Recibió de Maria
]

perfiles[1].transacciones = [
  transaccionesEjemplo[0], // Recibió de Carlos
  transaccionesEjemplo[1], // Envió a Carlos
  transaccionesEjemplo[5], // Envió a Luis
  transaccionesEjemplo[6], // Recibió de Ana
  transaccionesEjemplo[10], // Recibió de Juan
  transaccionesEjemplo[12], // Envió a Carlos
]

perfiles[2].transacciones = [
  transaccionesEjemplo[2], // Recibió de Carlos
  transaccionesEjemplo[3], // Envió a Carlos
  transaccionesEjemplo[7], // Recibió de Ana
  transaccionesEjemplo[10], // Envió a Maria
  transaccionesEjemplo[11], // Recibió de Luis
  transaccionesEjemplo[13], // Recibió de Luis
]

perfiles[3].transacciones = [
  transaccionesEjemplo[4], // Recibió de Carlos
  transaccionesEjemplo[6], // Envió a Maria
  transaccionesEjemplo[7], // Envió a Juan
  transaccionesEjemplo[8], // Envió a Luis
  transaccionesEjemplo[14], // Recibió de Luis
]

perfiles[4].transacciones = [
  transaccionesEjemplo[5], // Recibió de Maria
  transaccionesEjemplo[8], // Recibió de Ana
  transaccionesEjemplo[9], // Envió a Carlos
  transaccionesEjemplo[11], // Envió a Juan
  transaccionesEjemplo[13], // Envió a Juan
  transaccionesEjemplo[14], // Envió a Ana
]

// Instancias de tarjetas con balance incluido
export const tarjetas = [
  new Tarjeta("Cuentas De Ahorro", "4532123456789014", "Carlos R. Lucar", "12/27", "123", perfiles[0].id, 12000),
  new Tarjeta("Tarjeta Secundaria Carlos", "4532234567890123", "Carlos R. Lucar", "12/26", "321", perfiles[0].id, 8500),
  new Tarjeta("Tarjeta Principal Maria", "5555444433332222", "Maria A. Lopez", "08/26", "456", perfiles[1].id, 15000),
  new Tarjeta("Tarjeta Secundaria Maria", "5555555544443333", "Maria A. Lopez", "09/27", "654", perfiles[1].id, 7200),
  new Tarjeta("Tarjeta Principal Juan", "6666777788889999", "Juan P. Gonzalez", "05/24", "789", perfiles[2].id, 5000),
  new Tarjeta("Tarjeta Secundaria Juan", "6666888877776666", "Juan P. Gonzalez", "06/25", "987", perfiles[2].id, 3400),
  new Tarjeta("Tarjeta Principal Ana", "7777888899990000", "Ana M. Martínez", "11/26", "112", perfiles[3].id, 8000),
  new Tarjeta("Tarjeta Secundaria Ana", "7777999988880000", "Ana M. Martínez", "07/27", "211", perfiles[3].id, 4600),
  new Tarjeta("Tarjeta Principal Luis", "8888999900001111", "Luis G. Fernández", "01/25", "334", perfiles[4].id, 10000),
  new Tarjeta("Tarjeta Secundaria Luis", "8888111199990000", "Luis G. Fernández", "03/25", "433", perfiles[4].id, 6800),
]

// Mantener compatibilidad con código existente
export const tarjeta = tarjetas[0]

// Exportar el perfil principal (Carlos) para compatibilidad
export const perfil = perfiles[0]

// Función helper para obtener un perfil por ID
export const getPerfilById = (id) => {
  return perfiles.find((perfil) => perfil.id === id)
}

// Función helper para obtener un perfil por email
export const getPerfilByEmail = (email) => {
  return perfiles.find((perfil) => perfil.usuario === email)
}

// Función helper para obtener tarjetas por perfil ID
export const getTarjetasByPerfilId = (perfilId) => {
  return tarjetas.filter((tarjeta) => tarjeta.perfilId === perfilId)
}

// Función helper para obtener el balance total de un perfil (suma de todas sus tarjetas)
export const getBalanceTotalByPerfilId = (perfilId) => {
  const tarjetasPerfil = getTarjetasByPerfilId(perfilId)
  return tarjetasPerfil.reduce((total, tarjeta) => total + tarjeta.balance, 0)
}

// Función helper para obtener la primera tarjeta de un perfil
export const getPrimeTarjetaByPerfilId = (perfilId) => {
  const tarjetasPerfil = getTarjetasByPerfilId(perfilId)
  return tarjetasPerfil.length > 0 ? tarjetasPerfil[0] : null
}

// Función para agregar una nueva transacción
export const agregarTransaccion = (nuevaTransaccion) => {
  // Generar nuevo ID
  const nuevoId = Math.max(...transaccionesEjemplo.map((t) => t.id)) + 1
  nuevaTransaccion.id = nuevoId

  // Agregar a la lista global
  transaccionesEjemplo.push(nuevaTransaccion)

  // Agregar a los perfiles correspondientes
  const perfilRemitente = getPerfilById(nuevaTransaccion.idRemitente)
  const perfilDestinatario = getPerfilById(nuevaTransaccion.idDestinatario)

  if (perfilRemitente) {
    perfilRemitente.transacciones.unshift(nuevaTransaccion)
  }

  if (perfilDestinatario) {
    perfilDestinatario.transacciones.unshift(nuevaTransaccion)
  }

  return nuevaTransaccion
}

// Función para actualizar balance de tarjeta
export const actualizarBalanceTarjeta = (numeroTarjeta, nuevoBalance) => {
  const tarjeta = tarjetas.find((t) => t.numero === numeroTarjeta)
  if (tarjeta) {
    tarjeta.balance = nuevoBalance
    return true
  }
  return false
}

// Función para realizar transferencia
export const realizarTransferencia = (idRemitente, idDestinatario, monto, tarjetaOrigenNumero) => {
  try {
    // Encontrar tarjeta origen
    const tarjetaOrigen = tarjetas.find((t) => t.numero === tarjetaOrigenNumero)
    if (!tarjetaOrigen) {
      throw new Error("Tarjeta origen no encontrada")
    }

    // Encontrar primera tarjeta del destinatario
    const tarjetaDestino = getPrimeTarjetaByPerfilId(idDestinatario)
    if (!tarjetaDestino) {
      throw new Error("Tarjeta destino no encontrada")
    }

    // Verificar saldo suficiente
    if (tarjetaOrigen.balance < monto) {
      throw new Error("Saldo insuficiente")
    }

    // Realizar transferencia
    tarjetaOrigen.balance -= monto
    tarjetaDestino.balance += monto

    // Crear fecha y hora actual
    const ahora = new Date()
    const fecha = ahora.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const hora = ahora.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    // Crear nueva transacción
    const nuevaTransaccion = new Transaccion(null, idDestinatario, idRemitente, monto, fecha, hora)

    // Agregar transacción
    agregarTransaccion(nuevaTransaccion)

    return {
      success: true,
      transaccion: nuevaTransaccion,
      tarjetaDestino: tarjetaDestino.numero,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}
