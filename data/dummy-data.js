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

// Datos de transacciones de ejemplo con valores positivos distribuidos en diferentes fechas
export const transaccionesEjemplo = [
  // Transacciones de Julio 2025 (mes actual)
  new Transaccion(1, 2, 1, 200.0, "01/07/2025", "11:15"),
  new Transaccion(2, 1, 2, 150.0, "03/07/2025", "12:00"),
  new Transaccion(3, 3, 1, 300.0, "05/07/2025", "13:30"),
  new Transaccion(4, 1, 3, 500.0, "07/07/2025", "09:45"),
  new Transaccion(5, 4, 1, 450.0, "10/07/2025", "10:30"),

  // Transacciones de Junio 2025
  new Transaccion(6, 5, 2, 600.0, "02/06/2025", "11:00"),
  new Transaccion(7, 2, 4, 100.0, "05/06/2025", "08:20"),
  new Transaccion(8, 3, 4, 350.0, "08/06/2025", "14:10"),
  new Transaccion(9, 4, 5, 800.0, "12/06/2025", "16:00"),
  new Transaccion(10, 1, 5, 1000.0, "15/06/2025", "17:00"),
  new Transaccion(11, 2, 3, 900.0, "18/06/2025", "10:10"),
  new Transaccion(12, 5, 3, 700.0, "22/06/2025", "12:00"),
  new Transaccion(13, 1, 2, 350.0, "25/06/2025", "15:30"),
  new Transaccion(14, 3, 5, 550.0, "28/06/2025", "18:00"),

  // Transacciones de Mayo 2025
  new Transaccion(15, 4, 5, 600.0, "03/05/2025", "19:10"),
  new Transaccion(16, 1, 4, 750.0, "07/05/2025", "09:30"),
  new Transaccion(17, 2, 1, 400.0, "11/05/2025", "14:20"),
  new Transaccion(18, 5, 2, 650.0, "15/05/2025", "16:45"),
  new Transaccion(19, 3, 1, 850.0, "19/05/2025", "11:30"),
  new Transaccion(20, 1, 3, 300.0, "23/05/2025", "13:15"),
  new Transaccion(21, 4, 2, 500.0, "27/05/2025", "17:20"),
  new Transaccion(22, 2, 5, 450.0, "30/05/2025", "10:45"),

  // Transacciones de Abril 2025
  new Transaccion(23, 5, 1, 900.0, "02/04/2025", "08:30"),
  new Transaccion(24, 1, 4, 320.0, "06/04/2025", "12:15"),
  new Transaccion(25, 3, 2, 680.0, "10/04/2025", "15:40"),
  new Transaccion(26, 2, 3, 550.0, "14/04/2025", "09:20"),
  new Transaccion(27, 4, 1, 780.0, "18/04/2025", "14:50"),
  new Transaccion(28, 1, 5, 420.0, "22/04/2025", "16:30"),
  new Transaccion(29, 5, 4, 630.0, "26/04/2025", "11:10"),
  new Transaccion(30, 2, 1, 380.0, "29/04/2025", "13:45"),

  // Transacciones de Marzo 2025
  new Transaccion(31, 1, 2, 720.0, "01/03/2025", "10:20"),
  new Transaccion(32, 3, 1, 590.0, "05/03/2025", "14:35"),
  new Transaccion(33, 4, 3, 440.0, "09/03/2025", "16:15"),
  new Transaccion(34, 1, 4, 810.0, "13/03/2025", "09:50"),
  new Transaccion(35, 5, 1, 360.0, "17/03/2025", "12:25"),
  new Transaccion(36, 2, 5, 670.0, "21/03/2025", "15:10"),
  new Transaccion(37, 1, 3, 520.0, "25/03/2025", "17:40"),
  new Transaccion(38, 4, 2, 750.0, "29/03/2025", "11:55"),

  // Transacciones de Febrero 2025
  new Transaccion(39, 3, 4, 480.0, "02/02/2025", "08:45"),
  new Transaccion(40, 1, 5, 690.0, "06/02/2025", "13:20"),
  new Transaccion(41, 2, 1, 340.0, "10/02/2025", "15:55"),
  new Transaccion(42, 5, 3, 580.0, "14/02/2025", "10:30"),
  new Transaccion(43, 4, 1, 720.0, "18/02/2025", "14:15"),
  new Transaccion(44, 1, 2, 410.0, "22/02/2025", "16:50"),
  new Transaccion(45, 3, 5, 650.0, "26/02/2025", "12:05"),

  // Transacciones de Enero 2025
  new Transaccion(46, 2, 3, 530.0, "03/01/2025", "09:15"),
  new Transaccion(47, 1, 4, 780.0, "07/01/2025", "11:40"),
  new Transaccion(48, 5, 1, 420.0, "11/01/2025", "14:25"),
  new Transaccion(49, 4, 2, 610.0, "15/01/2025", "16:10"),
  new Transaccion(50, 1, 5, 350.0, "19/01/2025", "10:55"),
  new Transaccion(51, 3, 1, 740.0, "23/01/2025", "13:30"),
  new Transaccion(52, 2, 4, 460.0, "27/01/2025", "15:45"),
  new Transaccion(53, 1, 3, 680.0, "31/01/2025", "17:20"),

  // Transacciones de Diciembre 2024
  new Transaccion(54, 4, 1, 850.0, "02/12/2024", "08:30"),
  new Transaccion(55, 1, 2, 390.0, "06/12/2024", "12:15"),
  new Transaccion(56, 5, 4, 620.0, "10/12/2024", "15:40"),
  new Transaccion(57, 2, 5, 510.0, "14/12/2024", "09:20"),
  new Transaccion(58, 3, 1, 730.0, "18/12/2024", "14:50"),
  new Transaccion(59, 1, 3, 440.0, "22/12/2024", "16:30"),
  new Transaccion(60, 4, 2, 660.0, "26/12/2024", "11:10"),
  new Transaccion(61, 2, 1, 380.0, "30/12/2024", "13:45"),

  // Transacciones de Noviembre 2024
  new Transaccion(62, 1, 5, 720.0, "01/11/2024", "10:20"),
  new Transaccion(63, 3, 1, 590.0, "05/11/2024", "14:35"),
  new Transaccion(64, 5, 3, 440.0, "09/11/2024", "16:15"),
  new Transaccion(65, 1, 4, 810.0, "13/11/2024", "09:50"),
  new Transaccion(66, 2, 1, 360.0, "17/11/2024", "12:25"),
  new Transaccion(67, 4, 2, 670.0, "21/11/2024", "15:10"),
  new Transaccion(68, 1, 5, 520.0, "25/11/2024", "17:40"),
  new Transaccion(69, 3, 4, 750.0, "29/11/2024", "11:55"),

  // Transacciones de Octubre 2024
  new Transaccion(70, 5, 1, 480.0, "02/10/2024", "08:45"),
  new Transaccion(71, 1, 3, 690.0, "06/10/2024", "13:20"),
  new Transaccion(72, 4, 1, 340.0, "10/10/2024", "15:55"),
  new Transaccion(73, 2, 4, 580.0, "14/10/2024", "10:30"),
  new Transaccion(74, 1, 2, 720.0, "18/10/2024", "14:15"),
  new Transaccion(75, 5, 1, 410.0, "22/10/2024", "16:50"),
  new Transaccion(76, 3, 5, 650.0, "26/10/2024", "12:05"),
  new Transaccion(77, 1, 4, 530.0, "30/10/2024", "09:15"),

  // Transacciones de Septiembre 2024
  new Transaccion(78, 4, 1, 780.0, "03/09/2024", "11:40"),
  new Transaccion(79, 1, 5, 420.0, "07/09/2024", "14:25"),
  new Transaccion(80, 2, 1, 610.0, "11/09/2024", "16:10"),
  new Transaccion(81, 5, 2, 350.0, "15/09/2024", "10:55"),
  new Transaccion(82, 1, 3, 740.0, "19/09/2024", "13:30"),
  new Transaccion(83, 3, 1, 460.0, "23/09/2024", "15:45"),
  new Transaccion(84, 4, 3, 680.0, "27/09/2024", "17:20"),

  // Transacciones de Agosto 2024
  new Transaccion(85, 1, 4, 850.0, "01/08/2024", "08:30"),
  new Transaccion(86, 2, 1, 390.0, "05/08/2024", "12:15"),
  new Transaccion(87, 5, 2, 620.0, "09/08/2024", "15:40"),
  new Transaccion(88, 1, 5, 510.0, "13/08/2024", "09:20"),
  new Transaccion(89, 3, 1, 730.0, "17/08/2024", "14:50"),
  new Transaccion(90, 4, 3, 440.0, "21/08/2024", "16:30"),
  new Transaccion(91, 1, 2, 660.0, "25/08/2024", "11:10"),
  new Transaccion(92, 2, 4, 380.0, "29/08/2024", "13:45"),

  // Transacciones adicionales para Julio 2024
  new Transaccion(93, 5, 1, 720.0, "02/07/2024", "10:20"),
  new Transaccion(94, 1, 5, 590.0, "06/07/2024", "14:35"),
  new Transaccion(95, 3, 1, 440.0, "10/07/2024", "16:15"),
  new Transaccion(96, 2, 3, 810.0, "14/07/2024", "09:50"),
  new Transaccion(97, 1, 2, 360.0, "18/07/2024", "12:25"),
  new Transaccion(98, 4, 1, 670.0, "22/07/2024", "15:10"),
  new Transaccion(99, 1, 4, 520.0, "26/07/2024", "17:40"),
  new Transaccion(100, 5, 1, 750.0, "30/07/2024", "11:55"),
]

// Asignar las transacciones a los perfiles correspondientes
perfiles[0].transacciones = [
  // Carlos recibe y envía - incluir todas las transacciones donde participa
  transaccionesEjemplo[0],
  transaccionesEjemplo[1],
  transaccionesEjemplo[2],
  transaccionesEjemplo[3],
  transaccionesEjemplo[4],
  transaccionesEjemplo[9],
  transaccionesEjemplo[12],
  transaccionesEjemplo[15],
  transaccionesEjemplo[16],
  transaccionesEjemplo[18],
  transaccionesEjemplo[19],
  transaccionesEjemplo[23],
  transaccionesEjemplo[26],
  transaccionesEjemplo[27],
  transaccionesEjemplo[29],
  transaccionesEjemplo[30],
  transaccionesEjemplo[31],
  transaccionesEjemplo[33],
  transaccionesEjemplo[34],
  transaccionesEjemplo[36],
  transaccionesEjemplo[39],
  transaccionesEjemplo[40],
  transaccionesEjemplo[42],
  transaccionesEjemplo[43],
  transaccionesEjemplo[46],
  transaccionesEjemplo[47],
  transaccionesEjemplo[49],
  transaccionesEjemplo[51],
  transaccionesEjemplo[53],
  transaccionesEjemplo[54],
  transaccionesEjemplo[55],
  transaccionesEjemplo[57],
  transaccionesEjemplo[58],
  transaccionesEjemplo[60],
  transaccionesEjemplo[61],
  transaccionesEjemplo[62],
  transaccionesEjemplo[64],
  transaccionesEjemplo[65],
  transaccionesEjemplo[67],
  transaccionesEjemplo[70],
  transaccionesEjemplo[71],
  transaccionesEjemplo[73],
  transaccionesEjemplo[74],
  transaccionesEjemplo[75],
  transaccionesEjemplo[77],
  transaccionesEjemplo[78],
  transaccionesEjemplo[79],
  transaccionesEjemplo[80],
  transaccionesEjemplo[81],
  transaccionesEjemplo[82],
  transaccionesEjemplo[85],
  transaccionesEjemplo[86],
  transaccionesEjemplo[87],
  transaccionesEjemplo[88],
  transaccionesEjemplo[90],
  transaccionesEjemplo[92],
  transaccionesEjemplo[93],
  transaccionesEjemplo[94],
  transaccionesEjemplo[95],
  transaccionesEjemplo[96],
  transaccionesEjemplo[97],
  transaccionesEjemplo[98],
  transaccionesEjemplo[99],
]

perfiles[1].transacciones = [
  // Maria recibe y envía
  transaccionesEjemplo[0],
  transaccionesEjemplo[1],
  transaccionesEjemplo[5],
  transaccionesEjemplo[6],
  transaccionesEjemplo[10],
  transaccionesEjemplo[12],
  transaccionesEjemplo[16],
  transaccionesEjemplo[17],
  transaccionesEjemplo[20],
  transaccionesEjemplo[21],
  transaccionesEjemplo[24],
  transaccionesEjemplo[25],
  transaccionesEjemplo[29],
  transaccionesEjemplo[30],
  transaccionesEjemplo[35],
  transaccionesEjemplo[37],
  transaccionesEjemplo[40],
  transaccionesEjemplo[43],
  transaccionesEjemplo[46],
  transaccionesEjemplo[51],
  transaccionesEjemplo[55],
  transaccionesEjemplo[56],
  transaccionesEjemplo[60],
  transaccionesEjemplo[65],
  transaccionesEjemplo[66],
  transaccionesEjemplo[72],
  transaccionesEjemplo[74],
  transaccionesEjemplo[80],
  transaccionesEjemplo[85],
  transaccionesEjemplo[86],
  transaccionesEjemplo[91],
  transaccionesEjemplo[95],
  transaccionesEjemplo[96],
]

perfiles[2].transacciones = [
  // Juan recibe y envía
  transaccionesEjemplo[2],
  transaccionesEjemplo[3],
  transaccionesEjemplo[7],
  transaccionesEjemplo[10],
  transaccionesEjemplo[11],
  transaccionesEjemplo[13],
  transaccionesEjemplo[18],
  transaccionesEjemplo[19],
  transaccionesEjemplo[24],
  transaccionesEjemplo[25],
  transaccionesEjemplo[31],
  transaccionesEjemplo[32],
  transaccionesEjemplo[36],
  transaccionesEjemplo[38],
  transaccionesEjemplo[41],
  transaccionesEjemplo[44],
  transaccionesEjemplo[46],
  transaccionesEjemplo[50],
  transaccionesEjemplo[52],
  transaccionesEjemplo[57],
  transaccionesEjemplo[62],
  transaccionesEjemplo[63],
  transaccionesEjemplo[68],
  transaccionesEjemplo[70],
  transaccionesEjemplo[75],
  transaccionesEjemplo[81],
  transaccionesEjemplo[82],
  transaccionesEjemplo[83],
  transaccionesEjemplo[88],
  transaccionesEjemplo[89],
  transaccionesEjemplo[94],
  transaccionesEjemplo[95],
]

perfiles[3].transacciones = [
  // Ana recibe y envía
  transaccionesEjemplo[4],
  transaccionesEjemplo[6],
  transaccionesEjemplo[7],
  transaccionesEjemplo[8],
  transaccionesEjemplo[14],
  transaccionesEjemplo[15],
  transaccionesEjemplo[20],
  transaccionesEjemplo[26],
  transaccionesEjemplo[27],
  transaccionesEjemplo[32],
  transaccionesEjemplo[33],
  transaccionesEjemplo[37],
  transaccionesEjemplo[38],
  transaccionesEjemplo[42],
  transaccionesEjemplo[47],
  transaccionesEjemplo[49],
  transaccionesEjemplo[51],
  transaccionesEjemplo[54],
  transaccionesEjemplo[59],
  transaccionesEjemplo[66],
  transaccionesEjemplo[68],
  transaccionesEjemplo[72],
  transaccionesEjemplo[76],
  transaccionesEjemplo[83],
  transaccionesEjemplo[89],
  transaccionesEjemplo[90],
  transaccionesEjemplo[91],
  transaccionesEjemplo[97],
  transaccionesEjemplo[98],
]

perfiles[4].transacciones = [
  // Luis recibe y envía
  transaccionesEjemplo[5],
  transaccionesEjemplo[8],
  transaccionesEjemplo[9],
  transaccionesEjemplo[11],
  transaccionesEjemplo[13],
  transaccionesEjemplo[14],
  transaccionesEjemplo[17],
  transaccionesEjemplo[21],
  transaccionesEjemplo[22],
  transaccionesEjemplo[23],
  transaccionesEjemplo[28],
  transaccionesEjemplo[34],
  transaccionesEjemplo[35],
  transaccionesEjemplo[39],
  transaccionesEjemplo[41],
  transaccionesEjemplo[44],
  transaccionesEjemplo[47],
  transaccionesEjemplo[49],
  transaccionesEjemplo[56],
  transaccionesEjemplo[62],
  transaccionesEjemplo[63],
  transaccionesEjemplo[67],
  transaccionesEjemplo[69],
  transaccionesEjemplo[75],
  transaccionesEjemplo[78],
  transaccionesEjemplo[79],
  transaccionesEjemplo[80],
  transaccionesEjemplo[86],
  transaccionesEjemplo[87],
  transaccionesEjemplo[92],
  transaccionesEjemplo[93],
  transaccionesEjemplo[99],
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

// Función para actualizar contraseña de un perfil
export const updatePerfilPassword = (perfilId, newPassword) => {
  try {
    console.log("Actualizando contraseña para perfil ID:", perfilId)

    const perfil = perfiles.find((p) => p.id === perfilId)

    if (!perfil) {
      console.log("Perfil no encontrado con ID:", perfilId)
      return {
        success: false,
        error: "Perfil no encontrado",
      }
    }

    // Actualizar contraseña
    perfil.contrasena = newPassword

    console.log("Contraseña actualizada exitosamente para:", perfil.nombre)

    return {
      success: true,
      message: "Contraseña actualizada en dummy-data",
    }
  } catch (error) {
    console.error("Error actualizando contraseña en dummy-data:", error)
    return {
      success: false,
      error: "Error al actualizar contraseña",
    }
  }
}
