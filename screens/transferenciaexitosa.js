"use client"

import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Alert } from "react-native"
import { useRef, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import ComprobanteService from "../services/ComprobanteService"

export default function TransferenciaExitosa({ route, navigation }) {
  const { transaccionData } = route.params
  const viewRef = useRef()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleGoHome = () => {
    if (navigation) {
      navigation.navigate("Home")
    }
  }

  const handleDownload = async () => {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      console.log("Iniciando descarga...")

      // Descargar comprobante
      const result = await ComprobanteService.downloadReceipt(viewRef, transaccionData, {
        captureOptions: {
          format: "png",
          quality: 1.0,
          result: "tmpfile",
          snapshotContentContainer: false,
        },
        albumName: "MobiPago Comprobantes",
      })

      if (result.success) {
        Alert.alert("¡Éxito!", result.message, [
          {
            text: "OK",
            style: "default",
          },
        ])
      } else {
        Alert.alert("Error", result.error || "No se pudo descargar el comprobante")
      }
    } catch (error) {
      console.error("Error inesperado en descarga:", error)
      Alert.alert("Error", "Ocurrió un error inesperado al descargar")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShare = async () => {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      console.log("Iniciando compartir...")

      // Compartir comprobante
      const result = await ComprobanteService.shareReceipt(viewRef, transaccionData, {
        captureOptions: {
          format: "png",
          quality: 1.0,
          result: "tmpfile",
          snapshotContentContainer: false,
        },
        shareOptions: {
          dialogTitle: transaccionData.esServicio
            ? "Compartir Comprobante de Pago de Servicio"
            : "Compartir Comprobante de Transferencia",
          mimeType: "image/png",
        },
      })

      if (!result.success) {
        Alert.alert("Error", result.error || "No se pudo compartir el comprobante")
      }
      // Si es exitoso, no mostramos alerta porque el usuario ya interactuó con el diálogo de compartir
    } catch (error) {
      console.error("Error inesperado en compartir:", error)
      Alert.alert("Error", "Ocurrió un error inesperado al compartir")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatAmount = (amount) => {
    return `S/ ${amount.toFixed(2)}`
  }

  const getLastFourDigits = (numero) => {
    return `****${numero.slice(-4)}`
  }

  // Determinar si es pago de servicio o transferencia
  const esServicio = transaccionData.esServicio || false
  const tituloTransaccion = esServicio ? "¡Pago exitoso!" : "¡Transferencia exitosa!"
  const labelDestinatario = esServicio ? "Pagado a" : "Enviado a"

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header Background */}
      <View style={styles.headerBackground} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Card - Esta es la vista que se capturará */}
        <View ref={viewRef} style={styles.captureContainer} collapsable={false}>
          <View style={styles.successCard}>
            {/* Success Icon */}
            <View style={styles.successIconContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={40} color="#ffffff" />
              </View>
            </View>

            {/* Success Message */}
            <Text style={styles.successTitle}>{tituloTransaccion}</Text>

            {/* Amount */}
            <Text style={styles.amount}>{formatAmount(transaccionData.monto)}</Text>

            {/* Date and Time */}
            <Text style={styles.dateTime}>{transaccionData.fechaCompleta}</Text>

            {/* Movement Details */}
            <View style={styles.detailsSection}>
              <Text style={styles.detailsTitle}>Detalle del Movimiento</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{labelDestinatario}</Text>
                <View style={styles.detailValue}>
                  <Text style={styles.detailText}>{transaccionData.destinatario}</Text>
                  {!esServicio && (
                    <Text style={styles.detailSubtext}>
                      {getLastFourDigits(transaccionData.tarjetaDestino)} - MobiPago
                    </Text>
                  )}
                  {esServicio && <Text style={styles.detailSubtext}>Pago de servicio - MobiPago</Text>}
                </View>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Comisión MobiPago</Text>
                <Text style={styles.detailText}>S/ 0.00</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{esServicio ? "Comisión servicio" : "Comisión banco destino"}</Text>
                <Text style={styles.detailText}>S/ 0.00</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
                <Text style={styles.totalLabel}>Total cobrado</Text>
                <Text style={styles.totalAmount}>{formatAmount(transaccionData.monto)}</Text>
              </View>
            </View>

            {/* Transaction ID */}
            <View style={styles.transactionIdSection}>
              <Text style={styles.transactionIdLabel}>ID de Transacción</Text>
              <Text style={styles.transactionId}>
                {esServicio ? `PS${Date.now().toString().slice(-8)}` : `MP${Date.now().toString().slice(-8)}`}
              </Text>
            </View>

            {/* MobiPago Branding */}
            <View style={styles.brandingSection}>
              <Text style={styles.brandingText}>MobiPago</Text>
              <Text style={styles.brandingSubtext}>
                {esServicio ? "Pagos de servicios seguros y rápidos" : "Transferencias seguras y rápidas"}
              </Text>
              <Text style={styles.brandingDate}>Generado el {new Date().toLocaleDateString("es-PE")}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons - Fuera del área de captura */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, isProcessing && styles.actionButtonDisabled]}
            onPress={handleDownload}
            disabled={isProcessing}
          >
            <Ionicons name="download-outline" size={20} color={isProcessing ? "#999" : "#257beb"} />
            <Text style={[styles.actionButtonText, isProcessing && styles.actionButtonTextDisabled]}>
              {isProcessing ? "Procesando..." : "Descargar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, isProcessing && styles.actionButtonDisabled]}
            onPress={handleShare}
            disabled={isProcessing}
          >
            <Ionicons name="share-outline" size={20} color={isProcessing ? "#999" : "#257beb"} />
            <Text style={[styles.actionButtonText, isProcessing && styles.actionButtonTextDisabled]}>
              {isProcessing ? "Procesando..." : "Compartir"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  headerBackground: {
    height: 100,
    backgroundColor: "#257beb",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -50, // Overlap with header
  },
  captureContainer: {
    backgroundColor: "#f0f8ff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  successCard: {
    backgroundColor: "#93d2fd",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
    width: "100%",
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  amount: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  dateTime: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  detailsSection: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  detailValue: {
    alignItems: "flex-end",
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "right",
  },
  detailSubtext: {
    fontSize: 14,
    color: "#666666",
    textAlign: "right",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  transactionIdSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  transactionIdLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#257beb",
    fontFamily: "monospace",
  },
  brandingSection: {
    alignItems: "center",
  },
  brandingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#257beb",
    marginBottom: 5,
  },
  brandingSubtext: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 5,
    textAlign: "center",
  },
  brandingDate: {
    fontSize: 12,
    color: "#999999",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#257beb",
    minWidth: 120,
    justifyContent: "center",
  },
  actionButtonDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#257beb",
    marginLeft: 8,
  },
  actionButtonTextDisabled: {
    color: "#999",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  homeButton: {
    backgroundColor: "#257beb",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
})
