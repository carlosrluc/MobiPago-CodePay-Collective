"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../Config/firebase"
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

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      // Verificar si el usuario existe en nuestro dummy data
      const profile = getPerfilByEmail(email)
      if (!profile) {
        throw new Error("Usuario no encontrado en el sistema")
      }

      // Verificar contraseña (en un sistema real, esto se haría en el servidor)
      if (profile.contrasena !== password) {
        throw new Error("Contraseña incorrecta")
      }

      // Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Establecer el perfil del usuario
      setUserProfile(profile)

      return {
        success: true,
        user: userCredential.user,
        profile: profile,
      }
    } catch (error) {
      console.error("Error en login:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      console.error("Error en logout:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuario autenticado, buscar perfil
        const profile = getPerfilByEmail(firebaseUser.email)
        setUser(firebaseUser)
        setUserProfile(profile)
      } else {
        // Usuario no autenticado
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    userProfile,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
