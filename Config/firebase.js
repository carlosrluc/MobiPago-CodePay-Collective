import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Configuración de Firebase - Reemplaza con tus credenciales del proyecto "Mobipago-prueba"
const firebaseConfig = {
  apiKey: "{ingresa tu API key aquí}",
  authDomain: "mobipago-prueba.firebaseapp.com",
  projectId: "mobipago-prueba",
  storageBucket: "mobipago-prueba.appspot.com",
  messagingSenderId: "{ingresa tu messaging sender ID aquí}",
  appId: "{ingresa tu app ID aquí}",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Firebase Auth
export const auth = getAuth(app)
export default app
