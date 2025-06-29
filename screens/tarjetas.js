import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from "react-native"
import { useTarjetas } from "../context/TarjetasContext"
import { Ionicons } from "@expo/vector-icons"
import Navbar from "../components/navbar"

// Componente de tarjeta individual
const CardComponent = ({ tarjeta, index }) => {
  // Diferentes gradientes para cada tarjeta
  const cardStyles = [
    {
      backgroundColor: "#ff9a9e", // Gradiente rosa-naranja
    },
    {
      backgroundColor: "#667eea", // Gradiente azul-púrpura
    },
    {
      backgroundColor: "#a8edea", // Gradiente verde-azul
    },
    {
      backgroundColor: "#ffecd2", // Gradiente amarillo-naranja
    },
    {
      backgroundColor: "#d299c2", // Gradiente púrpura-rosa
    },
    {
      backgroundColor: "#89f7fe", // Gradiente azul claro
    },
  ]

  const cardStyle = cardStyles[index % cardStyles.length]

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: cardStyle.backgroundColor }]}>
      {/* Logo de la tarjeta (para tarjetas con Mastercard) */}
      {(index === 1 || index > 1) && (
        <View style={styles.cardLogo}>
          <View style={[styles.logoCircle, { backgroundColor: "#ff5f00" }]} />
          <View style={[styles.logoCircle, { backgroundColor: "#eb001b", marginLeft: -8 }]} />
        </View>
      )}

      {/* Nombre de la tarjeta */}
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{tarjeta.nombre}</Text>
      </View>

      {/* Número de tarjeta (últimos 4 dígitos) */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardNumber}>•••• •••• •••• {tarjeta.numero.slice(-4)}</Text>
        <Text style={styles.cardHolder}>{tarjeta.titular}</Text>
        <Text style={styles.cardExpiry}>{tarjeta.fechaCaducidad}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Tarjetas({ navigation }) {
  const { tarjetas } = useTarjetas()

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleAddNewCard = () => {
    if (navigation) {
      navigation.navigate("CrearTarjeta")
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
        <Text style={styles.headerTitle}>Mis Tarjetas</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjetas */}
        <View style={styles.cardsContainer}>
          {tarjetas.map((tarjeta, index) => (
            <CardComponent key={`${tarjeta.numero}-${index}`} tarjeta={tarjeta} index={index} />
          ))}
        </View>

        {/* Botón Agregar Nueva Tarjeta */}
        <TouchableOpacity style={styles.addCardButton} onPress={handleAddNewCard}>
          <Text style={styles.addCardText}>Agregar Nueva Tarjeta</Text>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>

      {/* New Navbar Component */}
      <Navbar navigation={navigation} activeScreen="Tarjetas" />
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
    backgroundColor: "rgba(147, 210, 253, 0.3)", // Fondo semi-transparente para mejor visibilidad
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
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 90, // Reducido para eliminar espacio en blanco
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  card: {
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardLogo: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  cardBottom: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardNumber: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
    opacity: 0.8,
  },
  cardHolder: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 2,
    opacity: 0.7,
  },
  cardExpiry: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.6,
  },
  addCardButton: {
    backgroundColor: "#93d2fd",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addCardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
})
