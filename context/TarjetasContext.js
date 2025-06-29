"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getTarjetasByPerfilId, tarjetas as tarjetasIniciales } from "../data/dummy-data"
import { useAuth } from "./AuthContext"

const TarjetasContext = createContext()

export const useTarjetas = () => {
  const context = useContext(TarjetasContext)
  if (!context) {
    throw new Error("useTarjetas debe ser usado dentro de TarjetasProvider")
  }
  return context
}

export const TarjetasProvider = ({ children }) => {
  const { userProfile } = useAuth()
  const [tarjetas, setTarjetas] = useState([])

  // Actualizar tarjetas cuando cambie el usuario autenticado
  useEffect(() => {
    if (userProfile) {
      const tarjetasUsuario = getTarjetasByPerfilId(userProfile.id)
      setTarjetas(tarjetasUsuario)
    } else {
      setTarjetas([])
    }
  }, [userProfile])

  const agregarTarjeta = (nuevaTarjeta) => {
    setTarjetas((prevTarjetas) => [...prevTarjetas, nuevaTarjeta])
  }

  const eliminarTarjeta = (index) => {
    setTarjetas((prevTarjetas) => prevTarjetas.filter((_, i) => i !== index))
  }

  const actualizarTarjetas = () => {
    if (userProfile) {
      const tarjetasUsuario = getTarjetasByPerfilId(userProfile.id)
      setTarjetas(tarjetasUsuario)
    }
  }

  const getTarjetaPorNumero = (numero) => {
    return tarjetasIniciales.find((tarjeta) => tarjeta.numero === numero)
  }

  return (
    <TarjetasContext.Provider
      value={{
        tarjetas,
        agregarTarjeta,
        eliminarTarjeta,
        actualizarTarjetas,
        getTarjetaPorNumero,
      }}
    >
      {children}
    </TarjetasContext.Provider>
  )
}
