"use client"

import { View, Text, StyleSheet } from "react-native"
import { useAuth } from "../context/AuthContext"
import AppNavigator from "./AppNavigator"
import Login from "../screens/login"

export default function AuthNavigator() {
  const { user, userProfile, loading } = useAuth()

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }

  // Si el usuario está autenticado y tiene perfil, mostrar la app
  if (user && userProfile) {
    return <AppNavigator />
  }

  // Si no está autenticado, mostrar login
  return <Login />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#257beb",
  },
  loadingText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
})
