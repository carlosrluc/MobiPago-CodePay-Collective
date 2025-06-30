"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useState, useEffect } from "react"
import AuthService from "../services/AuthService"
import { getPerfilByEmail, agregarPerfil } from "../data/dummy-data"

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

      console.log("AuthContext - Estado establecido:", {
        user: authResult.user,
        userProfile: profile,
        isAuthenticated: true,
      })

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

  // Función para registrar nuevo usuario
  const register = async (userData) => {
    try {
      setLoading(true)
      console.log("Iniciando proceso de registro para:", userData.correo)

      // 1. Verificar que el correo no exista en dummy-data
      const existingProfile = getProfileFromDummyData(userData.correo)
      if (existingProfile) {
        return {
          success: false,
          error: "Ya existe una cuenta con este correo electrónico en el sistema local",
        }
      }

      // 2. Registrar en Firestore (solo correo y password)
      const firestoreResult = await AuthService.registerUser(userData)

      if (!firestoreResult.success) {
        console.log("Error registrando en Firestore:", firestoreResult.error)
        return {
          success: false,
          error: firestoreResult.error,
        }
      }

      console.log("Usuario registrado exitosamente en Firestore con ID:", firestoreResult.userId)

      // 3. Agregar perfil completo al dummy-data
      const perfilData = {
        id: firestoreResult.userId,
        nombre: userData.nombre,
        apellidos: userData.apellidos,
        correo: userData.correo,
        contrasena: userData.contrasena,
        telefono: userData.telefono,
        dni: userData.dni,
      }

      const dummyResult = await agregarPerfil(perfilData)

      if (!dummyResult.success) {
        console.error("Error agregando perfil al dummy-data:", dummyResult.error)
        return {
          success: false,
          error: "Error creando perfil en el sistema local",
        }
      }

      console.log("Perfil agregado exitosamente al dummy-data")

      return {
        success: true,
        userId: firestoreResult.userId,
        user: firestoreResult.user,
        profile: dummyResult.perfil,
      }
    } catch (error) {
      console.error("Error en registro:", error)
      return {
        success: false,
        error: "Error inesperado durante el registro",
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para hacer login automático después del registro
  const autoLogin = async (email, password) => {
    try {
      console.log("Realizando login automático para:", email)

      const loginResult = await login(email, password)

      if (loginResult.success) {
        console.log("Login automático exitoso")
        return { success: true }
      } else {
        console.error("Error en login automático:", loginResult.error)
        return { success: false, error: loginResult.error }
      }
    } catch (error) {
      console.error("Error en login automático:", error)
      return { success: false, error: "Error en login automático" }
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      console.log("AuthContext - Iniciando proceso de logout...")

      // Limpiar estado inmediatamente
      setUser(null)
      setUserProfile(null)
      setIsAuthenticated(false)

      console.log("AuthContext - Estado limpiado:", {
        user: null,
        userProfile: null,
        isAuthenticated: false,
      })

      // Limpiar AsyncStorage
      await AsyncStorage.removeItem("mobipago_user")
      await AsyncStorage.removeItem("mobipago_profile")

      console.log("AuthContext - AsyncStorage limpiado")
      console.log("AuthContext - Logout completado exitosamente")

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
            console.log("AuthContext - Sesión persistente restaurada:", {
              user: user,
              userProfile: currentProfile,
              isAuthenticated: true,
            })
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

  // Debug: Mostrar cambios en el estado de autenticación
  useEffect(() => {
    console.log("AuthContext - Estado de autenticación cambió:", {
      isAuthenticated,
      userExists: !!user,
      userProfileExists: !!userProfile,
      loading,
    })
  }, [isAuthenticated, user, userProfile, loading])

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    login,
    register,
    autoLogin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
