"use client"

import { createContext, useContext, useState, useEffect } from "react"
import AuthService from "../services/AuthService"

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

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true)
      console.log("Iniciando proceso de login para:", email)

      // Autenticar con Firestore
      const result = await AuthService.authenticateUser(email, password)

      if (result.success) {
        console.log("Login exitoso:", result.user.email)

        // Establecer usuario y perfil
        setUser(result.user)
        setUserProfile(result.profile)
        setIsAuthenticated(true)

        // Guardar en localStorage para persistencia
        localStorage.setItem("mobipago_user", JSON.stringify(result.user))
        localStorage.setItem("mobipago_profile", JSON.stringify(result.profile))

        return {
          success: true,
          user: result.user,
          profile: result.profile,
        }
      } else {
        console.log("Login fallido:", result.error)
        return {
          success: false,
          error: result.error,
        }
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

      // Limpiar localStorage
      localStorage.removeItem("mobipago_user")
      localStorage.removeItem("mobipago_profile")

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
      const savedUser = localStorage.getItem("mobipago_user")
      const savedProfile = localStorage.getItem("mobipago_profile")

      if (savedUser && savedProfile) {
        const user = JSON.parse(savedUser)
        const profile = JSON.parse(savedProfile)

        console.log("Sesión persistente encontrada para:", user.email)

        // Verificar que el usuario aún existe en Firestore
        const userCheck = await AuthService.getUserById(user.id)

        if (userCheck.success) {
          setUser(user)
          setUserProfile(profile)
          setIsAuthenticated(true)
          console.log("Sesión persistente restaurada")
        } else {
          // Si el usuario no existe, limpiar datos guardados
          localStorage.removeItem("mobipago_user")
          localStorage.removeItem("mobipago_profile")
          console.log("Usuario no válido, limpiando sesión")
        }
      }
    } catch (error) {
      console.error("Error verificando sesión persistente:", error)
      // En caso de error, limpiar datos
      localStorage.removeItem("mobipago_user")
      localStorage.removeItem("mobipago_profile")
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
