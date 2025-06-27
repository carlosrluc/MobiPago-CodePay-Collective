"use client"

import { createContext, useContext, useState } from "react"
import { perfiles, getPrimeTarjetaByPerfilId } from "../data/dummy-data"

const PerfilContext = createContext()

export const usePerfil = () => {
  const context = useContext(PerfilContext)
  if (!context) {
    throw new Error("usePerfil debe ser usado dentro de PerfilProvider")
  }
  return context
}

export const PerfilProvider = ({ children }) => {
  // Usar el primer perfil (Carlos) como perfil principal
  const [perfil, setPerfil] = useState(perfiles[0])
  const [todosLosPerfiles] = useState(perfiles)

  const actualizarPerfil = (nuevosDatos) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      ...nuevosDatos,
    }))
  }

  const agregarTransaccion = (nuevaTransaccion) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      transacciones: [nuevaTransaccion, ...prevPerfil.transacciones],
    }))
  }

  // Función para obtener el balance de la primera tarjeta del perfil
  const getBalancePrincipal = () => {
    const primeraTargeta = getPrimeTarjetaByPerfilId(perfil.id)
    return primeraTargeta ? primeraTargeta.balance : 0
  }

  // Función para obtener el nombre completo de un usuario por ID
  const getNombreUsuarioPorId = (id) => {
    const usuario = todosLosPerfiles.find((p) => p.id === id)
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : "Usuario desconocido"
  }

  // Función para formatear transacciones con nombres de usuarios
  const getTransaccionesFormateadas = () => {
    return perfil.transacciones.map((transaccion) => {
      const esEnviada = transaccion.idRemitente === perfil.id
      const esRecibida = transaccion.idDestinatario === perfil.id

      let nombreContacto = ""
      let tipoTransaccion = ""
      let montoFormateado = transaccion.monto

      if (esEnviada) {
        nombreContacto = getNombreUsuarioPorId(transaccion.idDestinatario)
        tipoTransaccion = "enviado"
        montoFormateado = -transaccion.monto // Negativo para enviadas
      } else if (esRecibida) {
        nombreContacto = getNombreUsuarioPorId(transaccion.idRemitente)
        tipoTransaccion = "recibido"
        montoFormateado = transaccion.monto // Positivo para recibidas
      }

      return {
        ...transaccion,
        nombreContacto,
        tipoTransaccion,
        monto: montoFormateado,
        // Mantener compatibilidad con código existente
        destinatario: nombreContacto,
        remitente: nombreContacto,
      }
    })
  }

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        todosLosPerfiles,
        actualizarPerfil,
        agregarTransaccion,
        getNombreUsuarioPorId,
        getTransaccionesFormateadas,
        getBalancePrincipal, // Nueva función para obtener balance principal
      }}
    >
      {children}
    </PerfilContext.Provider>
  )
}
