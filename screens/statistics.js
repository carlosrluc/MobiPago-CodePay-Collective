"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { useState, useEffect } from "react"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons } from "@expo/vector-icons"
import Navbar from "../components/navbar"
import { transaccionesEjemplo } from "../data/dummy-data"

const { width } = Dimensions.get("window")

const calcularEstadisticasMensuales = (userId) => {
  // Meses que quieres mostrar (puedes ajustar)
  const meses = ["10", "11", "12", "01", "02", "03"] // Oct, Nov, Dec, Jan, Feb, Mar
  const nombresMeses = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

  return meses.map((mes, idx) => {
    // Filtrar transacciones del mes y año 2025 SOLO del usuario actual
    const transaccionesDelMes = transaccionesEjemplo.filter((t) => {
      const [dia, mesT, anio] = t.fecha.split("/")
      // El usuario es remitente o destinatario
      return mesT === mes && anio === "2025" && (t.idRemitente === userId || t.idDestinatario === userId)
    })

    // Sumar ingresos (cuando el usuario es destinatario) y egresos (cuando es remitente)
    const ingresos = transaccionesDelMes
      .filter((t) => t.idDestinatario === userId)
      .reduce((sum, t) => sum + t.monto, 0)
    const egresos = transaccionesDelMes
      .filter((t) => t.idRemitente === userId)
      .reduce((sum, t) => sum + t.monto, 0)
    const balance = ingresos - egresos

    return {
      month: nombresMeses[idx],
      ingresos,
      egresos,
      balance,
      transacciones: transaccionesDelMes.length,
    }
  })
}

// Componente de gráfico mejorado con datos reales
const StatisticsChart = ({ monthlyData, selectedMonthIndex, onMonthChange }) => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  const chartWidth = width - 80
  const chartHeight = 200

  // Calcular valores normalizados para el gráfico (0-1)
  const maxValue = Math.max(...monthlyData.map((data) => Math.abs(data.balance)))
  const normalizedData = monthlyData.map((data) => {
    const normalizedValue = maxValue > 0 ? Math.abs(data.balance) / maxValue : 0
    return Math.max(0.1, normalizedValue) // Mínimo 0.1 para visibilidad
  })

  const handlePrevMonth = () => {
    if (selectedMonthIndex > 0) {
      onMonthChange(selectedMonthIndex - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonthIndex < months.length - 1) {
      onMonthChange(selectedMonthIndex + 1)
    }
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {/* Líneas verticales del grid */}
        {months.map((_, index) => (
          <View key={index} style={[styles.gridLine, { left: (index * chartWidth) / (months.length - 1) }]} />
        ))}

        {/* Línea del gráfico */}
        <View style={styles.chartLine}>
          {normalizedData.map((point, index) => {
            const x = (index * chartWidth) / (normalizedData.length - 1)
            const y = chartHeight - point * chartHeight * 0.8 - 20

            return (
              <View
                key={index}
                style={[
                  styles.dataPoint,
                  {
                    left: x - 6,
                    top: y - 6,
                    backgroundColor: index === selectedMonthIndex ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    borderColor: index === selectedMonthIndex ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                    borderWidth: index === selectedMonthIndex ? 3 : 2,
                  },
                ]}
              />
            )
          })}
        </View>
      </View>

      {/* Navegación de meses */}
      <View style={styles.monthNavigation}>
        <TouchableOpacity
          style={[styles.navArrow, selectedMonthIndex === 0 && styles.navArrowDisabled]}
          onPress={handlePrevMonth}
          disabled={selectedMonthIndex === 0}
        >
          <Ionicons name="chevron-back" size={20} color={selectedMonthIndex === 0 ? "#666" : "#ffffff"} />
        </TouchableOpacity>

        <View style={styles.monthLabels}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={month}
              style={[styles.monthLabel, index === selectedMonthIndex && styles.selectedMonthLabel]}
              onPress={() => onMonthChange(index)}
            >
              <Text style={[styles.monthLabelText, index === selectedMonthIndex && styles.selectedMonthLabelText]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navArrow, selectedMonthIndex === months.length - 1 && styles.navArrowDisabled]}
          onPress={handleNextMonth}
          disabled={selectedMonthIndex === months.length - 1}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={selectedMonthIndex === months.length - 1 ? "#666" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function Statistics({ navigation }) {
  const { perfil, getBalancePrincipal } = usePerfil()
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(3) // Enero por defecto
  const [monthlyData, setMonthlyData] = useState([])

  // Función para calcular porcentaje de cambio
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  // Función para formatear porcentaje
  const formatPercentage = (percentage) => {
    const sign = percentage >= 0 ? "+" : ""
    return `${sign}${percentage}%`
  }

  // Función para obtener color del porcentaje
  const getPercentageColor = (percentage) => {
    return percentage >= 0 ? "#46f58f" : "#ff4757"
  }

  useEffect(() => {
    if (perfil?.id) {
      const stats = calcularEstadisticasMensuales(perfil.id)
      setMonthlyData(stats)
    }
  }, [perfil])

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleMonthChange = (newIndex) => {
    setSelectedMonthIndex(newIndex)
  }

  // Obtener datos del mes seleccionado y anterior

  const isValidIndex = selectedMonthIndex >= 0 && selectedMonthIndex < monthlyData.length
  const currentMonthData = isValidIndex ? monthlyData[selectedMonthIndex] : { ingresos: 0, egresos: 0, balance: 0 }
  const previousMonthData =
    isValidIndex && selectedMonthIndex > 0
      ? monthlyData[selectedMonthIndex - 1]
      : { ingresos: 0, egresos: 0, balance: 0 }

  // Calcular porcentajes de cambio
  const ingresosChange = calculatePercentageChange(currentMonthData.ingresos, previousMonthData.ingresos)
  const egresosChange = calculatePercentageChange(currentMonthData.egresos, previousMonthData.egresos)
  const balanceChange = calculatePercentageChange(
    Math.abs(currentMonthData.balance),
    Math.abs(previousMonthData.balance),
  )

  // Formatear montos
  const formatAmount = (amount) => {
    return `S/.${amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`
  }

  const balancePrincipal = getBalancePrincipal()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estadísticas</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceAmount}>{formatAmount(balancePrincipal)}</Text>
        </View>

        {/* Chart Section */}
        <StatisticsChart
          monthlyData={monthlyData}
          selectedMonthIndex={selectedMonthIndex}
          onMonthChange={handleMonthChange}
        />

        {/* Statistics Cards */}
        <View style={styles.statisticsCard}>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticLabel}>Saldo gastado Mensualmente</Text>
            <View style={styles.statisticValueRow}>
              <Text style={styles.statisticValue}>{formatAmount(currentMonthData.egresos)}</Text>
              <Text style={[styles.statisticPercentage, { color: getPercentageColor(egresosChange) }]}>
                {formatPercentage(egresosChange)}
              </Text>
            </View>
          </View>

          <View style={styles.statisticItem}>
            <Text style={styles.statisticLabel}>Ingresos de este mes</Text>
            <View style={styles.statisticValueRow}>
              <Text style={styles.statisticValue}>{formatAmount(currentMonthData.ingresos)}</Text>
              <Text style={[styles.statisticPercentage, { color: getPercentageColor(ingresosChange) }]}>
                {formatPercentage(ingresosChange)}
              </Text>
            </View>
          </View>

          <View style={styles.statisticItem}>
            <Text style={styles.statisticLabel}>Egresos de este mes</Text>
            <View style={styles.statisticValueRow}>
              <Text style={styles.statisticValue}>{formatAmount(currentMonthData.egresos)}</Text>
              <Text style={[styles.statisticPercentage, { color: getPercentageColor(egresosChange) }]}>
                {formatPercentage(egresosChange)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Statistics" />
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  balanceSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  balanceLabel: {
    fontSize: 18,
    color: "#93d2fd",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  chartContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chart: {
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  gridLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    top: 0,
  },
  chartLine: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dataPoint: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  monthNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  navArrowDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  monthLabels: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  monthLabel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  selectedMonthLabel: {
    backgroundColor: "#93d2fd",
  },
  monthLabelText: {
    fontSize: 16,
    color: "#93d2fd",
    fontWeight: "500",
  },
  selectedMonthLabelText: {
    color: "#257beb",
    fontWeight: "bold",
  },
  statisticsCard: {
    backgroundColor: "#93d2fd",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    marginTop: 20,
    minHeight: 300,
  },
  statisticItem: {
    marginBottom: 25,
  },
  statisticLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  statisticValueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statisticPercentage: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
