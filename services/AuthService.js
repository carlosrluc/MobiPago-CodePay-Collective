import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../Config/firebase"
import { getPerfilByEmail } from "../data/dummy-data"

class AuthService {
  constructor() {
    this.usersCollection = "users"
  }

  // Función para autenticar usuario con Firestore
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

      console.log("Usuario encontrado en Firestore:", userData)

      // Verificar contraseña
      if (userData.password !== password) {
        console.log("Contraseña incorrecta")
        throw new Error("Contraseña incorrecta")
      }

      // Buscar perfil en dummy-data local
      const profile = getPerfilByEmail(email)
      if (!profile) {
        throw new Error("Perfil no encontrado en el sistema local")
      }

      console.log("Autenticación exitosa para:", email)

      return {
        success: true,
        user: {
          id: userDoc.id,
          email: userData.correo,
          uid: userDoc.id, // Usar el ID del documento como UID
        },
        profile: profile,
      }
    } catch (error) {
      console.error("Error en autenticación:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Función para obtener usuario por ID
  async getUserById(userId) {
    try {
      const userDoc = await getDoc(doc(db, this.usersCollection, userId))

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado")
      }

      return {
        success: true,
        user: {
          id: userDoc.id,
          ...userDoc.data(),
        },
      }
    } catch (error) {
      console.error("Error obteniendo usuario:", error)
      return {
        success: false,
        error: error.message,
      }
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
