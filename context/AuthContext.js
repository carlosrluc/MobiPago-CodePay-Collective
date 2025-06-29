"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState, useEffect } from "react"
import AuthService from "../services/AuthService"
import { getPerfilByEmail } from "../data/dummy-data"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Función para obtener perfil del dummy-data
  const getProfileFromDummyData = (email) => {
    console.log("Buscando perfil en dummy-data para:", email)
    const profile = getPerfilByEmail(email)

    if (profile) {
      console.log("Perfil encontrado:", {
        id: profile.id,
        nombre: profile.nombre,
        apellidos: profile.apellidos,
        email: profile.usuario,
      })
      return profile
    } else {
      console.log("Perfil no encontrado en dummy-data para:", email)
      return null
    }
  }

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true)
      console.log("Iniciando proceso de login para:", email)

      // 1. Autenticar con Firestore (solo email y password)
      const authResult = await AuthService.authenticateUser(email, password)

      if (!authResult.success) {
        console.log("Autenticación fallida:", authResult.error)
        return {
          success: false,
          error: authResult.error,
        }
      }

      console.log("Autenticación exitosa en Firestore")

      // 2. Obtener perfil completo del dummy-data
      const profile = getProfileFromDummyData(email)

      if (!profile) {
        console.log("Perfil no encontrado en sistema local")
        return {
          success: false,
          error: "Usuario no registrado en el sistema MobiPago",
        }
      }

      console.log("Login completo exitoso para:", profile.nombre, profile.apellidos)

      // 3. Establecer usuario y perfil
      setUser(authResult.user)
      setUserProfile(profile)
      setIsAuthenticated(true)

      // 4. Guardar en AsyncStorage para persistencia
      await AsyncStorage.setItem("mobipago_user", JSON.stringify(authResult.user))
      await AsyncStorage.setItem("mobipago_profile", JSON.stringify(profile))

      return {
        success: true,
        user: authResult.user,
        profile: profile,
      }
    } catch (error) {
      console.error("Error en login:", error)
      return {
        success: false,
        error: "Error inesperado durante el login",
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      console.log("Cerrando sesión...")

      // Limpiar estado
      setUser(null)
      setUserProfile(null)
      setIsAuthenticated(false)

      // Limpiar AsyncStorage
      await AsyncStorage.removeItem("mobipago_user")
      await AsyncStorage.removeItem("mobipago_profile")

      console.log("Sesión cerrada exitosamente")

      return { success: true }
    } catch (error) {
      console.error("Error en logout:", error)
      return {
        success: false,
        error: "Error al cerrar sesión",
      }
    }
  }

  // Función para verificar sesión persistente
  const checkPersistedSession = async () => {
    try {
      console.log("Verificando sesión persistente...")

      const savedUser = await AsyncStorage.getItem("mobipago_user")
      const savedProfile = await AsyncStorage.getItem("mobipago_profile")

      if (savedUser && savedProfile) {
        const user = JSON.parse(savedUser)
        const profile = JSON.parse(savedProfile)

        console.log("Sesión persistente encontrada para:", user.email)

        // Verificar que el usuario aún existe en Firestore
        const userStillExists = await AuthService.userExists(user.email)

        if (userStillExists) {
          // Verificar que el perfil aún existe en dummy-data
          const currentProfile = getProfileFromDummyData(user.email)

          if (currentProfile) {
            setUser(user)
            setUserProfile(currentProfile) // Usar perfil actualizado del dummy-data
            setIsAuthenticated(true)
            console.log("Sesión persistente restaurada para:", currentProfile.nombre)
          } else {
            console.log("Perfil no válido en dummy-data, limpiando sesión")
            await AsyncStorage.removeItem("mobipago_user")
            await AsyncStorage.removeItem("mobipago_profile")
          }
        } else {
          console.log("Usuario no válido en Firestore, limpiando sesión")
          await AsyncStorage.removeItem("mobipago_user")
          await AsyncStorage.removeItem("mobipago_profile")
        }
      } else {
        console.log("No hay sesión persistente")
      }
    } catch (error) {
      console.error("Error verificando sesión persistente:", error)
      // En caso de error, limpiar datos
      await AsyncStorage.removeItem("mobipago_user")
      await AsyncStorage.removeItem("mobipago_profile")
    } finally {
      setLoading(false)
    }
  }

  // Verificar conexión con Firestore al inicializar
  const initializeAuth = async () => {
    try {
      console.log("Inicializando autenticación...")

      // Verificar conexión con Firestore
      const connectionOk = await AuthService.testConnection()

      if (connectionOk) {
        console.log("Firestore conectado correctamente")
        // Verificar sesión persistente
        await checkPersistedSession()
      } else {
        console.error("No se pudo conectar con Firestore")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error inicializando autenticación:", error)
      setLoading(false)
    }
  }

  // Inicializar al montar el componente
  useEffect(() => {
    initializeAuth()
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
