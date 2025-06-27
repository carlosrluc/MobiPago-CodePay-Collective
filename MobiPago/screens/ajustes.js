import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Alert } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

// Componente de opción de menú
const MenuOption = ({ title, subtitle, onPress, iconName, iconLibrary = "Ionicons", showArrow = true }) => {
  const renderIcon = () => {
    if (!iconName) return null

    switch (iconLibrary) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={24} color="#000000" style={styles.optionIcon} />
      default:
        return <Ionicons name={iconName} size={24} color="#000000" style={styles.optionIcon} />
    }
  }

  return (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <View style={styles.optionContent}>
        {renderIcon()}
        <Text style={styles.menuOptionText}>{title}</Text>
      </View>
      <View style={styles.optionRight}>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        {showArrow && <Ionicons name="chevron-forward" size={20} color="#666" />}
      </View>
    </TouchableOpacity>
  )
}

export default function Ajustes({ navigation }) {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleIdioma = () => {
    Alert.alert("Idioma", "Funcionalidad de cambio de idioma próximamente")
  }

  const handleContactanos = () => {
    if (navigation) {
      navigation.navigate("Soporte")
    }
  }

  const handleCambiarContrasena = () => {
    Alert.alert("Cambiar Contraseña", "Funcionalidad de cambio de contraseña próximamente")
  }

  const handleTerminosCondiciones = () => {
    Alert.alert("Términos y Condiciones", "Funcionalidad de términos y condiciones próximamente")
  }

  const handleReconocimientoFacial = () => {
    Alert.alert("Reconocimiento Facial", "Funcionalidad de reconocimiento facial próximamente")
  }

  const handleReconocimientoHuellas = () => {
    Alert.alert("Reconocimiento de Huellas", "Funcionalidad de reconocimiento de huellas próximamente")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sección General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <MenuOption title="Idioma" subtitle="Español" onPress={handleIdioma} showArrow={true} />
            <MenuOption title="Contáctanos" onPress={handleContactanos} showArrow={true} />
          </View>
        </View>

        {/* Sección Seguridad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          <View style={styles.sectionContent}>
            <MenuOption title="Cambiar Contraseña" onPress={handleCambiarContrasena} showArrow={true} />
            <MenuOption title="Términos y Condiciones" onPress={handleTerminosCondiciones} showArrow={true} />
            <MenuOption
              title="Reconocimiento Facial"
              onPress={handleReconocimientoFacial}
              iconName="happy"
              showArrow={false}
            />
            <MenuOption
              title="Reconocimiento de huellas dactilares"
              onPress={handleReconocimientoHuellas}
              iconName="finger-print"
              showArrow={false}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
    marginLeft: 5,
  },
  sectionContent: {
    backgroundColor: "#93d2fd",
    borderRadius: 20,
    padding: 15,
    gap: 15,
  },
  menuOption: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
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
    borderColor: "#000000",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    marginRight: 15,
  },
  menuOptionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginRight: 10,
  },
})
