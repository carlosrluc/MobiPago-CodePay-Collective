"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../Config/firebase"
import { getPerfilByEmail } from "../data/dummy-data"
import { getFirebaseErrorMessage, logFirebaseError } from "../utils/firebaseErrors"

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
      setLoading(true)

      // Verificar si el usuario existe en nuestro dummy data
      const profile = getPerfilByEmail(email)
      if (!profile) {
        throw new Error("Usuario no encontrado en el sistema")
      }

      // Verificar contraseña local (en un sistema real, esto se haría en el servidor)
      if (profile.contrasena !== password) {
        throw new Error("Contraseña incorrecta")
      }

      // Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      console.log("User logged in:", userCredential.user.email)

      return {
        success: true,
        user: userCredential.user,
        profile: profile,
      }
    } catch (error) {
      logFirebaseError(error, "login")

      // Si el usuario no existe en Firebase, intentar crearlo
      if (error.code === "auth/user-not-found") {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          console.log("User created and logged in:", userCredential.user.email)

          const profile = getPerfilByEmail(email)
          return {
            success: true,
            user: userCredential.user,
            profile: profile,
          }
        } catch (createError) {
          logFirebaseError(createError, "create user")
          return {
            success: false,
            error: getFirebaseErrorMessage(createError.code) || createError.message,
          }
        }
      }

      return {
        success: false,
        error: getFirebaseErrorMessage(error.code) || error.message,
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      console.log("User logged out.")
      return { success: true }
    } catch (error) {
      logFirebaseError(error, "logout")
      return {
        success: false,
        error: getFirebaseErrorMessage(error.code) || error.message,
      }
    }
  }

  // Escuchar cambios en el estado de autenticación siguiendo la pauta de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = firebaseUser.uid
        console.log("User logged in:", firebaseUser.email)

        // Buscar perfil en dummy data
        const profile = getPerfilByEmail(firebaseUser.email)

        setUser(firebaseUser)
        setUserProfile(profile)

        // Update your UI to show a logged-in state
      } else {
        // User is signed out
        console.log("User logged out.")

        setUser(null)
        setUserProfile(null)

        // Update your UI to show a logged-out state, e.g., show login form
      }
      setLoading(false)
    })

    // Cleanup subscription on unmount
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
