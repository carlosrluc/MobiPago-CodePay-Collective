"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState, useEffect } from "react"
import { perfiles, getPrimeTarjetaByPerfilId, updatePerfilPhoto } from "../data/dummy-data"
import { useAuth } from "./AuthContext"

const PerfilContext = createContext()

export const usePerfil = () => {
  const context = useContext(PerfilContext)
  if (!context) {
    throw new Error("usePerfil debe ser usado dentro de PerfilProvider")
  }

  // Debugging: Mostrar estado del perfil
  console.log("usePerfil - Estado del contexto:", {
    perfilExists: !!context.perfil,
    perfilId: context.perfil?.id,
    perfilNombre: context.perfil?.nombre,
    perfilApellidos: context.perfil?.apellidos,
    perfilFoto: context.perfil?.fotoPerfil ? "Sí" : "No",
    todosLosPerfilesCount: context.todosLosPerfiles?.length,
  })

  return context
}

export const PerfilProvider = ({ children }) => {
  const { userProfile, isAuthenticated, user } = useAuth()
  const [perfil, setPerfil] = useState(null)
  const [todosLosPerfiles] = useState(perfiles)

  // Debugging: Mostrar datos del AuthContext
  useEffect(() => {
    console.log("PerfilProvider - AuthContext cambió:", {
      isAuthenticated,
      userExists: !!user,
      userEmail: user?.email,
      userProfileExists: !!userProfile,
      userProfileId: userProfile?.id,
      userProfileNombre: userProfile?.nombre,
      userProfileApellidos: userProfile?.apellidos,
      userProfileFoto: userProfile?.fotoPerfil ? "Sí" : "No",
    })
  }, [userProfile, isAuthenticated, user])

  // Cargar foto de perfil desde AsyncStorage
  const loadProfilePhoto = async (profileId) => {
    try {
      const savedPhoto = await AsyncStorage.getItem(`mobipago_profile_photo_${profileId}`)
      if (savedPhoto) {
        console.log("Foto de perfil cargada desde AsyncStorage para ID:", profileId)
        return savedPhoto
      }
    } catch (error) {
      console.error("Error cargando foto de perfil:", error)
    }
    return null
  }

  // Guardar foto de perfil en AsyncStorage
  const saveProfilePhoto = async (profileId, photoUri) => {
    try {
      if (photoUri) {
        await AsyncStorage.setItem(`mobipago_profile_photo_${profileId}`, photoUri)
        console.log("Foto de perfil guardada en AsyncStorage para ID:", profileId)
      } else {
        await AsyncStorage.removeItem(`mobipago_profile_photo_${profileId}`)
        console.log("Foto de perfil eliminada de AsyncStorage para ID:", profileId)
      }
    } catch (error) {
      console.error("Error guardando foto de perfil:", error)
    }
  }

  // Actualizar perfil cuando cambie el usuario autenticado
  useEffect(() => {
    const initializeProfile = async () => {
      console.log("PerfilProvider - Inicializando perfil...")

      if (isAuthenticated && userProfile) {
        // Cargar foto de perfil desde AsyncStorage
        const savedPhoto = await loadProfilePhoto(userProfile.id)

        const perfilConFoto = {
          ...userProfile,
          fotoPerfil: savedPhoto || userProfile.fotoPerfil,
        }

        console.log("PerfilProvider - Estableciendo perfil:", {
          id: perfilConFoto.id,
          nombre: perfilConFoto.nombre,
          apellidos: perfilConFoto.apellidos,
          usuario: perfilConFoto.usuario,
          fotoPerfil: perfilConFoto.fotoPerfil ? "Sí" : "No",
        })

        setPerfil(perfilConFoto)
      } else {
        console.log("PerfilProvider - Limpiando perfil (no autenticado o sin userProfile)")
        setPerfil(null)
      }
    }

    initializeProfile()
  }, [userProfile, isAuthenticated])

  // Debugging: Mostrar cambios en el estado del perfil
  useEffect(() => {
    console.log("PerfilProvider - Estado del perfil cambió:", {
      perfilExists: !!perfil,
      perfilId: perfil?.id,
      perfilNombre: perfil?.nombre,
      perfilApellidos: perfil?.apellidos,
      perfilFoto: perfil?.fotoPerfil ? "Sí" : "No",
    })
  }, [perfil])

  const actualizarPerfil = (nuevosDatos) => {
    console.log("PerfilProvider - Actualizando perfil con:", nuevosDatos)
    setPerfil((prevPerfil) => {
      const perfilActualizado = {
        ...prevPerfil,
        ...nuevosDatos,
      }
      console.log("PerfilProvider - Perfil actualizado:", perfilActualizado)
      return perfilActualizado
    })
  }

  const actualizarFotoPerfil = async (nuevaFotoUri) => {
    try {
      console.log("PerfilProvider - Actualizando foto de perfil:", nuevaFotoUri)

      if (!perfil) {
        return {
          success: false,
          error: "No hay perfil activo",
        }
      }

      // Actualizar en dummy-data
      const result = updatePerfilPhoto(perfil.id, nuevaFotoUri)

      if (result.success) {
        // Guardar en AsyncStorage
        await saveProfilePhoto(perfil.id, nuevaFotoUri)

        // Actualizar estado local
        setPerfil((prevPerfil) => ({
          ...prevPerfil,
          fotoPerfil: nuevaFotoUri,
        }))

        console.log("PerfilProvider - Foto de perfil actualizada exitosamente")

        return {
          success: true,
          message: "Foto de perfil actualizada exitosamente",
        }
      } else {
        return result
      }
    } catch (error) {
      console.error("Error actualizando foto de perfil:", error)
      return {
        success: false,
        error: "Error al actualizar foto de perfil",
      }
    }
  }

  const agregarTransaccion = (nuevaTransaccion) => {
    console.log("PerfilProvider - Agregando transacción:", nuevaTransaccion)
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      transacciones: [nuevaTransaccion, ...prevPerfil.transacciones],
    }))
  }

  // Función para obtener el balance de la primera tarjeta del perfil
  const getBalancePrincipal = () => {
    if (!perfil) {
      console.log("getBalancePrincipal - No hay perfil, retornando 0")
      return 0
    }
    const primeraTargeta = getPrimeTarjetaByPerfilId(perfil.id)
    const balance = primeraTargeta ? primeraTargeta.balance : 0
    console.log("getBalancePrincipal - Balance:", balance)
    return balance
  }

  // Función para obtener el nombre completo de un usuario por ID
  const getNombreUsuarioPorId = (id) => {
    const usuario = todosLosPerfiles.find((p) => p.id === id)
    const nombre = usuario ? `${usuario.nombre} ${usuario.apellidos}` : "Usuario desconocido"
    console.log("getNombreUsuarioPorId - ID:", id, "Nombre:", nombre)
    return nombre
  }

  // Función para formatear transacciones con nombres de usuarios
  const getTransaccionesFormateadas = () => {
    if (!perfil || !perfil.transacciones) {
      console.log("getTransaccionesFormateadas - No hay perfil o transacciones")
      return []
    }

    console.log("getTransaccionesFormateadas - Formateando", perfil.transacciones.length, "transacciones")

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

  const contextValue = {
    perfil,
    todosLosPerfiles,
    actualizarPerfil,
    actualizarFotoPerfil,
    agregarTransaccion,
    getNombreUsuarioPorId,
    getTransaccionesFormateadas,
    getBalancePrincipal,
  }

  console.log("PerfilProvider - Proporcionando contexto:", {
    perfilExists: !!contextValue.perfil,
    perfilId: contextValue.perfil?.id,
    perfilNombre: contextValue.perfil?.nombre,
    perfilFoto: contextValue.perfil?.fotoPerfil ? "Sí" : "No",
  })

  return <PerfilContext.Provider value={contextValue}>{children}</PerfilContext.Provider>
}
