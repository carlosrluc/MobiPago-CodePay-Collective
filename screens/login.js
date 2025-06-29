"use client"

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../context/AuthContext"

export default function Login({ navigation }) {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico")
      return
    }

    if (!password.trim()) {
      Alert.alert("Error", "Por favor ingresa tu contraseña")
      return
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido")
      return
    }

    setIsLoading(true)

    try {
      console.log("Intentando login con:", email)
      const result = await login(email.trim(), password)

      if (result.success) {
        console.log("Login exitoso, redirigiendo a Home")

        // Mostrar mensaje de bienvenida
        Alert.alert("¡Bienvenido!", `Hola ${result.profile?.nombre || "Usuario"}`, [
          {
            text: "OK",
            onPress: () => {
              // La navegación se manejará automáticamente por AuthNavigator
              console.log("Usuario autenticado, AuthNavigator debería redirigir")
            },
          },
        ])
      } else {
        // Manejar diferentes tipos de errores
        let errorMessage = result.error

        if (result.error.includes("Usuario no encontrado")) {
          errorMessage = "No existe una cuenta con este correo electrónico en Firestore"
        } else if (result.error.includes("Contraseña incorrecta")) {
          errorMessage = "La contraseña no es correcta"
        } else if (result.error.includes("Perfil no encontrado")) {
          errorMessage = "Usuario no registrado en el sistema MobiPago"
        }

        Alert.alert("Error de autenticación", errorMessage)
      }
    } catch (error) {
      console.error("Error inesperado en login:", error)
      Alert.alert("Error", "Ocurrió un error inesperado. Verifica tu conexión a internet.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    Alert.alert("Recuperar contraseña", "Funcionalidad próximamente disponible")
  }

  const handleCreateAccount = () => {
    Alert.alert("Crear cuenta", "Funcionalidad de registro próximamente disponible")
  }

  // Mostrar loading si el AuthContext está verificando el estado
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verificando sesión...</Text>
        <Text style={styles.loadingSubtext}>Conectando con Firestore...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingresar cuenta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Introduce tu correo electrónico"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ingresar Contraseña"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, (isLoading || loading) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading || loading}
          >
            <Text style={styles.loginButtonText}>{isLoading ? "Ingresando..." : "Ingresar"}</Text>
          </TouchableOpacity>

          {/* Create Account Link */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Soy un nuevo usuario. </Text>
            <TouchableOpacity onPress={handleCreateAccount} disabled={isLoading}>
              <Text style={[styles.createAccountLink, isLoading && styles.disabledText]}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>

          {/* Demo Users Info */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Usuarios en Firestore:</Text>
            <Text style={styles.demoUser}>carlos.lucar@gmail.com - password123</Text>
            <Text style={styles.demoUser}>maria.lopez@gmail.com - password456</Text>
            <Text style={styles.demoUser}>juan.gonzalez@gmail.com - password789</Text>
            <Text style={styles.demoNote}>
              Nota: Estos usuarios deben estar creados en tu colección "users" de Firestore.
            </Text>
          </View>

          {/* Firestore Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Configuración de Firestore:</Text>
            <Text style={styles.instructionsText}>
              1. Crear colección "users" en Firestore{"\n"}
              2. Crear documentos con ID: "1", "2", "3"{"\n"}
              3. Campos: correo (string), password (string){"\n"}
              4. Ejemplo documento ID "1":{"\n"}
              {"   "}correo: "carlos.lucar@gmail.com"{"\n"}
              {"   "}password: "password123"
            </Text>
          </View>

          {/* Firestore Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusTitle}>Estado de Firestore:</Text>
            <Text style={styles.statusText}>{loading ? "Verificando conexión..." : "Conectado"}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#257beb",
  },
  loadingText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#93d2fd",
    marginTop: 10,
  },
  header: {
    backgroundColor: "#257beb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(147, 210, 253, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSpacer: {
    width: 40,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 25,
    padding: 30,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#000000",
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  eyeButton: {
    padding: 5,
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#257beb",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: "#999",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  createAccountText: {
    fontSize: 16,
    color: "#666666",
  },
  createAccountLink: {
    fontSize: 16,
    color: "#257beb",
    fontWeight: "600",
  },
  disabledText: {
    color: "#999",
  },
  demoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: "#93d2fd",
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#257beb",
    marginBottom: 10,
  },
  demoUser: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
    fontFamily: "monospace",
  },
  demoNote: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginTop: 10,
  },
  instructionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#257beb",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 18,
    fontFamily: "monospace",
  },
  statusContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#257beb",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    color: "#666666",
  },
})
