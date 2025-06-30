import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../Config/firebase"

class AuthService {
  constructor() {
    this.usersCollection = "users"
  }

  // Función para autenticar usuario con Firestore (solo email y password)
  async authenticateUser(email, password) {
    try {
      console.log("Intentando autenticar usuario:", email)

      // Buscar usuario por correo en Firestore
      const usersRef = collection(db, this.usersCollection)
      const q = query(usersRef, where("correo", "==", email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        console.log("Usuario no encontrado en Firestore")
        throw new Error("Usuario no encontrado")
      }

      // Obtener el primer documento que coincida
      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()

      console.log("Usuario encontrado en Firestore:", { correo: userData.correo })

      // Verificar contraseña
      if (userData.password !== password) {
        console.log("Contraseña incorrecta")
        throw new Error("Contraseña incorrecta")
      }

      console.log("Autenticación exitosa para:", email)

      // Solo retornar datos de autenticación, NO perfil
      return {
        success: true,
        user: {
          id: userDoc.id,
          email: userData.correo,
          uid: userDoc.id, // Usar el ID del documento como UID
        },
      }
    } catch (error) {
      console.error("Error en autenticación:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Función para verificar si un usuario existe en Firestore
  async userExists(email) {
    try {
      const usersRef = collection(db, this.usersCollection)
      const q = query(usersRef, where("correo", "==", email))
      const querySnapshot = await getDocs(q)

      return !querySnapshot.empty
    } catch (error) {
      console.error("Error verificando usuario:", error)
      return false
    }
  }

  // Función para verificar conexión con Firestore
  async testConnection() {
    try {
      const usersRef = collection(db, this.usersCollection)
      await getDocs(usersRef)
      console.log("Conexión con Firestore exitosa")
      return true
    } catch (error) {
      console.error("Error conectando con Firestore:", error)
      return false
    }
  }
}

export default new AuthService()
