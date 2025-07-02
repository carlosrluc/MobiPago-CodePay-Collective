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
import AuthService from "../services/AuthService"

export default function CambiarContrasena({ navigation }) {
  const { user, userProfile, updatePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const validateForm = () => {
    if (!currentPassword.trim()) {
      Alert.alert("Error", "Por favor ingresa tu contraseña actual")
      return false
    }

    if (!newPassword.trim()) {
      Alert.alert("Error", "Por favor ingresa la nueva contraseña")
      return false
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "La nueva contraseña debe tener al menos 6 caracteres")
      return false
    }

    if (!confirmPassword.trim()) {
      Alert.alert("Error", "Por favor confirma la nueva contraseña")
      return false
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return false
    }

    if (currentPassword === newPassword) {
      Alert.alert("Error", "La nueva contraseña debe ser diferente a la actual")
      return false
    }

    return true
  }

  const handleChangePassword = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      console.log("Iniciando cambio de contraseña para:", user?.email)

      // 1. Verificar contraseña actual
      const verificationResult = await AuthService.authenticateUser(user.email, currentPassword)

      if (!verificationResult.success) {
        Alert.alert("Error", "La contraseña actual es incorrecta")
        setIsLoading(false)
        return
      }

      console.log("Contraseña actual verificada")

      // 2. Cambiar contraseña en Firebase/Firestore
      const updateResult = await AuthService.updatePassword(user.email, newPassword)

      if (!updateResult.success) {
        Alert.alert("Error", updateResult.error || "No se pudo actualizar la contraseña")
        setIsLoading(false)
        return
      }

      console.log("Contraseña actualizada en Firestore")

      // 3. Actualizar contraseña en dummy-data local (si existe la función en el contexto)
      if (updatePassword) {
        const localUpdateResult = await updatePassword(userProfile.id, newPassword)
        if (localUpdateResult.success) {
          console.log("Contraseña actualizada en dummy-data local")
        }
      }

      // 4. Mostrar mensaje de éxito
      Alert.alert("¡Éxito!", "Tu contraseña ha sido cambiada exitosamente", [
        {
          text: "OK",
          onPress: () => {
            // Limpiar campos
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            // Volver a ajustes
            navigation.goBack()
          },
        },
      ])
    } catch (error) {
      console.error("Error inesperado al cambiar contraseña:", error)
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
        <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Contraseña Anterior */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña Anterior</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Escriba la contraseña anterior"
                  placeholderTextColor="#444"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  selectionColor="#257beb"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Nueva Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nueva Contraseña</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Escriba la nueva contraseña"
                  placeholderTextColor="#444"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  selectionColor="#257beb"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirmar Nueva Contraseña */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reescribe la contraseña</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Vuelve a escribir la nueva contraseña"
                  placeholderTextColor="#444"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  selectionColor="#257beb"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Botón Cambiar Contraseña fijo */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.changePasswordButton, isLoading && styles.changePasswordButtonDisabled]}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text style={styles.changePasswordButtonText}>
              {isLoading ? "Cambiando contraseña..." : "Establecer nueva contraseña"}
            </Text>
          </TouchableOpacity>
        </View>
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
  infoSection: {
    backgroundColor: "#257beb",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  infoText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 22,
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
    paddingBottom: 20,
  },
  formContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 25,
    padding: 30,
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
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#222", // Texto oscuro para mejor contraste
    backgroundColor: "#fff",
  },
  eyeButton: {
    padding: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "transparent",
  },
  changePasswordButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  changePasswordButtonDisabled: {
    backgroundColor: "#999",
  },
  changePasswordButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
