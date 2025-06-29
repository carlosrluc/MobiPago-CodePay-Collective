import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { usePerfil } from "../context/PerfilContext"
import QRCode from "react-native-qrcode-svg"

const { width } = Dimensions.get("window")

export default function MostrarQR({ navigation }) {
  const { perfil, getBalancePrincipal } = usePerfil()

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Código QR</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(perfil.nombre, perfil.apellidos)}</Text>
          </View>
          <Text style={styles.userName}>
            {perfil.nombre} {perfil.apellidos}
          </Text>
          <Text style={styles.userBalance}>
            Saldo: S/.{getBalancePrincipal().toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={perfil.id.toString()}
              size={200}
              color="#000000"
              backgroundColor="#ffffff"
              logo={require("../assets/icon.png")} // Opcional: logo de la app
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          </View>
          <Text style={styles.qrDescription}>
            Comparte este código QR para que otros usuarios puedan enviarte dinero
          </Text>
          <Text style={styles.qrId}>ID: {perfil.id}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionItem}>
            <Ionicons name="scan" size={24} color="#257beb" />
            <Text style={styles.instructionText}>Otros usuarios pueden escanear tu código para enviarte dinero</Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="shield-checkmark" size={24} color="#257beb" />
            <Text style={styles.instructionText}>Tu código QR es único y seguro</Text>
          </View>
        </View>
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
    paddingTop: 20,
  },
  userSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#257beb",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#257beb",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  userBalance: {
    fontSize: 16,
    color: "#666666",
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  qrWrapper: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  qrDescription: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  qrId: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "600",
  },
  instructionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 15,
    flex: 1,
    lineHeight: 22,
  },
})
