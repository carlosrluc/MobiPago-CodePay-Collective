"use client"

import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useAuth } from "../context/AuthContext"
import AppNavigator from "./AppNavigator"
import Login from "../screens/login"

export default function AuthNavigator() {
  const { user, userProfile, loading, isAuthenticated } = useAuth()

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
        <Text style={styles.loadingSubtext}>Conectando con Firestore...</Text>
      </View>
    )
  }

  // Si el usuario está autenticado y tiene perfil, mostrar la app
  if (isAuthenticated && user && userProfile) {
    console.log("Usuario autenticado, mostrando app para:", user.email)
    return <AppNavigator />
  }

  // Si no está autenticado, mostrar login
  console.log("Usuario no autenticado, mostrando login")
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
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#93d2fd",
    marginTop: 10,
  },
})
