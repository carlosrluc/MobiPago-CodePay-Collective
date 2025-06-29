"use client"

import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Alert, Dimensions } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { useState, useEffect } from "react"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { usePerfil } from "../context/PerfilContext"
import * as ImagePicker from "expo-image-picker"

const { width, height } = Dimensions.get("window")

export default function EscanearQR({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const { todosLosPerfiles, getNombreUsuarioPorId } = usePerfil()

  useEffect(() => {
    // Reset scanned state when component mounts
    setScanned(false)
  }, [])

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleBarcodeScanned = ({ type, data }) => {
    if (scanned) return

    setScanned(true)

    // Verificar si el QR contiene un ID de usuario válido
    const userId = Number.parseInt(data)
    const usuarioEncontrado = todosLosPerfiles.find((perfil) => perfil.id === userId)

    if (usuarioEncontrado) {
      const nombreUsuario = getNombreUsuarioPorId(userId)

      Alert.alert("Usuario encontrado", `¿Deseas realizar un pago a ${nombreUsuario}?`, [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => setScanned(false),
        },
        {
          text: "Continuar",
          onPress: () => {
            // Navegar a la pantalla de pago
            navigation.navigate("EnviarPago", { destinatarioId: userId })
          },
        },
      ])
    } else {
      Alert.alert("QR no válido", "El código QR escaneado no corresponde a un usuario válido", [
        {
          text: "OK",
          onPress: () => setScanned(false),
        },
      ])
    }
  }

  const handleSearchInPhotos = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert("Permisos requeridos", "Necesitamos acceso a tus fotos para buscar códigos QR")
        return
      }

      // Abrir selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      })

      if (!result.canceled) {
        // Por ahora solo mostramos un mensaje
        // En una implementación real, aquí procesarías la imagen para detectar QR
        Alert.alert("Funcionalidad en desarrollo", "La búsqueda de QR en fotos se implementará próximamente")
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo acceder a las fotos")
    }
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <Text>Cargando cámara...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
            <Ionicons name="close" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escanear código QR</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color="#666" />
          <Text style={styles.permissionTitle}>Acceso a la cámara requerido</Text>
          <Text style={styles.permissionText}>Necesitamos acceso a tu cámara para escanear códigos QR</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Conceder permiso</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
          <Ionicons name="close" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear código QR</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          {/* QR Scanner Overlay */}
          <View style={styles.overlay}>
            {/* Top overlay */}
            <View style={styles.overlayTop} />

            {/* Middle section with scanner frame */}
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />
              <View style={styles.scannerFrame}>
                {/* Corner indicators */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />

                {/* Scanning line animation could go here */}
                <View style={styles.scanningLine} />
              </View>
              <View style={styles.overlaySide} />
            </View>

            {/* Bottom overlay */}
            <View style={styles.overlayBottom}>
              <Text style={styles.instructionText}>Enfoca el código QR del{"\n"}comercio o usuario</Text>
            </View>
          </View>
        </CameraView>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={handleSearchInPhotos}>
          <MaterialIcons name="photo-library" size={24} color="#ffffff" />
          <Text style={styles.photoButtonText}>Buscar QR en mis fotos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  headerSpacer: {
    width: 40,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayMiddle: {
    flexDirection: "row",
    height: 250,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scannerFrame: {
    width: 250,
    height: 250,
    position: "relative",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#257beb",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
  },
  scanningLine: {
    position: "absolute",
    top: "50%",
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: "#257beb",
    opacity: 0.8,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  instructionText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
  },
  bottomContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  photoButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 10,
  },
})
