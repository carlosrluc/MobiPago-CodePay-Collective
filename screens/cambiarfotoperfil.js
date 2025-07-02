"use client"

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { usePerfil } from "../context/PerfilContext"

export default function CambiarFotoPerfil({ navigation }) {
  const { perfil, actualizarFotoPerfil } = usePerfil()
  const [selectedImage, setSelectedImage] = useState(perfil?.fotoPerfil || null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  // Función para obtener las iniciales del nombre completo
  const getInitials = (nombre, apellidos) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ""
    const lastInitial = apellidos ? apellidos.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  const requestPermissions = async () => {
    try {
      // Solicitar permisos para la cámara
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

      // Solicitar permisos para la galería
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (cameraPermission.status !== "granted" || mediaLibraryPermission.status !== "granted") {
        Alert.alert("Permisos requeridos", "Necesitamos acceso a tu cámara y galería para cambiar tu foto de perfil")
        return false
      }

      return true
    } catch (error) {
      console.error("Error solicitando permisos:", error)
      Alert.alert("Error", "No se pudieron solicitar los permisos necesarios")
      return false
    }
  }

  const handleTakePhoto = async () => {
    const hasPermissions = await requestPermissions()
    if (!hasPermissions) return

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Aspecto cuadrado para foto de perfil
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Error tomando foto:", error)
      Alert.alert("Error", "No se pudo tomar la foto")
    }
  }

  const handleSelectFromGallery = async () => {
    const hasPermissions = await requestPermissions()
    if (!hasPermissions) return

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Aspecto cuadrado para foto de perfil
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Error seleccionando imagen:", error)
      Alert.alert("Error", "No se pudo seleccionar la imagen")
    }
  }

  const handleRemovePhoto = () => {
    Alert.alert("Eliminar foto", "¿Estás seguro que deseas eliminar tu foto de perfil?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setSelectedImage(null)
        },
      },
    ])
  }

  const handleSavePhoto = async () => {
    setIsLoading(true)

    try {
      console.log("Guardando foto de perfil:", selectedImage)

      // Actualizar foto en el contexto y dummy-data
      const result = await actualizarFotoPerfil(selectedImage)

      if (result.success) {
        Alert.alert("¡Éxito!", "Tu foto de perfil ha sido actualizada", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack()
            },
          },
        ])
      } else {
        Alert.alert("Error", result.error || "No se pudo actualizar la foto de perfil")
      }
    } catch (error) {
      console.error("Error guardando foto:", error)
      Alert.alert("Error", "Ocurrió un error inesperado al guardar la foto")
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = selectedImage !== (perfil?.fotoPerfil || null)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cambiar Foto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Foto Actual</Text>
          <View style={styles.currentPhotoContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{getInitials(perfil?.nombre, perfil?.apellidos)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Opciones</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleTakePhoto} disabled={isLoading}>
            <View style={styles.actionButtonContent}>
              <Ionicons name="camera" size={24} color="#257beb" />
              <Text style={styles.actionButtonText}>Tomar Foto</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSelectFromGallery} disabled={isLoading}>
            <View style={styles.actionButtonContent}>
              <Ionicons name="images" size={24} color="#257beb" />
              <Text style={styles.actionButtonText}>Seleccionar de Galería</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          {selectedImage && (
            <TouchableOpacity style={styles.actionButton} onPress={handleRemovePhoto} disabled={isLoading}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="trash" size={24} color="#ff4757" />
                <Text style={[styles.actionButtonText, { color: "#ff4757" }]}>Eliminar Foto</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Save Button */}
      {hasChanges && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
            onPress={handleSavePhoto}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>{isLoading ? "Guardando..." : "Guardar Cambios"}</Text>
          </TouchableOpacity>
        </View>
      )}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
  },
  currentPhotoContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#257beb",
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#93d2fd",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#257beb",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#257beb",
  },
  actionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 15,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
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
  saveButtonDisabled: {
    backgroundColor: "#999",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
