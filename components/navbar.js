import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

export default function Navbar({ navigation, activeScreen = "Home" }) {
  const handleNavigateToHome = () => {
    if (navigation && activeScreen !== "Home") {
      navigation.navigate("Home")
    }
  }

  const handleNavigateToTarjetas = () => {
    if (navigation && activeScreen !== "Tarjetas") {
      navigation.navigate("Tarjetas")
    }
  }

  const handleNavigateToStatistics = () => {
    if (navigation && activeScreen !== "Statistics") {
      navigation.navigate("Statistics")
    }
  }

  const handleNavigateToMiPerfil = () => {
    if (navigation && activeScreen !== "MiPerfil") {
      navigation.navigate("MiPerfil")
    }
  }

  const handleQRAction = () => {
    if (navigation) {
      navigation.navigate("MostrarQR")
    }
  }

  return (
    <View style={styles.navbarContainer}>
      {/* QR Button - Positioned above the navbar */}
      <TouchableOpacity style={styles.qrButton} onPress={handleQRAction}>
        <MaterialIcons name="qr-code-scanner" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleNavigateToHome}>
          <Ionicons
            name={activeScreen === "Home" ? "home" : "home-outline"}
            size={28}
            color={activeScreen === "Home" ? "#257beb" : "#000"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleNavigateToTarjetas}>
          <Ionicons
            name={activeScreen === "Tarjetas" ? "card" : "card-outline"}
            size={28}
            color={activeScreen === "Tarjetas" ? "#257beb" : "#000"}
          />
        </TouchableOpacity>

        {/* Spacer for QR button */}
        <View style={styles.qrSpacer} />

        <TouchableOpacity style={styles.navItem} onPress={handleNavigateToStatistics}>
          <Ionicons
            name={activeScreen === "Statistics" ? "stats-chart" : "stats-chart-outline"}
            size={28}
            color={activeScreen === "Statistics" ? "#257beb" : "#000"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleNavigateToMiPerfil}>
          <Ionicons
            name={activeScreen === "MiPerfil" ? "person" : "person-outline"}
            size={28}
            color={activeScreen === "MiPerfil" ? "#257beb" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "relative",
  },
  qrButton: {
    position: "absolute",
    top: -30,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#257beb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1000,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#93d2fd",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  qrSpacer: {
    width: 60,
    height: 1,
  },
})
