"use client"

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../context/AuthContext"

export default function CrearCuenta({ navigation }) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellidos: "",
    dni: "",
    telefono: "",
    contrasena: "",
    repetirContrasena: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleInputChange = (field, value) => {
    let formattedValue = value

    // Formatear teléfono (solo números y espacios)
    if (field === "telefono") {
      formattedValue = value.replace(/\D/g, "").slice(0, 9)
      if (formattedValue.length > 6) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(3, 6)} ${formattedValue.slice(6, 9)}`
      } else if (formattedValue.length > 3) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(3, 6)}`
      }
    }

    // Formatear DNI (solo números, máximo 8)
    if (field === "dni") {
      formattedValue = value.replace(/\D/g, "").slice(0, 8)
    }

    // Formatear nombre y apellidos (solo letras y espacios)
    if (field === "nombre" || field === "apellidos") {
      formattedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  const validateForm = () => {
    // Validar correo
    if (!formData.correo.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido")
      return false
    }

    // Validar nombre
    if (!formData.nombre.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre")
      return false
    }
    if (formData.nombre.trim().length < 2) {
      Alert.alert("Error", "El nombre debe tener al menos 2 caracteres")
      return false
    }

    // Validar apellidos
    if (!formData.apellidos.trim()) {
      Alert.alert("Error", "Por favor ingresa tus apellidos")
      return false
    }
    if (formData.apellidos.trim().length < 2) {
      Alert.alert("Error", "Los apellidos deben tener al menos 2 caracteres")
      return false
    }

    // Validar DNI
    if (!formData.dni.trim()) {
      Alert.alert("Error", "Por favor ingresa tu DNI")
      return false
    }
    if (formData.dni.length !== 8) {
      Alert.alert("Error", "El DNI debe tener exactamente 8 dígitos")
      return false
    }

    // Validar teléfono
    if (!formData.telefono.trim()) {
      Alert.alert("Error", "Por favor ingresa tu número de teléfono")
      return false
    }
    const telefonoLimpio = formData.telefono.replace(/\s/g, "")
    if (telefonoLimpio.length !== 9) {
      Alert.alert("Error", "El teléfono debe tener exactamente 9 dígitos")
      return false
    }

    // Validar contraseña
    if (!formData.contrasena.trim()) {
      Alert.alert("Error", "Por favor ingresa una contraseña")
      return false
    }
    if (formData.contrasena.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return false
    }

    // Validar repetir contraseña
    if (!formData.repetirContrasena.trim()) {
      Alert.alert("Error", "Por favor confirma tu contraseña")
      return false
    }
    if (formData.contrasena !== formData.repetirContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return false
    }

    return true
  }

  const handleCrearCuenta = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      console.log("Iniciando proceso de registro...")

      // Preparar datos del usuario
      const userData = {
        correo: formData.correo.trim().toLowerCase(),
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        dni: formData.dni.trim(),
        telefono: formData.telefono.trim(),
        contrasena: formData.contrasena.trim(),
      }

      console.log("Datos del usuario a registrar:", userData)

      // Registrar usuario
      const result = await register(userData)

      if (result.success) {
        console.log("Registro exitoso, navegando a crear tarjeta...")

        Alert.alert("¡Cuenta creada!", "Tu cuenta ha sido creada exitosamente. Ahora agrega tu primera tarjeta.", [
          {
            text: "Continuar",
            onPress: () => {
              // Navegar a crear tarjeta con flag de primer registro
              navigation.navigate("CrearTarjeta", {
                isFirstCard: true,
                newUserId: result.userId,
              })
            },
          },
        ])
      } else {
        console.error("Error en registro:", result.error)
        Alert.alert("Error", result.error)
      }
    } catch (error) {
      console.error("Error inesperado en registro:", error)
      Alert.alert("Error", "Ocurrió un error inesperado. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear cuenta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Correo */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#999"
                  value={formData.correo}
                  onChangeText={(value) => handleInputChange("correo", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Nombre */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Tu nombre"
                  placeholderTextColor="#999"
                  value={formData.nombre}
                  onChangeText={(value) => handleInputChange("nombre", value)}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Apellidos */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Apellido</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Tus apellidos"
                  placeholderTextColor="#999"
                  value={formData.apellidos}
                  onChangeText={(value) => handleInputChange("apellidos", value)}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* DNI */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>DNI</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="12345678"
                  placeholderTextColor="#999"
                  value={formData.dni}
                  onChangeText={(value) => handleInputChange("dni", value)}
                  keyboardType="numeric"
                  maxLength={8}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Teléfono */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Teléfono</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="999 999 999"
                  placeholderTextColor="#999"
                  value={formData.telefono}
                  onChangeText={(value) => handleInputChange("telefono", value)}
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#999"
                  value={formData.contrasena}
                  onChangeText={(value) => handleInputChange("contrasena", value)}
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

            {/* Repetir Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Repetir Contraseña</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirma tu contraseña"
                  placeholderTextColor="#999"
                  value={formData.repetirContrasena}
                  onChangeText={(value) => handleInputChange("repetirContrasena", value)}
                  secureTextEntry={!showRepeatPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showRepeatPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Crear Cuenta Button */}
          <TouchableOpacity
            style={[styles.createButton, isLoading && styles.createButtonDisabled]}
            onPress={handleCrearCuenta}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>{isLoading ? "Creando cuenta..." : "Crear Cuenta"}</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} disabled={isLoading}>
              <Text style={[styles.loginLink, isLoading && styles.disabledText]}>Iniciar Sesión</Text>
            </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 25,
    padding: 30,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
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
  createButton: {
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
  createButtonDisabled: {
    backgroundColor: "#999",
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#666666",
  },
  loginLink: {
    fontSize: 16,
    color: "#257beb",
    fontWeight: "600",
  },
  disabledText: {
    color: "#999",
  },
})
