import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore"
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

  // Función para registrar nuevo usuario en Firestore
  async registerUser(userData) {
    try {
      console.log("Registrando nuevo usuario en Firestore:", userData.correo)

      // Verificar si el usuario ya existe
      const userExists = await this.userExists(userData.correo)
      if (userExists) {
        throw new Error("Ya existe una cuenta con este correo electrónico")
      }

      // Obtener el siguiente ID disponible
      const nextId = await this.getNextUserId()
      console.log("Siguiente ID disponible:", nextId)

      // Crear documento con ID específico
      const userDocRef = doc(db, this.usersCollection, nextId.toString())

      // Datos para Firestore (solo correo y password)
      const firestoreData = {
        correo: userData.correo,
        password: userData.contrasena,
      }

      await setDoc(userDocRef, firestoreData)

      console.log("Usuario registrado exitosamente en Firestore con ID:", nextId)

      return {
        success: true,
        userId: nextId,
        user: {
          id: nextId.toString(),
          email: userData.correo,
          uid: nextId.toString(),
        },
      }
    } catch (error) {
      console.error("Error registrando usuario:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Función para obtener el siguiente ID de usuario disponible
  async getNextUserId() {
    try {
      const usersRef = collection(db, this.usersCollection)
      const querySnapshot = await getDocs(usersRef)

      // Obtener todos los IDs numéricos existentes
      const existingIds = []
      querySnapshot.forEach((doc) => {
        const id = Number.parseInt(doc.id)
        if (!isNaN(id)) {
          existingIds.push(id)
        }
      })

      // Encontrar el siguiente ID disponible
      if (existingIds.length === 0) {
        return 1 // Primer usuario
      }

      existingIds.sort((a, b) => a - b)

      // Buscar el primer hueco o devolver el siguiente número
      for (let i = 1; i <= existingIds.length + 1; i++) {
        if (!existingIds.includes(i)) {
          return i
        }
      }

      return existingIds.length + 1
    } catch (error) {
      console.error("Error obteniendo siguiente ID:", error)
      return 1 // Fallback al primer ID
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
