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
} from "react-native"
import { useState, useEffect } from "react"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons } from "@expo/vector-icons"

export default function EditarInformacion({ navigation }) {
  const { perfil, actualizarPerfil } = usePerfil()

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
  })

  // Función para obtener las iniciales del nombre completo
  const getInitials = (nombre, apellidos) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ""
    const lastInitial = apellidos ? apellidos.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  // Cargar datos del perfil al inicializar el componente
  useEffect(() => {
    if (perfil) {
      setFormData({
        nombres: perfil.nombre || "",
        apellidos: perfil.apellidos || "",
        email: perfil.email || "",
        telefono: perfil.telefono || "",
      })
    }
  }, [perfil])

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.nombres.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre")
      return false
    }
    if (!formData.apellidos.trim()) {
      Alert.alert("Error", "Por favor ingresa tus apellidos")
      return false
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico")
      return false
    }
    if (!formData.telefono.trim()) {
      Alert.alert("Error", "Por favor ingresa tu número de teléfono")
      return false
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido")
      return false
    }

    // Validación básica de teléfono (solo números y espacios)
    const phoneRegex = /^[0-9\s]+$/
    if (!phoneRegex.test(formData.telefono)) {
      Alert.alert("Error", "Por favor ingresa un número de teléfono válido")
      return false
    }

    return true
  }

  const handleAplicar = () => {
    if (!validateForm()) return

    try {
      // Actualizar el perfil con los nuevos datos
      const datosActualizados = {
        nombre: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
      }

      actualizarPerfil(datosActualizados)

      // Navegar de regreso inmediatamente después de aplicar cambios
      if (navigation) {
        navigation.goBack()
      }

      // Mostrar mensaje de éxito después de navegar
      setTimeout(() => {
        Alert.alert("¡Éxito!", "Información actualizada correctamente")
      }, 100)
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar la información")
      console.error("Error al actualizar perfil:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#93d2fd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Información</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(formData.nombres, formData.apellidos)}</Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {formData.nombres} {formData.apellidos}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Nombres y Apellidos */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombres y Apellidos</Text>
            <View style={styles.nameInputs}>
              <TextInput
                style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                placeholder="Nombres"
                placeholderTextColor="#999"
                value={formData.nombres}
                onChangeText={(value) => handleInputChange("nombres", value)}
              />
              <TextInput
                style={[styles.textInput, { flex: 1, marginLeft: 10 }]}
                placeholder="Apellidos"
                placeholderTextColor="#999"
                value={formData.apellidos}
                onChangeText={(value) => handleInputChange("apellidos", value)}
              />
            </View>
          </View>

          {/* Correo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: carlosramirez@gmail.com"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Número de Teléfono */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de Teléfono</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: 999 999 999"
              placeholderTextColor="#999"
              value={formData.telefono}
              onChangeText={(value) => handleInputChange("telefono", value)}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      {/* Botón Aplicar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.aplicarButton} onPress={handleAplicar}>
          <Text style={styles.aplicarButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93d2fd",
  },
  header: {
    backgroundColor: "#257beb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSpacer: {
    width: 40,
  },
  profileSection: {
    backgroundColor: "#257beb",
    alignItems: "center",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#257beb",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
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
  nameInputs: {
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#000000",
    borderWidth: 2,
    borderColor: "#000000",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  aplicarButton: {
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
  aplicarButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
