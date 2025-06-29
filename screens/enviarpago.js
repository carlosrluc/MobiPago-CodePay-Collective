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
import { usePerfil } from "../context/PerfilContext"
import { useTarjetas } from "../context/TarjetasContext"
import { realizarTransferencia } from "../data/dummy-data"

// Componente de tarjeta seleccionable
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

export default function EnviarPago({ route, navigation }) {
  const { destinatarioId } = route.params
  const { getNombreUsuarioPorId, perfil, actualizarTransacciones } = usePerfil()
  const { tarjetas, actualizarTarjetas } = useTarjetas()

  const [monto, setMonto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(tarjetas[0] || null)
  const [showCardSelector, setShowCardSelector] = useState(false)

  const destinatario = getNombreUsuarioPorId(destinatarioId)

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleClose = () => {
    if (navigation) {
      navigation.navigate("Home")
    }
  }

  const formatAmount = (value) => {
    // Remover caracteres no numéricos excepto punto decimal
    const numericValue = value.replace(/[^0-9.]/g, "")

    // Evitar múltiples puntos decimales
    const parts = numericValue.split(".")
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("")
    }

    // Limitar a 2 decimales
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + "." + parts[1].substring(0, 2)
    }

    return numericValue
  }

  const handleMontoChange = (value) => {
    const formattedValue = formatAmount(value)
    setMonto(formattedValue)
  }

  const formatBalance = (balance) => {
    return `S/.${balance.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`
  }

  const getLastFourDigits = (numero) => {
    return `****${numero.slice(-4)}`
  }

  const handleSelectCard = (tarjeta) => {
    setTarjetaSeleccionada(tarjeta)
    setShowCardSelector(false)
  }

  const validatePayment = () => {
    const montoNumerico = Number.parseFloat(monto)

    if (!monto || montoNumerico <= 0) {
      Alert.alert("Error", "Por favor ingresa un monto válido")
      return false
    }

    if (!tarjetaSeleccionada) {
      Alert.alert("Error", "Por favor selecciona una tarjeta")
      return false
    }

    if (montoNumerico > tarjetaSeleccionada.balance) {
      Alert.alert("Saldo insuficiente", "No tienes suficiente saldo en la tarjeta seleccionada")
      return false
    }

    return true
  }

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

  const handleRealizarPago = () => {
    if (!validatePayment()) return

    const montoNumerico = Number.parseFloat(monto)

    Alert.alert("Confirmar Pago", `¿Estás seguro de enviar ${formatBalance(montoNumerico)} a ${destinatario}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => {
          // Realizar la transferencia real
          const resultado = realizarTransferencia(perfil.id, destinatarioId, montoNumerico, tarjetaSeleccionada.numero)

          if (resultado.success) {
            // Actualizar contextos
            actualizarTarjetas()
            if (actualizarTransacciones) {
              actualizarTransacciones()
            }

            // Preparar datos para la pantalla de éxito
            const transaccionData = {
              monto: montoNumerico,
              destinatario: destinatario,
              tarjetaDestino: resultado.tarjetaDestino,
              fechaCompleta: formatFechaCompleta(),
              mensaje: mensaje,
            }

            // Navegar a pantalla de éxito
            navigation.navigate("TransferenciaExitosa", { transaccionData })
          } else {
            Alert.alert("Error en la transferencia", resultado.error)
          }
        },
      },
    ])
  }

  // Función para obtener las iniciales del destinatario
  const getInitials = (nombre) => {
    const parts = nombre.split(" ")
    const firstInitial = parts[0] ? parts[0].charAt(0).toUpperCase() : ""
    const lastInitial = parts[1] ? parts[1].charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enviar a</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Destinatario */}
        <View style={styles.destinatarioSection}>
          <View style={styles.destinatarioAvatar}>
            <Ionicons name="person" size={32} color="#000000" />
          </View>
          <Text style={styles.perfilLabel}>Perfil</Text>
          <Text style={styles.destinatarioName}>{destinatario}</Text>
        </View>

        <View style={styles.separator} />

        {/* Monto */}
        <View style={styles.montoSection}>
          <Text style={styles.montoLabel}>Monto</Text>
          <View style={styles.montoContainer}>
            <Text style={styles.currencySymbol}>S/</Text>
            <TextInput
              style={styles.montoInput}
              value={monto}
              onChangeText={handleMontoChange}
              placeholder="0.00"
              placeholderTextColor="#cccccc"
              keyboardType="decimal-pad"
              maxLength={10}
            />
          </View>
          <Text style={styles.envioGratis}>Envío gratis</Text>
        </View>

        {/* Desde - Tarjeta seleccionada */}
        <View style={styles.desdeSection}>
          <Text style={styles.desdeLabel}>Desde</Text>

          {tarjetaSeleccionada && (
            <TouchableOpacity style={styles.tarjetaSeleccionada} onPress={() => setShowCardSelector(true)}>
              <View style={styles.tarjetaInfo}>
                <Text style={styles.tarjetaNombre}>{tarjetaSeleccionada.nombre}</Text>
                <Text style={styles.tarjetaNumero}>{getLastFourDigits(tarjetaSeleccionada.numero)}</Text>
              </View>
              <Text style={styles.tarjetaBalance}>{formatBalance(tarjetaSeleccionada.balance)}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Mensaje opcional */}
        <View style={styles.mensajeSection}>
          <TextInput
            style={styles.mensajeInput}
            value={mensaje}
            onChangeText={setMensaje}
            placeholder="Mensaje (Opcional)"
            placeholderTextColor="#999999"
            multiline
            maxLength={100}
          />
        </View>
      </ScrollView>

      {/* Botón Realizar Pago */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pagarButton} onPress={handleRealizarPago}>
          <Text style={styles.pagarButtonText}>Realizar Pago</Text>
        </TouchableOpacity>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  backButton: {
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
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  destinatarioSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  destinatarioAvatar: {
    width: 80,
    height: 50,
    backgroundColor: "#93d2fd",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  perfilLabel: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  destinatarioName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
  montoSection: {
    marginBottom: 40,
  },
  montoLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 20,
  },
  montoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },
  montoInput: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
    padding: 0,
    margin: 0,
  },
  envioGratis: {
    fontSize: 16,
    color: "#666666",
    marginTop: 5,
  },
  desdeSection: {
    marginBottom: 30,
  },
  desdeLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 15,
  },
  tarjetaSeleccionada: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tarjetaInfo: {
    flex: 1,
  },
  tarjetaNombre: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 5,
  },
  tarjetaNumero: {
    fontSize: 14,
    color: "#93d2fd",
  },
  tarjetaBalance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  mensajeSection: {
    marginBottom: 30,
  },
  mensajeInput: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    color: "#000000",
    minHeight: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pagarButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  pagarButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
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
