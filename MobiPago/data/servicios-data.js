import Servicio from "../models/servicio.js"

// Servicios con montos realistas según el tipo de empresa
export const servicios = [
  // Servicios básicos
  new Servicio(1, "SEDAPAL", "agua", 180, "123456789", "Servicio de agua potable"),
  new Servicio(2, "Enel Distribución Perú", "luz", 120, "987654321", "Servicio de energía eléctrica"),
  new Servicio(3, "Luz del Sur", "luz", 110, "111222333", "Servicio de energía eléctrica"),
  new Servicio(4, "Calidda", "gas", 85, "444555666", "Distribución de gas natural"),

  // Telecomunicaciones
  new Servicio(5, "Movistar", "telefonia", 89, "777888999", "Plan móvil postpago"),
  new Servicio(6, "Claro", "telefonia", 79, "111000222", "Plan móvil postpago"),
  new Servicio(7, "Entel", "telefonia", 75, "333444555", "Plan móvil postpago"),
  new Servicio(8, "Bitel", "telefonia", 65, "666777888", "Plan móvil postpago"),
  new Servicio(9, "WIN Internet", "internet", 95, "999000111", "Internet fibra óptica"),
  new Servicio(10, "DIRECTV Perú", "television", 125, "222333444", "Televisión satelital"),

  // Seguros
  new Servicio(11, "Rimac Seguros", "seguros", 250, "555666777", "Seguro vehicular"),
  new Servicio(12, "Pacífico Seguros", "seguros", 230, "888999000", "Seguro de vida"),
  new Servicio(13, "Mapfre Perú", "seguros", 220, "111222333", "Seguro del hogar"),
  new Servicio(14, "La Positiva", "seguros", 200, "444555666", "Seguro vehicular"),
  new Servicio(15, "Interseguro", "seguros", 280, "777888999", "Seguro de salud"),

  // Transporte
  new Servicio(16, "Cruz del Sur", "transporte", 45, "000111222", "Pasaje interprovincial"),
  new Servicio(17, "Oltursa", "transporte", 40, "333444555", "Pasaje interprovincial"),
  new Servicio(18, "Línea 1 del Metro de Lima", "transporte", 35, "666777888", "Tarjeta de metro"),

  // Servicios gubernamentales
  new Servicio(19, "SUNAT", "gobierno", 150, "999000111", "Impuestos y tributos"),
  new Servicio(20, "EsSalud", "gobierno", 120, "222333444", "Seguro social de salud"),
  new Servicio(21, "SENCICO", "gobierno", 80, "555666777", "Aporte construcción civil"),

  // Educación
  new Servicio(22, "Pontificia Universidad Católica del Perú", "educacion", 2500, "888999000", "Pensión universitaria"),
  new Servicio(23, "Universidad de Lima", "educacion", 2200, "111222333", "Pensión universitaria"),
  new Servicio(24, "Universidad ESAN", "educacion", 2800, "444555666", "Pensión universitaria"),
  new Servicio(25, "Universidad San Ignacio de Loyola", "educacion", 1800, "777888999", "Pensión universitaria"),

  // Retail y servicios
  new Servicio(26, "Sodexo", "servicios", 300, "000111222", "Vales de alimentación"),
  new Servicio(27, "Glovo", "delivery", 25, "333444555", "Suscripción Glovo Prime"),
  new Servicio(28, "Rappi", "delivery", 20, "666777888", "Suscripción Rappi Prime"),

  // Automotriz (cuotas de vehículos)
  new Servicio(29, "Nissan", "automotriz", 1200, "999000111", "Cuota vehicular"),
  new Servicio(30, "Toyota Perú", "automotriz", 1350, "222333444", "Cuota vehicular"),
  new Servicio(31, "Honda Perú", "automotriz", 950, "555666777", "Cuota vehicular"),
  new Servicio(32, "Kia Motors", "automotriz", 850, "888999000", "Cuota vehicular"),
  new Servicio(33, "Chevrolet", "automotriz", 1100, "111222333", "Cuota vehicular"),

  // Bancos (tarjetas de crédito)
  new Servicio(34, "Banco de Crédito del Perú", "bancario", 450, "444555666", "Tarjeta de crédito"),
  new Servicio(35, "Interbank", "bancario", 380, "777888999", "Tarjeta de crédito"),
  new Servicio(36, "BBVA", "bancario", 420, "000111222", "Tarjeta de crédito"),
  new Servicio(37, "Scotiabank", "bancario", 350, "333444555", "Tarjeta de crédito"),

  // Combustibles
  new Servicio(38, "Repsol", "combustible", 300, "666777888", "Tarjeta de combustible"),
  new Servicio(39, "Primax", "combustible", 280, "999000111", "Tarjeta de combustible"),
  new Servicio(40, "Petroperú", "combustible", 250, "222333444", "Tarjeta de combustible"),

  // Entretenimiento
  new Servicio(41, "Netflix", "entretenimiento", 35, "555666777", "Suscripción streaming"),
  new Servicio(42, "Spotify", "entretenimiento", 20, "888999000", "Suscripción música"),
  new Servicio(43, "Amazon Prime", "entretenimiento", 25, "111222333", "Suscripción Prime"),

  // Retail
  new Servicio(44, "Saga Falabella", "retail", 200, "444555666", "Tarjeta de crédito"),
  new Servicio(45, "Ripley", "retail", 180, "777888999", "Tarjeta de crédito"),
  new Servicio(46, "Oechsle", "retail", 150, "000111222", "Tarjeta de crédito"),

  // Servicios adicionales
  new Servicio(47, "Zeta Gas", "gas", 75, "333444555", "Gas doméstico"),
  new Servicio(48, "Solgas", "gas", 80, "666777888", "Gas doméstico"),
  new Servicio(49, "Serpost", "correos", 15, "999000111", "Servicio postal"),
  new Servicio(50, "DHL Perú", "correos", 45, "222333444", "Servicio de courier"),
]

// Función para buscar servicios SOLO por nombre
export const buscarServicios = (termino) => {
  if (!termino || termino.length < 2) return []

  return servicios.filter((servicio) => servicio.nombre.toLowerCase().includes(termino.toLowerCase()))
}

// Función para obtener servicio por ID
export const obtenerServicioPorId = (id) => {
  return servicios.find((servicio) => servicio.id === id)
}

// Función para realizar pago de servicio
export const realizarPagoServicio = (servicio, tarjeta) => {
  if (!servicio || !tarjeta) {
    return { success: false, error: "Datos inválidos" }
  }

  if (tarjeta.balance < servicio.montoMensual) {
    return { success: false, error: "Saldo insuficiente" }
  }

  // Descontar del saldo de la tarjeta
  tarjeta.balance -= servicio.montoMensual

  return {
    success: true,
    message: `Pago de S/ ${servicio.montoMensual.toFixed(2)} realizado exitosamente`,
    nuevoSaldo: tarjeta.balance,
  }
}
