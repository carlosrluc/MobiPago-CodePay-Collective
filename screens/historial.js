"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, TextInput } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { usePerfil } from "../context/PerfilContext"
import Navbar from "../components/navbar"

// Componente de transacción individual
const TransactionItem = ({ transaccion }) => {
  const formatAmount = (amount) => {
    const absAmount = Math.abs(amount)
    if (amount < 0) {
      return `-S/ ${absAmount.toFixed(2)}`
    }
    return `S/ ${absAmount.toFixed(2)}`
  }

  const getAmountStyle = (amount) => {
    return amount < 0 ? styles.negativeAmount : styles.positiveAmount
  }

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionName}>{transaccion.nombreContacto}</Text>
        <Text style={styles.transactionDate}>
          {transaccion.fecha} - {transaccion.hora}
        </Text>
      </View>
      <Text style={[styles.transactionAmount, getAmountStyle(transaccion.monto)]}>
        {formatAmount(transaccion.monto)}
      </Text>
    </View>
  )
}

export default function Historial({ navigation }) {
  const { getTransaccionesFormateadas } = usePerfil()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState([])

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  // Obtener todas las transacciones formateadas
  const todasLasTransacciones = getTransaccionesFormateadas()

  // Función para filtrar transacciones
  const handleSearch = (term) => {
    setSearchTerm(term)

    if (term.trim() === "") {
      setFilteredTransactions([])
      return
    }

    const filtered = todasLasTransacciones.filter((transaccion) =>
      transaccion.nombreContacto.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredTransactions(filtered)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setFilteredTransactions([])
  }

  // Determinar qué transacciones mostrar
  const transaccionesAMostrar = searchTerm.trim() !== "" ? filteredTransactions : todasLasTransacciones

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={handleSearch}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>
            {searchTerm.trim() !== "" ? "Resultados de búsqueda" : "Últimos Pagos"}
          </Text>

          <View style={styles.transactionsContainer}>
            {transaccionesAMostrar && transaccionesAMostrar.length > 0 ? (
              transaccionesAMostrar.map((transaccion, index) => (
                <View key={transaccion.id || index}>
                  <TransactionItem transaccion={transaccion} />
                  {index < transaccionesAMostrar.length - 1 && <View style={styles.separator} />}
                </View>
              ))
            ) : searchTerm.trim() !== "" ? (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color="#999" />
                <Text style={styles.noResultsTitle}>No se encontraron transacciones</Text>
                <Text style={styles.noResultsText}>Intenta con otro nombre de contacto</Text>
              </View>
            ) : (
              <View style={styles.noTransactions}>
                <Ionicons name="receipt-outline" size={48} color="#999" />
                <Text style={styles.noTransactionsTitle}>No hay transacciones</Text>
                <Text style={styles.noTransactionsText}>Aquí aparecerán todas tus transacciones realizadas</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Historial" />
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
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, // Espacio para el navbar
  },
  transactionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  transactionsContainer: {
    backgroundColor: "#93d2fd",
    borderRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 5,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: "#666666",
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  positiveAmount: {
    color: "#000000",
  },
  negativeAmount: {
    color: "#ff0000",
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  noTransactions: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noTransactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  noTransactionsText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
})
