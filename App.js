"use client"

import React, { useState } from "react"
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import { usePerfil } from "./context/PerfilContext"
import { useAuth } from "./context/AuthContext"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import Avatar from "./components/Avatar"
import Navbar from "./components/navbar"


export default function App({ navigation }) {
  const { perfil, getTransaccionesFormateadas, getBalancePrincipal } = usePerfil()
  const { isAuthenticated, userProfile, loading } = useAuth()
  // Estado para censurar el saldo
  const [saldoVisible, setSaldoVisible] = useState(false)

  // Debugging: Mostrar estado actual
  console.log("App.js - Estado actual:", {
    isAuthenticated,
    loading,
    perfilExists: !!perfil,
    userProfileExists: !!userProfile,
    perfilId: perfil?.id,
    perfilNombre: perfil?.nombre,
    perfilApellidos: perfil?.apellidos,
    perfilFoto: perfil?.fotoPerfil ? "Sí" : "No",
  })

  // Función para formatear el monto con el signo correcto
  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount)
    if (amount < 0) {
      return `-S/ ${absAmount.toFixed(2)}`
    }
    return `S/ ${absAmount.toFixed(2)}`
  }

  // Función para formatear el balance
  const formatBalance = (balance) => {
    return `S/.${balance.toLocaleString("es-PE", { minimumFractionDigits: 3 })}`
  }

  // Función para navegar a notificaciones
  const handleNavigateToNotifications = () => {
    if (navigation) {
      navigation.navigate("Notificaciones")
    }
  }

  // Función para navegar al escáner QR
  const handleNavigateToQRScanner = () => {
    if (navigation) {
      navigation.navigate("EscanearQR")
    }
  }

  // Función para navegar a enviar a personas
  const handleNavigateToEnviarPersonas = () => {
    if (navigation) {
      navigation.navigate("EnviarPersonas")
    }
  }

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </SafeAreaView>
    )
  }

  // Mostrar error si no hay perfil después de cargar
  if (!perfil) {
    console.log("App.js - No hay perfil disponible")
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: No se pudo cargar el perfil</Text>
        <Text style={styles.errorSubtext}>
          Autenticado: {isAuthenticated ? "Sí" : "No"}
          {"\n"}
          UserProfile: {userProfile ? "Sí" : "No"}
          {"\n"}
          Perfil: {perfil ? "Sí" : "No"}
        </Text>
      </SafeAreaView>
    )
  }

  // Obtener transacciones/historial formateadas
  const transaccionesFormateadas = getTransaccionesFormateadas()

  // Obtener balance principal (de la primera tarjeta)
  const balancePrincipal = getBalancePrincipal()

  // Datos seguros del perfil
  const nombreCompleto = `${perfil.nombre || "Usuario"} ${perfil.apellidos || ""}`

  console.log("App.js - Renderizando con perfil:", {
    id: perfil.id,
    nombre: perfil.nombre,
    apellidos: perfil.apellidos,
    nombreCompleto,
    fotoPerfil: perfil.fotoPerfil ? "Sí" : "No",
    transaccionesCount: transaccionesFormateadas?.length || 0,
    balance: balancePrincipal,
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Avatar
              fotoPerfil={perfil.fotoPerfil}
              nombre={perfil.nombre}
              apellidos={perfil.apellidos}
              size={60}
              fontSize={18}
            />
            <View style={styles.userTextInfo}>
              <Text style={styles.welcomeText}>Bienvenido de vuelta,</Text>
              <Text style={styles.userName}>{nombreCompleto}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNavigateToNotifications}>
            <Ionicons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Movements Section */}
      <View style={styles.movementsCard}>
        <View style={styles.movementsHeader}>
          <Text style={styles.movementsTitle}>Movimientos</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver Todo</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Transactions List */}
        <ScrollView
          style={styles.transactionsScrollView}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {transaccionesFormateadas && transaccionesFormateadas.length > 0 ? (
            transaccionesFormateadas.map((transaccion, index) => (
              <View key={transaccion.id || index}>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>{transaccion.nombreContacto}</Text>
                    <Text style={styles.transactionDate}>
                      {transaccion.fecha} - {transaccion.hora}
                    </Text>
                  </View>
                  <Text style={[styles.transactionAmount, transaccion.monto < 0 && styles.expenseAmount]}>
                    {formatAmount(transaccion.monto)}
                  </Text>
                </View>
                {index < transaccionesFormateadas.length - 1 && <View style={styles.separator} />}
              </View>
            ))
          ) : (
            <View style={styles.noTransactions}>
              <Text style={styles.noTransactionsText}>No hay transacciones recientes</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Scrollable Content Below */}
      <ScrollView
        style={styles.bottomContent}
        contentContainerStyle={styles.bottomScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Ajustes")}>
            <View style={styles.actionButtonIcon}>
              <Ionicons name="settings" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Ajustes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("PagosServicios")}>
            <View style={styles.actionButtonIcon}>
              <MaterialIcons name="miscellaneous-services" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Historial")}>
            <View style={styles.actionButtonIcon}>
              <MaterialIcons name="receipt-long" size={28} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Historial</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.balanceAmount}>
              {saldoVisible ? formatBalance(balancePrincipal) : "S/. ******"}
            </Text>
            <TouchableOpacity
              onPress={() => setSaldoVisible(!saldoVisible)}
              style={{ marginLeft: 10 }}
              accessibilityLabel={saldoVisible ? "Ocultar saldo" : "Mostrar saldo"}
            >
              <Ionicons
                name={saldoVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.scanButton} onPress={handleNavigateToQRScanner}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.mainActionText}>Escanear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleNavigateToEnviarPersonas}>
            <Text style={styles.mainActionText}>Enviar</Text>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Home" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4757",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.8,
  },
  header: {
    backgroundColor: "#257beb",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userTextInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: "#93d2fd",
    fontSize: 16,
  },
  userName: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationButton: {
    backgroundColor: "#93d2fd",
    padding: 12,
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  // Movements Card
  movementsCard: {
    backgroundColor: "#93d2fd",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 16,
    flexShrink: 0,
    flexGrow: 0,
    // Elimina height fijo
    minHeight: 120,
    maxHeight: "35%",
  },
  movementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  movementsTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#257beb",
    fontSize: 16,
    fontWeight: "600",
  },
  transactionsScrollView: {
    flexGrow: 1,
    flexShrink: 1,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  expenseAmount: {
    color: "#ff0000",
  },
  noTransactions: {
    alignItems: "center",
    paddingVertical: 16,
  },
  noTransactionsText: {
    color: "#666",
    fontSize: 16,
    fontStyle: "italic",
  },
  // Bottom scrollable content
  bottomContent: {
    flex: 1,
    marginTop: 12,
  },
  bottomScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  actionButton: {
    backgroundColor: "#93d2fd",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 0,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonIcon: {
    marginBottom: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  balanceCard: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
    alignSelf: "center",
  },
  balanceLabel: {
    color: "#93d2fd",
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  scanButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 4,
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 4,
    justifyContent: "center",
  },
  mainActionText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
})
