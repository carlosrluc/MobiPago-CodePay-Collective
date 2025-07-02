// Utilidades para manejar errores de Firebase Authentication

export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "El formato del correo electrónico no es válido"

    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada"

    case "auth/user-not-found":
      return "No existe una cuenta con este correo electrónico"

    case "auth/wrong-password":
      return "La contraseña es incorrecta"

    case "auth/email-already-in-use":
      return "Ya existe una cuenta con este correo electrónico"

    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres"

    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Intenta más tarde"

    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu internet"

    case "auth/invalid-credential":
      return "Las credenciales proporcionadas no son válidas"

    case "auth/operation-not-allowed":
      return "Esta operación no está permitida"

    case "auth/requires-recent-login":
      return "Esta operación requiere una autenticación reciente"

    default:
      return "Ocurrió un error inesperado. Inténtalo de nuevo"
  }
}

export const logFirebaseError = (error, context = "") => {
  console.error(`Firebase Error ${context}:`, {
    code: error.code,
    message: error.message,
    stack: error.stack,
  })
}
