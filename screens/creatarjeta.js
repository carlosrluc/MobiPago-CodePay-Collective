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
import { useState } from "react"
import Tarjeta from "../models/tarjeta"
import { useTarjetas } from "../context/TarjetasContext"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons } from "@expo/vector-icons"

// Componente de vista previa de la tarjeta
const CardPreview = ({ cardName, cardNumber, cardHolder, expiryDate }) => {
  const displayNumber = cardNumber ? cardNumber.replace(/(.{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"
  const displayName = cardName || "Nueva Tarjeta"

  return (
    <View style={styles.cardPreview}>
      {/* Logo de Mastercard */}
      <View style={styles.cardLogo}>
        <View style={[styles.logoCircle, { backgroundColor: "#ff5f00" }]} />
        <View style={[styles.logoCircle, { backgroundColor: "#eb001b", marginLeft: -8 }]} />
      </View>

      {/* Información de la tarjeta */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardPreviewNumber}>{displayNumber}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardPreviewHolder}>{cardHolder || "NOMBRE DEL TITULAR"}</Text>
          <Text style={styles.cardPreviewExpiry}>{expiryDate || "MM/YY"}</Text>
        </View>
      </View>
    </View>
  )
}

export default function CrearTarjeta({ navigation }) {
  const { agregarTarjeta } = useTarjetas()
  const { perfil } = usePerfil()

  const [formData, setFormData] = useState({
    nombre: "",
    numero: "",
    titular: "",
    fechaCaducidad: "",
    cvv: "",
  })

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleInputChange = (field, value) => {
    let formattedValue = value

    // Formatear número de tarjeta (agregar espacios cada 4 dígitos)
    if (field === "numero") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) return // Limitar a 16 dígitos + espacios
    }

    // Formatear fecha de caducidad (MM/YY)
    if (field === "fechaCaducidad") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4)
      }
      if (formattedValue.length > 5) return
    }

    // Limitar CVV a 3 dígitos
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3)
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre de identificación de la tarjeta")
      return false
    }
    if (!formData.numero.trim() || formData.numero.replace(/\s/g, "").length !== 16) {
      Alert.alert("Error", "Por favor ingresa un número de tarjeta válido (16 dígitos)")
      return false
    }
    if (!formData.titular.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre del titular")
      return false
    }
    if (!formData.fechaCaducidad.trim() || formData.fechaCaducidad.length !== 5) {
      Alert.alert("Error", "Por favor ingresa una fecha de caducidad válida (MM/YY)")
      return false
    }
    if (!formData.cvv.trim() || formData.cvv.length !== 3) {
      Alert.alert("Error", "Por favor ingresa un CVV válido (3 dígitos)")
      return false
    }
    return true
  }

  const handleCreateCard = () => {
    if (!validateForm()) return

    try {
      // Crear nueva instancia de Tarjeta con el perfilId del usuario actual
      const nuevaTarjeta = new Tarjeta(
        formData.nombre.trim(),
        formData.numero.replace(/\s/g, ""), // Remover espacios para almacenar
        formData.titular.trim(),
        formData.fechaCaducidad.trim(),
        formData.cvv.trim(),
        perfil.id, // Usar el ID del perfil actual
      )

      // Agregar la nueva tarjeta usando el contexto
      agregarTarjeta(nuevaTarjeta)

      Alert.alert("¡Éxito!", "Tarjeta creada correctamente", [
        {
          text: "OK",
          onPress: () => {
            // Navegar de regreso a la pantalla de tarjetas
            if (navigation) {
              navigation.navigate("Tarjetas")
            }
          },
        },
      ])
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la tarjeta")
      console.error("Error al crear tarjeta:", error)
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
        <Text style={styles.headerTitle}>Crear Tarjeta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Vista previa de la tarjeta */}
        <CardPreview
          cardName={formData.nombre}
          cardNumber={formData.numero}
          cardHolder={formData.titular}
          expiryDate={formData.fechaCaducidad}
        />

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Tarjeta de Identificación */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tarjeta de Identificación</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: Tarjeta principal"
              placeholderTextColor="#999"
              value={formData.nombre}
              onChangeText={(value) => handleInputChange("nombre", value)}
            />
          </View>

          {/* Número de Tarjeta */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de Tarjeta</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Número de tarjeta"
              placeholderTextColor="#999"
              value={formData.numero}
              onChangeText={(value) => handleInputChange("numero", value)}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          {/* Nombre del Titular */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Titular de la Tarjeta</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: Carlos Ramirez"
              placeholderTextColor="#999"
              value={formData.titular}
              onChangeText={(value) => handleInputChange("titular", value)}
            />
          </View>

          {/* Fecha de Caducidad y CVV */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Fecha de Caducidad</Text>
              <TextInput
                style={styles.textInput}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                value={formData.fechaCaducidad}
                onChangeText={(value) => handleInputChange("fechaCaducidad", value)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.textInput}
                placeholder="CVV"
                placeholderTextColor="#999"
                value={formData.cvv}
                onChangeText={(value) => handleInputChange("cvv", value)}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón Crear Tarjeta */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateCard}>
          <Text style={styles.createButtonText}>Crear Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257beb",
  },
  header: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardPreview: {
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    position: "relative",
    backgroundColor: "#667eea",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardLogo: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardPreviewNumber: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 15,
    fontFamily: "monospace",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardPreviewHolder: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.9,
  },
  cardPreviewExpiry: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.9,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
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
  rowInputs: {
    flexDirection: "row",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  createButton: {
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
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
