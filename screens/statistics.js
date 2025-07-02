"use client"

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { useState, useEffect } from "react"
import { usePerfil } from "../context/PerfilContext"
import { Ionicons } from "@expo/vector-icons"
import Navbar from "../components/navbar"

const { width } = Dimensions.get("window")

// Componente de gráfico de barras mejorado
const BarChart = ({ monthlyData, selectedMonthIndex, onMonthChange }) => {
  const chartWidth = width - 80
  const chartHeight = 200
  const barWidth = 20

  // Calcular valores normalizados para el gráfico (0-1)
  const maxValue = Math.max(...monthlyData.map((data) => Math.max(data.ingresos, 1)))

  const handlePrevMonth = () => {
    if (selectedMonthIndex > 0) {
      onMonthChange(selectedMonthIndex - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonthIndex < monthlyData.length - 1) {
      onMonthChange(selectedMonthIndex + 1)
    }
  }

  return (
    <View style={styles.chartContainer}>
      {/* Título del gráfico */}
      <Text style={styles.chartTitle}>Ingresos Mensuales</Text>

      {/* Gráfico de barras */}
      <View style={styles.chart}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.barsContainer}>
          {monthlyData.map((data, index) => {
            const barHeight = maxValue > 0 ? (data.ingresos / maxValue) * (chartHeight - 40) : 0
            const isSelected = index === selectedMonthIndex

            return (
              <TouchableOpacity key={index} style={styles.barContainer} onPress={() => onMonthChange(index)}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max(barHeight, 5), // Mínimo 5px para visibilidad
                        backgroundColor: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                        width: barWidth,
                      },
                    ]}
                  />
                  <Text style={[styles.barValue, isSelected && styles.selectedBarValue]}>
                    S/{Math.round(data.ingresos)}
                  </Text>
                </View>
                <Text style={[styles.barLabel, isSelected && styles.selectedBarLabel]}>{data.monthShort}</Text>
                <Text style={[styles.barYear, isSelected && styles.selectedBarYear]}>{data.year}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
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

        <View style={styles.currentMonthDisplay}>
          <Text style={styles.currentMonthText}>
            {monthlyData[selectedMonthIndex]?.monthName} {monthlyData[selectedMonthIndex]?.year}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navArrow, selectedMonthIndex === monthlyData.length - 1 && styles.navArrowDisabled]}
          onPress={handleNextMonth}
          disabled={selectedMonthIndex === monthlyData.length - 1}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={selectedMonthIndex === monthlyData.length - 1 ? "#666" : "#ffffff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function Statistics({ navigation }) {
  const { perfil, getTransaccionesFormateadas, getBalancePrincipal } = usePerfil()
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0) // Julio 2025 por defecto (mes actual)
  const [monthlyData, setMonthlyData] = useState([])

  // Función para generar todos los meses desde julio 2025 hasta julio 2024
  const generateMonthsArray = () => {
    const months = []
    const monthNames = [
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
    const monthShorts = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

    // Empezar desde julio 2025 (mes actual) hacia atrás
    let currentYear = 2025
    let currentMonth = 6 // Julio (índice 6)

    for (let i = 0; i < 13; i++) {
      // 13 meses: julio 2025 a julio 2024
      months.push({
        monthNumber: String(currentMonth + 1).padStart(2, "0"),
        monthName: monthNames[currentMonth],
        monthShort: monthShorts[currentMonth],
        year: currentYear,
        index: i,
      })

      // Retroceder un mes
      currentMonth--
      if (currentMonth < 0) {
        currentMonth = 11 // Diciembre
        currentYear--
      }
    }

    return months
  }

  // Función para calcular estadísticas mensuales
  const calculateMonthlyStatistics = () => {
    const transacciones = getTransaccionesFormateadas()
    const monthsArray = generateMonthsArray()

    const monthlyStats = monthsArray.map((monthInfo) => {
      // Filtrar transacciones del mes específico
      const transaccionesDelMes = transacciones.filter((t) => {
        const [dia, mes, año] = t.fecha.split("/")
        return mes === monthInfo.monthNumber && año === String(monthInfo.year)
      })

      // Calcular ingresos (transacciones positivas - dinero que recibió el usuario)
      const ingresos = transaccionesDelMes.filter((t) => t.monto > 0).reduce((sum, t) => sum + t.monto, 0)

      // Calcular egresos (transacciones negativas - dinero que envió el usuario)
      const egresos = Math.abs(transaccionesDelMes.filter((t) => t.monto < 0).reduce((sum, t) => sum + t.monto, 0))

      // Balance neto del mes
      const balance = ingresos - egresos

      return {
        ...monthInfo,
        ingresos,
        egresos,
        balance,
        transacciones: transaccionesDelMes.length,
      }
    })

    return monthlyStats
  }

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
    const stats = calculateMonthlyStatistics()
    setMonthlyData(stats)
  }, [])

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleMonthChange = (newIndex) => {
    setSelectedMonthIndex(newIndex)
  }

  // Obtener datos del mes seleccionado y anterior
  const currentMonthData = monthlyData[selectedMonthIndex] || { ingresos: 0, egresos: 0, balance: 0 }
  const previousMonthData =
    selectedMonthIndex < monthlyData.length - 1
      ? monthlyData[selectedMonthIndex + 1]
      : { ingresos: 0, egresos: 0, balance: 0 }

  // Calcular porcentajes de cambio
  const ingresosChange = calculatePercentageChange(currentMonthData.ingresos, previousMonthData.ingresos)
  const egresosChange = calculatePercentageChange(currentMonthData.egresos, previousMonthData.egresos)

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

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Saldo Actual</Text>
            <Text style={styles.balanceAmount}>{formatAmount(balancePrincipal)}</Text>
          </View>

          {/* Chart Section */}
          <BarChart monthlyData={monthlyData} selectedMonthIndex={selectedMonthIndex} onMonthChange={handleMonthChange} />

          {/* Statistics Cards */}
          <View style={styles.statisticsCard}>
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

            <View style={styles.statisticItem}>
              <Text style={styles.statisticLabel}>Balance neto del mes</Text>
              <View style={styles.statisticValueRow}>
                <Text style={[styles.statisticValue, currentMonthData.balance < 0 && styles.negativeBalance]}>
                  {formatAmount(Math.abs(currentMonthData.balance))}
                </Text>
                <Text style={styles.statisticNote}>{currentMonthData.balance >= 0 ? "Ganancia" : "Pérdida"}</Text>
              </View>
            </View>

            <View style={styles.statisticItem}>
              <Text style={styles.statisticLabel}>Transacciones realizadas</Text>
              <View style={styles.statisticValueRow}>
                <Text style={styles.statisticValue}>{currentMonthData.transacciones}</Text>
                <Text style={styles.statisticNote}>operaciones</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

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
    flexGrow: 1,
    paddingBottom: 0, // Elimina el padding extra abajo
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
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  chart: {
    height: 250,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  barWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 160,
  },
  bar: {
    borderRadius: 4,
    marginBottom: 5,
  },
  barValue: {
    fontSize: 10,
    color: "#93d2fd",
    fontWeight: "600",
    textAlign: "center",
  },
  selectedBarValue: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  barLabel: {
    fontSize: 12,
    color: "#93d2fd",
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
  selectedBarLabel: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  barYear: {
    fontSize: 10,
    color: "#93d2fd",
    textAlign: "center",
  },
  selectedBarYear: {
    color: "#ffffff",
    fontWeight: "bold",
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
  currentMonthDisplay: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  currentMonthText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  statisticsCard: {
    flex: 1,
    backgroundColor: "#1a355c", // Azul oscuro
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    marginVertical: 0,
    minHeight: 400,
    justifyContent: "center",
  },
  statisticItem: {
    marginBottom: 25,
  },
  statisticLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0e0e0", // Más claro para fondo oscuro
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
  negativeBalance: {
    color: "#ff4757",
  },
  statisticPercentage: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statisticNote: {
    fontSize: 14,
    color: "#e0e0e0",
    opacity: 0.8,
  },
})
