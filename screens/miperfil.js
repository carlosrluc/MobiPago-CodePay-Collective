"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Alert } from "react-native"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons"
import Navbar from "../components/navbar"
import Avatar from "../components/Avatar"
import { useAuth } from "../context/AuthContext"

// Componente de opción de menú
const MenuOption = ({ title, onPress, iconName, iconLibrary = "Ionicons" }) => {
  const renderIcon = () => {
    switch (iconLibrary) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={20} color="#666" />
      case "AntDesign":
        return <AntDesign name={iconName} size={20} color="#666" />
      default:
        return <Ionicons name={iconName} size={20} color="#666" />
    }
  }

  return (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <Text style={styles.menuOptionText}>{title}</Text>
      {renderIcon()}
    </TouchableOpacity>
  )
}

export default function MiPerfil({ navigation }) {
  const { perfil } = usePerfil()

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleEditarInformacion = () => {
    if (navigation) {
      navigation.navigate("EditarInformacion")
    }
  }

  const handleCambiarFoto = () => {
    if (navigation) {
      navigation.navigate("CambiarFotoPerfil")
    }
  }

  const handleMetodosPago = () => {
    if (navigation) {
      navigation.navigate("Tarjetas")
    }
  }

  const handleNotificaciones = () => {
    if (navigation) {
      navigation.navigate("Notificaciones")
    }
  }

  const handleSoporte = () => {
    if (navigation) {
      navigation.navigate("Soporte")
    }
  }

  const { logout } = useAuth()

  const handleCerrarSesion = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("Iniciando proceso de cierre de sesión...")

            // Mostrar indicador de carga
            Alert.alert("Cerrando sesión", "Por favor espera...", [], { cancelable: false })

            // Realizar logout
            const result = await logout()

            if (result.success) {
              console.log("Logout exitoso, redirigiendo al login...")

              // Cerrar el alert de carga
              Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente", [
                {
                  text: "OK",
                  onPress: () => {
                    // Navegar explícitamente al login
                    if (navigation) {
                      console.log("Navegando al login...")
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                      })
                    } else {
                      console.log("Navigation no disponible, AuthNavigator debería redirigir automáticamente")
                    }
                  },
                },
              ])
            } else {
              console.error("Error en logout:", result.error)
              Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo.")
            }
          } catch (error) {
            console.error("Error inesperado en logout:", error)
            Alert.alert("Error", "Ocurrió un error inesperado al cerrar sesión")
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleCambiarFoto} style={styles.avatarTouchable}>
            <Avatar
              fotoPerfil={perfil?.fotoPerfil}
              nombre={perfil?.nombre}
              apellidos={perfil?.apellidos}
              size={100}
              fontSize={32}
              borderWidth={4}
              borderColor="#ffffff"
            />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>
          {perfil?.nombre} {perfil?.apellidos}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <MenuOption title="Cambiar Foto" onPress={handleCambiarFoto} iconName="camera-outline" />
          <MenuOption title="Editar Información" onPress={handleEditarInformacion} iconName="create-outline" />
          <MenuOption title="Métodos de Pago" onPress={handleMetodosPago} iconName="card-outline" />
          <MenuOption title="Notificaciones" onPress={handleNotificaciones} iconName="notifications-outline" />
          <MenuOption title="Soporte" onPress={handleSoporte} iconName="help-circle-outline" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleCerrarSesion}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
          <Ionicons name="log-out" size={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>

      {/* New Navbar Component */}
      <Navbar navigation={navigation} activeScreen="MiPerfil" />
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
    backgroundColor: "rgba(147, 210, 253, 0.3)", // Fondo semi-transparente para mejor visibilidad
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
  profileSection: {
    backgroundColor: "#257beb",
    alignItems: "center",
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
    position: "relative",
  },
  avatarTouchable: {
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#257beb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
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
  scrollContent: {
    paddingBottom: 90, // Reducido para eliminar espacio en blanco
  },
  menuContainer: {
    marginBottom: 40,
  },
  menuOption: {
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
    borderColor: "#000000",
  },
  menuOptionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  logoutButton: {
    backgroundColor: "#ff4757",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
})
