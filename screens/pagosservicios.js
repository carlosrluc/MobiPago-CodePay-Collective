"use client"

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Modal,
} from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useTarjetas } from "../context/TarjetasContext"
import { buscarServicios, realizarPagoServicio } from "../data/servicios-data"

// Componente de tarjeta seleccionable para pagos
const SelectableCard = ({ tarjeta, isSelected, onPress }) => {
  const formatBalance = (balance) => {
    return `S/.${balance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`
  }

  const getLastFourDigits = (numero) => {
    return `****${numero.slice(-4)}`
  }

  return (
    <TouchableOpacity style={[styles.selectableCard, isSelected && styles.selectedCard]} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{tarjeta.nombre}</Text>
          <Text style={styles.cardNumber}>{getLastFourDigits(tarjeta.numero)}</Text>
        </View>
        <Text style={styles.cardBalance}>{formatBalance(tarjeta.balance)}</Text>
      </View>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color="#257beb" />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default function PagosServicios({ navigation }) {
  const { tarjetas, actualizarTarjetas } = useTarjetas()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showCardSelector, setShowCardSelector] = useState(false)
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(tarjetas[0] || null)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.length >= 2) {
      const results = buscarServicios(term)
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleSelectCard = (tarjeta) => {
    setTarjetaSeleccionada(tarjeta)
    setShowCardSelector(false) // cierra el model
  }

  const handlePagarServicio = (servicio) => {
    console.log("Intentando pagar servicio:", servicio)
    Alert.alert(
      "Confirmar Pago",
      `¿Estás seguro que quieres realizar este pago de S/ ${servicio.montoMensual.toFixed(2)} a ${servicio.nombre}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            console.log("Presionaste Sí en el Alert")
            if (!tarjetaSeleccionada) {
              Alert.alert("Error", "Selecciona una tarjeta para realizar el pago")
              return
            }

            // Realizar el pago
            const resultado = realizarPagoServicio(servicio, tarjetaSeleccionada)
            console.log("Resultado de realizarPagoServicio:", resultado)

            if (resultado.success) {
              // Actualizar contexto de tarjetas
              actualizarTarjetas()

              // Preparar datos para la pantalla de éxito
              const formatFechaCompleta = () => {
                const ahora = new Date()
                const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
                const meses = [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ]

                const diaSemana = diasSemana[ahora.getDay()]
                const dia = ahora.getDate().toString().padStart(2, "0")
                const mes = meses[ahora.getMonth()]
                const año = ahora.getFullYear()
                const hora = ahora.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })

                return `${diaSemana} ${dia} de ${mes} ${año} - ${hora}`
              }

              const transaccionData = {
                monto: servicio.montoMensual,
                destinatario: servicio.nombre,
                tarjetaDestino: "0000", // Para servicios no necesitamos número de tarjeta
                fechaCompleta: formatFechaCompleta(),
                mensaje: `Pago de ${servicio.descripcion}`,
                esServicio: true, // Flag para identificar que es un pago de servicio
              }

              // Navegar a pantalla de éxito
              navigation.navigate("TransferenciaExitosa", { transaccionData })
            } else {
              Alert.alert("Error en el pago", resultado.error)
            }
          },
        },
      ],
    )
  }

  const formatBalance = (balance) => {
    return `S/.${balance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`
  }

  const getLastFourDigits = (numero) => {
    return `****${numero.slice(-4)}`
  }

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case "agua":
        return "water"
      case "luz":
        return "flash"
      case "gas":
        return "flame"
      case "telefonia":
        return "call"
      case "internet":
        return "wifi"
      case "television":
        return "tv"
      case "seguros":
        return "shield-checkmark"
      case "transporte":
        return "car"
      case "gobierno":
        return "business"
      case "educacion":
        return "school"
      case "automotriz":
        return "car-sport"
      case "bancario":
        return "card"
      case "combustible":
        return "car"
      case "entretenimiento":
        return "play-circle"
      case "retail":
        return "storefront"
      case "correos":
        return "mail"
      default:
        return "business"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagos de servicios</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicio por nombre"
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={handleSearch}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchTerm("");
                setShowSearchResults(false);
              }}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>Servicios encontrados</Text>
            {searchResults.slice(0, 10).map((servicio) => (
              <View key={servicio.id} style={styles.searchResultItem}>
                <View style={styles.searchResultLeft}>
                  <View style={styles.servicioHeader}>
                    <Ionicons
                      name={getCategoriaIcon(servicio.categoria)}
                      size={20}
                      color="#257beb"
                    />
                    <Text style={styles.searchResultName}>
                      {servicio.nombre}
                    </Text>
                  </View>
                  <Text style={styles.searchResultCategory}>
                    {servicio.categoria}
                  </Text>
                  <Text style={styles.searchResultDescription}>
                    {servicio.descripcion}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.montoButton}
                  onPress={() => {
                    if (!showCardSelector) handlePagarServicio(servicio);
                  }}
                >
                  <Text style={styles.montoButtonText}>
                    S/ {servicio.montoMensual.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {!showSearchResults && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>
              Busca servicios para pagar
            </Text>
            <Text style={styles.emptyStateText}>
              Escribe el nombre del servicio que deseas pagar en el buscador de
              arriba
            </Text>
          </View>
        )}

        {/* No Results */}
        {showSearchResults && searchResults.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search" size={48} color="#999" />
            <Text style={styles.noResultsTitle}>
              No se encontraron servicios
            </Text>
            <Text style={styles.noResultsText}>
              Intenta con otro nombre de servicio o empresa
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Card Selection */}
      <View style={styles.cardSelectionContainer}>
        <Text style={styles.cardSelectionTitle}>Tarjeta para pagos:</Text>
        {tarjetaSeleccionada && (
          <TouchableOpacity
            style={styles.selectedCardContainer}
            onPress={() => setShowCardSelector(true)}
          >
            <View style={styles.selectedCardInfo}>
              <Text style={styles.selectedCardName}>
                {tarjetaSeleccionada.nombre}
              </Text>
              <Text style={styles.selectedCardNumber}>
                {getLastFourDigits(tarjetaSeleccionada.numero)}
              </Text>
            </View>
            <Text style={styles.selectedCardBalance}>
              {formatBalance(tarjetaSeleccionada.balance)}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal de selección de tarjetas */}
      <Modal
        visible={showCardSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCardSelector(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Tarjeta</Text>
            <TouchableOpacity onPress={() => setShowCardSelector(false)}>
              <Ionicons name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {tarjetas.map((tarjeta, index) => (
              <SelectableCard
                key={`${tarjeta.numero}-${index}`}
                tarjeta={tarjeta}
                isSelected={tarjetaSeleccionada?.numero === tarjeta.numero}
                onPress={() => handleSelectCard(tarjeta)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
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
    backgroundColor: "#257beb",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchResultsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  searchResultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchResultLeft: {
    flex: 1,
    marginRight: 15,
  },
  servicioHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 8,
  },
  searchResultCategory: {
    fontSize: 14,
    color: "#257beb",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  searchResultDescription: {
    fontSize: 12,
    color: "#666666",
  },
  montoButton: {
    backgroundColor: "#257beb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  montoButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 15,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  cardSelectionContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardSelectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 10,
  },
  selectedCardContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#257beb",
  },
  selectedCardInfo: {
    flex: 1,
  },
  selectedCardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  selectedCardNumber: {
    fontSize: 14,
    color: "#666666",
  },
  selectedCardBalance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#257beb",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  selectableCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#257beb",
    backgroundColor: "#f0f8ff",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 14,
    color: "#666666",
  },
  cardBalance: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  selectedIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
  },
})
