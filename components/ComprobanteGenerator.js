import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ComprobanteGenerator({ transaccionData, style }) {
  const formatAmount = (amount) => {
    return `S/ ${amount.toFixed(2)}`
  }

  const getLastFourDigits = (numero) => {
    return `****${numero.slice(-4)}`
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.successCard}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={40} color="#ffffff" />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>¡Transferencia exitosa!</Text>

        {/* Amount */}
        <Text style={styles.amount}>{formatAmount(transaccionData.monto)}</Text>

        {/* Date and Time */}
        <Text style={styles.dateTime}>{transaccionData.fechaCompleta}</Text>

        {/* Movement Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Detalle del Movimiento</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Enviado a</Text>
            <View style={styles.detailValue}>
              <Text style={styles.detailText}>{transaccionData.destinatario}</Text>
              <Text style={styles.detailSubtext}>{getLastFourDigits(transaccionData.tarjetaDestino)} - MobiPago</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Comisión MobiPago</Text>
            <Text style={styles.detailText}>S/ 0.00</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Comisión banco destino</Text>
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
            {transaccionData.transactionId || `MP${Date.now().toString().slice(-8)}`}
          </Text>
        </View>

        {/* MobiPago Branding */}
        <View style={styles.brandingSection}>
          <Text style={styles.brandingText}>MobiPago</Text>
          <Text style={styles.brandingSubtext}>Transferencias seguras y rápidas</Text>
          <Text style={styles.brandingDate}>Generado el {new Date().toLocaleDateString("es-PE")}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    padding: 20,
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
})
